import { pollBatchResults, submitBatch } from "../libs/judge0.libs.js";

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

    res.status(200).json({
      message: "Code Executed!",
      success: true,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Code Execution Failed!",
      success: false,
    });
  }
};