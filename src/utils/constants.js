export const VALID_MODES = ["hiragana", "katakana", "2Selected"];

export const VALID_GROUPS = ["seion", "ka", "sa", "ta", "na", "ha", "ma", "ya", "ra", "wa"];

/**
 * Human-readable group names for UI display
 */
export const GROUP_DISPLAY_NAMES = {
  seion: "a, i, u, e, o",
  ka: "ka, ki, ku, ke, ko",
  sa: "sa, shi, su, se, so",
  ta: "ta, chi, tsu, te, to",
  na: "na, ni, nu, ne, no",
  ha: "ha, hi, fu, he, ho",
  ma: "ma, mi, mu, me, mo",
  ya: "ya, yu, yo",
  ra: "ra, ri, ru, re, ro",
  wa: "wa, wo, n",
};

/**
 * Training session status
 */
export const TRAINING_PHASES = {
  LEARN: "learn",
  QUIZ: "quiz",
};
