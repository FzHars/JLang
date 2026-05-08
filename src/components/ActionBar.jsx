import { motion } from "framer-motion";

/**
 * ActionBar
 * 
 * Fixed bottom action bar component.
 * Displays summary of selections for both hiragana and katakana.
 * Provides separate Start buttons for each type.
 * 
 * Props:
 *   - selectedGroupsHiragana: array of selected hiragana group IDs
 *   - selectedGroupsKatakana: array of selected katakana group IDs
 *   - totalSelectedCharsHiragana: number of hiragana characters selected
 *   - totalSelectedCharsKatakana: number of katakana characters selected
 *   - onStartHiragana: callback when hiragana Start button is clicked
 *   - onStartKatakana: callback when katakana Start button is clicked
 */
export default function ActionBar({
  selectedGroupsHiragana,
  selectedGroupsKatakana,
  totalSelectedCharsHiragana,
  totalSelectedCharsKatakana,
  onStart,
}) {
  const hasHiragana = selectedGroupsHiragana.length > 0;
  const hasKatakana = selectedGroupsKatakana.length > 0;

  // Determine label and total
  let label, totalChars, groupsCount;

  if (hasHiragana && hasKatakana) {
    label = "Hiragana & Katakana";
    totalChars = totalSelectedCharsHiragana + totalSelectedCharsKatakana;
    groupsCount = selectedGroupsHiragana.length + selectedGroupsKatakana.length;
  } else if (hasHiragana) {
    label = "Hiragana";
    totalChars = totalSelectedCharsHiragana;
    groupsCount = selectedGroupsHiragana.length;
  } else if (hasKatakana) {
    label = "Katakana";
    totalChars = totalSelectedCharsKatakana;
    groupsCount = selectedGroupsKatakana.length;
  } else {
    // No selection
    return null;
  }

  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.2, duration: 0.3 }}
      className="fixed bottom-0 left-0 right-0 bg-white border-t-2 border-green-200 shadow-2xl shadow-green-100/50"
    >
      <div className="max-w-6xl mx-auto px-4 md:px-6 py-6">
        <div className="flex items-center justify-between gap-4">
          <div className="flex-1">
            <p className="text-sm font-bold text-green-900">
              {label}: {groupsCount} group{groupsCount !== 1 ? "s" : ""}
            </p>
            <p className="text-xs text-green-600">
              {totalChars} character{totalChars !== 1 ? "s" : ""} to practice
            </p>
          </div>
          <button
            onClick={onStart}
            className="px-6 py-2.5 rounded-xl font-bold text-white bg-green-600 hover:bg-green-700 shadow-lg shadow-green-600/50 active:scale-95"
          >
            Start
          </button>
        </div>
      </div>
    </motion.div>
  );
} 