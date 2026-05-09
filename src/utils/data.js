import nekoData from "../data/nekoData.js";

/**
 * Filters nekoData by character type and group.
 *
 * @param {Array} data - The full character dataset (e.g. nekoData)
 * @param {string} type - "hiragana" or "katakana"
 * @param {string} group - One of the 10 valid group names
 * @returns {Array} Characters matching both type and group
 * @example
 * filterByGroup(nekoData, "hiragana", "seion")
 * // Returns: [あ, い, う, え, お]
 */
export function filterByGroup(data, type, group) {
  return data.filter((c) => c.type === type && c.group === group);
}

/**
 * Gets all characters for a given mode and groups.
 *
 * @param {string} mode - "hiragana", "katakana", or "hiragana & katakana(2Selected)"
 * @param {string[]} groups - Array of group names
 * @returns {Array} Characters matching the mode and groups
 */
export function getCharactersByModeAndGroups(mode, groups) {
  if (mode === "2Selected") {
    return nekoData.filter(
      (c) => (c.type === "hiragana" || c.type === "katakana") && groups.includes(c.group),
    );
  }
  return nekoData.filter((c) => c.type === mode && groups.includes(c.group));
}

/**
 * Gets all available groups for a given character type from the dataset.
 *
 * @param {string} type - "hiragana" or "katakana"
 * @returns {string[]} Array of group names available for this type
 */
export function getAvailableGroups(type) {
  return Array.from(new Set(nekoData.filter((c) => c.type === type).map((c) => c.group)));
}

/**
 * Gets a random character from a given type and group.
 *
 * @param {string} type - "hiragana" or "katakana"
 * @param {string} group - Group name
 * @returns {Object|null} A random character object, or null if not found
 */
export function getRandomCharacter(type, group) {
  const chars = filterByGroup(nekoData, type, group);
  if (chars.length === 0) return null;
  return chars[Math.floor(Math.random() * chars.length)];
}
