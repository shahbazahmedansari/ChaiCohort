export const getJudge0LanguageId = (language) => {
  const languageMap = {
    "PYTHON": 72,
    "JAVA": 62,
    "JAVASCRIPT": 63,
  };

  return languageMap[language.toUpperCase()];
};

export const getLanguageName = (languageId) => {
  const LANGUAGE_NAMES = {
    74: "TypeScript",
    72: "Python",
    62: "Java",
    63: "JavaScript",
  };

  return LANGUAGE_NAMES[languageId] || "Unknown";
};

export const submitBatch = async (submissions) => {
  const { data } = await axios.post(`${process.env.JUDGE0_API_URL}/submissions/batch?base64_encoded=false`, { submissions });

  console.log("Submission Batch: ", data);

  return data; // [{token}, {token}, {token}]
};

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const pollBatchResults = async (tokens) => {
  while (true) {
    const { data } = await axios.get(`${process.env.JUDGE0_API_URL}/submissions/batch`, {
      params: {
        tokens: tokens.join(','),
        base64_encoded: false,
      }
    });

    const results = data.submissions;

    const isAllDone = results.every((r) => r.status.id !== 1 || r.status.id !== 2);

    if (isAllDone) return results;
    await sleep(1000);
  }
};