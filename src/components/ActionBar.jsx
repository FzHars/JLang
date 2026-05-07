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
  onStartHiragana,
  onStartKatakana,
}) {
  // Render section hanya kalo ada yang dipilih
  const hiraganaSection = selectedGroupsHiragana.length > 0 && (
    <div className="flex items-center justify-between gap-4">
      <div className="flex-1">
        <p className="text-sm font-bold text-green-900">
          Hiragana: {selectedGroupsHiragana.length} group{selectedGroupsHiragana.length !== 1 ? "s" : ""}
        </p>
        <p className="text-xs text-green-600">
          {totalSelectedCharsHiragana} character{totalSelectedCharsHiragana !== 1 ? "s" : ""} to practice
        </p>
      </div>
      <button
        onClick={onStartHiragana}
        className="px-6 py-2.5 rounded-xl font-bold text-white bg-green-600 hover:bg-green-700 shadow-lg shadow-green-600/50 active:scale-95"
      >
        Start
      </button>
    </div>
  );

  const katakanaSection = selectedGroupsKatakana.length > 0 && (
    <div className="flex items-center justify-between gap-4">
      <div className="flex-1">
        <p className="text-sm font-bold text-green-900">
          Katakana: {selectedGroupsKatakana.length} group{selectedGroupsKatakana.length !== 1 ? "s" : ""}
        </p>
        <p className="text-xs text-green-600">
          {totalSelectedCharsKatakana} character{totalSelectedCharsKatakana !== 1 ? "s" : ""} to practice
        </p>
      </div>
      <button
        onClick={onStartKatakana}
        className="px-6 py-2.5 rounded-xl font-bold text-white bg-green-600 hover:bg-green-700 shadow-lg shadow-green-600/50 active:scale-95"
      >
        Start
      </button>
    </div>
  );

  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.2, duration: 0.3 }}
      className="fixed bottom-0 left-0 right-0 bg-white border-t-2 border-green-200 shadow-2xl shadow-green-100/50"
    >
      <div className="max-w-6xl mx-auto px-4 md:px-6 py-6 space-y-4">
        {hiraganaSection}
        {hiraganaSection && katakanaSection && <div className="h-px bg-green-200 opacity-50" />}
        {katakanaSection}
      </div>
    </motion.div>
  );
}
// return (
//   <>
//     {isValidHiragana && (
//       <div className="flex items-center justify-between gap-4">
//         {/* hiragana */}
//       </div>
//     )}
//     {isValidKatakana && (
//       <div className="flex items-center justify-between gap-4">
//         {/* katakana */}
//       </div>
//     )}
//   </>
// );