import nekoData from "../data/nekoData.js";
import { VALID_MODES, VALID_GROUPS } from "./constants.js";

/**  
 * @param {string} mode - The training mode
 * @param {string[]} groups - Array of group names
 * @returns {boolean} Whether the parameters are valid
 */
export function validateTrainingParams(mode, groups) { 
  if (!VALID_MODES.includes(mode)) {
    console.warn(`Invalid mode: ${mode}`);
    return false;
  }

  // Check groups is non-empty array
  if (!Array.isArray(groups) || groups.length === 0) {
    console.warn("Groups must be a non-empty array");
    return false;
  }

  // Check all groups are valid
  if (!groups.every((g) => VALID_GROUPS.includes(g))) {
    const invalid = groups.filter((g) => !VALID_GROUPS.includes(g));
    console.warn(`Invalid groups: ${invalid.join(", ")}`);
    return false;
  }

  // Guard: ensure the filtered character set is non-empty
  const characters = getCharactersByModeAndGroups(mode, groups);
  if (characters.length === 0) {
    console.warn("No characters found for given mode and groups");
    return false;
  }

  return true;
}

/** 
 * @param {string} mode - "hiragana", "katakana", or "hiragana & katakana(2Selected)"
 * @param {string[]} groups - Array of group names
 * @returns {Array} Characters matching the mode and groups
 */
function getCharactersByModeAndGroups(mode, groups) {
  if (mode === "2Selected") {
    return nekoData.filter(
      (c) => (c.type === "hiragana" || c.type === "katakana") && groups.includes(c.group),
    );
  }
  return nekoData.filter((c) => c.type === mode && groups.includes(c.group));
}
