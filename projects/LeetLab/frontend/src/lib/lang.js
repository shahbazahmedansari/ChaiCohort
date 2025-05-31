export const getLanguageId = (language) => {
  const languageMap = {
    "PYTHON": 71,
    "JAVA": 62,
    "JAVASCRIPT": 63,
  };

  return languageMap[language.toUpperCase()];
};

export const getLanguageName = (languageId) => {
  const LANGUAGE_NAMES = {
    71: "Python",
    62: "Java",
    63: "JavaScript",
  };

  return LANGUAGE_NAMES[languageId] || "Unknown";
};