import { db } from "../libs/db.js";
import { getJudge0LanguageId, pollBatchResults, submitBatch } from "../libs/judge0.libs.js";

export const createProblem = async (req, res) => {
  // going to get all the data from the request body
  const { title, description, difficulty, tags, examples, constraints, testcases, codeSnippets, referenceSolutions } = req.body;

  console.log(req.user.role);
  // going to check the user role once again
  if (req.user.role !== "ADMIN") {
    return res.status(403).json({
      error: "You are not allowed to create the problem",
      success: false,
    });
  }

  try {
    // going to loop through each reference solution for different languages
    for (const [language, solutionCode] of Object.entries(referenceSolutions)) {
      const languageId = getJudge0LanguageId(language);
      console.log(languageId);
      if (!languageId) {
        return res.status(400).json({
          error: `Language ${language} is not supported`,
          success: false,
        });
      }

      // creating array of submissions for each language
      const submissions = testcases.map(({ input, output }) => ({
        source_code: solutionCode,
        language_id: languageId,
        stdin: input,
        expected_output: output,
      }));
      console.log(submissions);

      const submissionResults = await submitBatch(submissions);
      console.log(submissionResults);
      const tokens = submissionResults.map((res) => res.token);
      console.log(tokens);
      const results = await pollBatchResults(tokens);
      console.log(results);
      for (let i = 0; i < results.length; i++) {
        const result = results[i];
        console.log("Result---->", result);
        // console.log(`Testcase ${i + 1} and language ${language} ----- result ${JSON.stringify(result.status.description)}`);
        if (result.status.id !== 3) {
          return res.status(400).json({
            error: `Testcase ${i + 1} failed for language ${language}`,
            success: false,
          });
        }
      }

      // save the problem to the database
      const newProblem = await db.problem.create({
        data: {
          title,
          description,
          difficulty,
          tags,
          examples,
          constraints,
          testcases,
          codeSnippets,
          referenceSolution,
          userId: req.user.id,
        }
      });

      return res.status(201).json(newProblem);
    }
  } catch (error) {

  }
};

export const getAllProblems = async (req, res) => {
  try {
    const problems = await db.problem.findMany({
      include: {
        solvedBy: {
          where: {
            userId: req.user.id,
          }
        }
      }
    });

    if (!problems) {
      return res.status(404).json({
        error: "No problems found",
        success: false,
      });
    }

    res.status(200).json({
      success: true,
      message: "Problems Fetched Successfully",
      problems
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: "Error While Fetching Problems",
    });
  }
};

export const getProblemById = async (req, res) => {
  try {
    const { id } = req.params;

    const problem = await db.problem.findUnique({
      where: {
        id,
      }
    });

    if (!problem) {
      return res.status(404).json({
        error: "Problem not found",
        success: false,
      });
    }

    res.status(200).json({
      success: true,
      message: "Problem Fetched Successfully",
      problem
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: "Error While Fetching Problem by id",
    });
  }
};

export const updateProblem = async (req, res) => {
  // id
  // id ------> problem (condition)
  // same as create

};

export const deleteProblem = async (req, res) => {
  try {
    const { id } = req.params;

    const problem = await db.problem.findUnique({
      where: {
        id
      }
    });

    if (!problem) {
      return res.status(404).json({
        error: "Problem not found",
        success: false,
      });
    }

    await db.problem.delete({
      where: {
        id
      }
    });

    return res.status(200).json({
      message: "Problem deleted successfully",
      success: true,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: "Error While Deleting the Problem",
    });
  }
};

export const getAllProblemsSolvedByUser = async (req, res) => {
  try {
    const problems = await db.problem.findMany({
      where: {
        solvedBy: {
          some: {
            userId: req.user.id,
          }
        }
      },
      include: {
        solvedBy: {
          where: {
            userId: req.user.id,
          }
        }
      }
    });

    res.status(200).json({
      success: true,
      message: "Problems fetched successfully",
      problems,
    });
  } catch (error) {
    console.error("Error fetching problems: ", error);
    res.status(500).json({
      error: "Failed to fetch problems",
      success: false,
    });
  }
};