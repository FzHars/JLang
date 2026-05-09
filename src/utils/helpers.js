import nekoData from "../data/nekoData.js";

/** Valid training modes */
const VALID_MODES = ["hiragana", "katakana", "both"];

/** Valid character group names */
const VALID_GROUPS = ["seion", "ka", "sa", "ta", "na", "ha", "ma", "ya", "ra", "wa"];

/** Filters nekoData by character type and group.
 * @param {Array} data - The full character dataset (e.g. nekoData)
 * @param {string} type - "hiragana" or "katakana"
 * @param {string} group - One of the 10 valid group names
 * @returns {Array} Characters matching both type and group
 */
export function filterByGroup(data, type, group) {
  return data.filter((c) => c.type === type && c.group === group);
}

/** Encodes training parameters into a URLSearchParams query string.
 * @param {string} mode - "hiragana" or "katakana"
 * @param {string[]} groups - Array of group name strings
 * @returns {string} A URLSearchParams-compatible string, e.g. "mode=hiragana&groups=seion,ka"
 */
export function encodeTrainingParams(mode, groups) {
  const parameters = new URLSearchParams();
  parameters.set("mode", mode);
  parameters.set("groups", groups.join(","));
  return parameters.toString();
}

/** Decodes training parameters from a URLSearchParams instance.
 * @param {URLSearchParams} searchParams - A URLSearchParams instance
 * @returns {{ mode: string, groups: string[] }} Decoded mode and groups array
 */
export function decodeTrainingParams(searchParams) {
  const mode = searchParams.get("mode") ?? "";
  const groupsRaw = searchParams.get("groups") ?? "";
  const groups = groupsRaw ? groupsRaw.split(",") : [];
  return { mode, groups };
}

/**
 * Validates training parameters.
 * Returns true only when:
 * - mode is "hiragana", "katakana", or "both"
 * - groups is non-empty
 * - every group is one of the 10 valid group names
 * - the filtered character set is non-empty (guards against future data changes)
 *
 * @param {string} mode - The training mode
 * @param {string[]} groups - Array of group names
 * @returns {boolean} Whether the parameters are valid
 */
export function validateTrainingParams(mode, groups) {
  if (!VALID_MODES.includes(mode)) return false;
  if (!Array.isArray(groups) || groups.length === 0) return false;
  if (!groups.every((g) => VALID_GROUPS.includes(g))) return false;

  // Guard: ensure the filtered character set is non-empty
  let characters;
  if (mode === "both") {
    // For "both" mode, check both hiragana and katakana
    characters = nekoData.filter(
      (c) => (c.type === "hiragana" || c.type === "katakana") && groups.includes(c.group),
    );
  } else {
    // Single type mode
    characters = nekoData.filter((c) => c.type === mode && groups.includes(c.group));
  }

  if (characters.length === 0) return false;

  return true;
}

/**
 * Calculates the score from an array of boolean answers.
 *
 * @param {boolean[]} answers - Array where true = correct, false = incorrect
 * @returns {{ correct: number, total: number }} Score summary
 */
export function calculateScore(answers) {
  const correct = answers.filter(Boolean).length;
  return { correct, total: answers.length };
}

/**
 * Returns a new shuffled copy of the array using the Fisher-Yates algorithm.
 * The original array is not mutated.
 *
 * @param {Array} array - The array to shuffle
 * @returns {Array} A new shuffled copy
 */
export function shuffle(array) {
  const copy = [...array];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}
