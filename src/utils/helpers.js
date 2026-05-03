// Fisher-Yates shuffle algorithm (no mutation)
export const shuffleArray = (arr) => {
  const newArr = [...arr];
  for (let i = newArr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
  }
  return newArr;
};

// Generate 4 unique quiz options (1 correct + 3 random)
export const generateRandomOptions = (correctAnswer, allData, count = 4) => {
  if (!correctAnswer || !allData || allData.length < count) {
    return [correctAnswer];
  }

  // Filter out correct answer
  const others = allData.filter(k => k.id !== correctAnswer.id);

  // Shuffle and take first (count - 1) items
  const shuffled = shuffleArray(others);
  const randomOptions = shuffled.slice(0, count - 1);

  // Combine with correct answer and shuffle
  const allOptions = [correctAnswer, ...randomOptions];
  return shuffleArray(allOptions);
};

// Calculate percentage score
export const calculateScore = (correct, total) => {
  if (total === 0) return 0;
  return Math.round((correct / total) * 100);
};

// Filter by type (hiragana/katakana)
export const filterByType = (data, type) => {
  return data.filter(k => k.type === type);
};

// Filter by type + group
export const filterByGroup = (data, type, group) => {
  return data.filter(k => k.type === type && k.group === group);
};
