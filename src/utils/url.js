//  URL Parameter Management 
/**
 * Encodes training parameters into a URLSearchParams query string.
 *
 * @param {string} mode - "hiragana", "katakana", or "hiragana & katakana(2Selected)"
 * @param {string[]} groups - Array of group name strings
 * @returns {string} A URLSearchParams-compatible string
 * @example
 * encodeTrainingParams("hiragana", ["seion", "ka"])
 * // Returns: "mode=hiragana&groups=seion,ka"
 */
export function encodeTrainingParams(mode, groups) {
  const params = new URLSearchParams();
  params.set("mode", mode);
  params.set("groups", groups.join(","));
  return params.toString();
}

/**
 * Decodes training parameters from a URLSearchParams instance.
 *
 * @param {URLSearchParams} searchParams - A URLSearchParams instance from useSearchParams()
 * @returns {{ mode: string, groups: string[] }} Decoded mode and groups array
 * @example
 * const params = new URLSearchParams("mode=hiragana&groups=seion,ka");
 * decodeTrainingParams(params)
 * // Returns: { mode: "hiragana", groups: ["seion", "ka"] }
 */
export function decodeTrainingParams(searchParams) {
  const mode = searchParams.get("mode") ?? "";
  const groupsRaw = searchParams.get("groups") ?? "";
  const groups = groupsRaw ? groupsRaw.split(",") : [];
  return { mode, groups };
}
