import { getLanguageName, pollBatchResults, submitBatch } from "../libs/judge0.libs.js";
import { db } from "../libs/db.js";

export const executeCode = async (req, res) => {
  try {
    const { source_code, language_id, stdin, expected_outputs, problemId } = req.body;

    const userId = req.user.id;

    // 1. Validate test cases => test cases are coming in the form of array or not

    if (!Array.isArray(stdin) || stdin.length === 0 || !Array.isArray(expected_outputs) || expected_outputs.length !== stdin.length) {
      return res.status(400).json({
        error: "Invalid or missing test cases",
        success: false,
      });
    }

    // 2. Prepare each test cases for judge0 batch submission
    const submissions = stdin.map((input) => ({
      source_code,
      language_id,
      stdin: input,
    }));

    // 3. Send this batch of submissions to judge0

    const submitResponse = await submitBatch(submissions);

    const tokens = submitResponse.map(res => res.token);

    // 4. Poll judge0 for the result of all testcases
    const results = await pollBatchResults(tokens);

    console.log("Result ---->");
    console.log(results);

    // Analyze test case results
    let allPassed = true;
    const detailedResults = results.map((result, index) => {
      const stdout = results.stdout?.trim();
      const expected_output = result[index].trim();
      const passed = stdout === expected_output;

      if (!passed) allPassed = false;

      return {
        testCase: index + 1,
        stdout,
        passed,
        expected: expected_output,
        stderr: result.stderr || null,
        compile_output: result.compile_output || null,
        status: result.status.description,
        memory: result.memory ? `${result.memory} KB` : undefined,
        time: result.time ? `${result.time} s` : undefined,
      };

      // console.log(`Testcase #${index + 1}`);
      // console.log(`Input ${stdin[index]}`);
      // console.log(`Expected Output for the testcase ${expected_output}`);
      // console.log(`Actual Output ${stdout}`);

      // console.log(`Matched : ${passed}`);
    });

    console.log(detailedResults);

    // store submission summary
    const submission = await db.submission.create({
      data: {
        userId,
        problemId,
        sourceCode: source_code,
        language: getLanguageName(language_id),
        stdin: stdin.join("\n"),
        stdout: JSON.stringify(detailedResults.map((r) => r.stdout)),
        stderr: detailedResults.some((r) => r.stderr) ? JSON.stringify(detailedResults.map((r) => r.stderr)) : null,
        compileOutput: detailedResults.some((r) => r.compile_output) ? JSON.stringify(detailedResults.map((r) => r.compile_output)) : null,
        status: allPassed ? "Accepted" : "Wrong Answer",
        memory: detailedResults.some((r) => r.memory) ? JSON.stringify(detailedResults.map((r) => r.memory)) : null,
        time: detailedResults.some((r) => r.time) ? JSON.stringify(detailedResults.map((r) => r.time)) : null,
      }
    });

    // if all passed = true then mark problem as solved for the current user

    if (allPassed) {
      await db.problemSolved.upsert({
        where: {
          userId_problemId: {
            userId,
            problemId,
          }
        },
        update: {},
        create: {
          userId,
          problemId,
        }
      });
    }

    //  Save individual test case results using detailedResults

    const testCaseResults = detailedResults.map((result) => ({
      submissionId: submission.id,
      passed: result.passed,
      testCase: result.testCase,
      stdout: result.stdout,
      expected: result.expected,
      stderr: result.stderr,
      compileOutput: result.compile_output,
      status: result.status,
      memory: result.memory,
      time: result.time,
    }));

    await db.testCaseResult.createMany({
      data: testCaseResults,
    });

    const submissionWithTestCase = await db.submission.findUnique({
      where: {
        id: submission.id,
      },
      include: {
        testCases: true,
      }
    });

    res.status(200).json({
      message: "Code Executed!",
      success: true,
      submission: submissionWithTestCase,
    });
  } catch (error) {
    console.error("Error executing code: ", error);
    res.status(500).json({
      error: "Code Execution Failed!",
      success: false,
    });
  }
};