/**
 * helpers.js
 * - constants.js  → VALID_MODES, VALID_GROUPS, GROUP_DISPLAY_NAMES, TRAINING_PHASES
 * - validation.js → validateTrainingParams
 * - url.js        → encodeTrainingParams, decodeTrainingParams
 * - data.js       → filterByGroup, getCharactersByModeAndGroups, getAvailableGroups
 * - array.js      → shuffle, calculateScore, calculatePercentage, getRandomItems, unique
 */

// Constants
export { VALID_MODES, VALID_GROUPS, GROUP_DISPLAY_NAMES, TRAINING_PHASES } from "./constants.js";

// Validation
export { validateTrainingParams } from "./validation.js";

// URL Parameters
export { encodeTrainingParams, decodeTrainingParams } from "./url.js";

// Data Operations
export {
  filterByGroup,
  getCharactersByModeAndGroups,
  getAvailableGroups,
  getRandomCharacter,
} from "./data.js";

// Array Utilities
export { shuffle, calculateScore, calculatePercentage, getRandomItems, unique } from "./array.js";
