/**
 * Array Utilities
 * Common array operations used throughout the application
 */

/**
 * Returns a new shuffled copy of the array using the Fisher-Yates algorithm.
 * The original array is not mutated.
 *
 * @param {Array} array - The array to shuffle
 * @returns {Array} A new shuffled copy
 * @example
 * shuffle([1, 2, 3, 4, 5])
 * // Returns: [3, 1, 5, 2, 4] (random order)
 */
export function shuffle(array) {
  const copy = [...array];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

/**
 * Calculates the score from an array of boolean answers.
 *
 * @param {boolean[]} answers - Array where true = correct, false = incorrect
 * @returns {{ correct: number, total: number }} Score summary
 * @example
 * calculateScore([true, false, true, true])
 * // Returns: { correct: 3, total: 4 }
 */
export function calculateScore(answers) {
  const correct = answers.filter(Boolean).length;
  return { correct, total: answers.length };
}

/**
 * Calculates the percentage of correct answers.
 *
 * @param {number} correct - Number of correct answers
 * @param {number} total - Total number of answers
 * @returns {number} Percentage (0-100)
 */
export function calculatePercentage(correct, total) {
  if (total === 0) return 0;
  return Math.round((correct / total) * 100);
}

/**
 * Gets N random items from an array without replacement.
 *
 * @param {Array} array - The source array
 * @param {number} n - Number of items to get
 * @returns {Array} Array of n random items
 */
export function getRandomItems(array, n) {
  if (n >= array.length) return [...array];
  const shuffled = shuffle(array);
  return shuffled.slice(0, n);
}

/**
 * Removes duplicates from an array, preserving order.
 *
 * @param {Array} array - The source array
 * @returns {Array} Array with duplicates removed
 */
export function unique(array) {
  return [...new Set(array)];
}
