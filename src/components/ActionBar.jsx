import { motion } from "framer-motion";

/**
 * ActionBar
 * 
 * Fixed bottom action bar component.
 * Displays summary of selections and provides a Start button.
 * 
 * Props:
 *   - selectedGroups: array of selected group IDs
 *   - totalSelectedChars: number of total characters selected
 *   - onStart: callback when Start button is clicked
 */
export default function ActionBar({
  selectedGroups,
  totalSelectedChars,
  onStart,
}) {
  const isValid = selectedGroups.length > 0;

  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.2, duration: 0.3 }}
      className="fixed bottom-0 left-0 right-0 bg-white border-t-2 border-green-200 shadow-2xl shadow-green-100/50"
    >
      <div className="max-w-6xl mx-auto px-4 md:px-6 py-6 flex items-center justify-between gap-4">
        {/* Summary */}
        <div className="flex-1">
          {isValid ? (
            <div className="space-y-1">
              <p className="text-sm font-bold text-green-900">
                {selectedGroups.length} group{selectedGroups.length !== 1 ? "s" : ""} selected
              </p>
              <p className="text-xs text-green-600">
                {totalSelectedChars} character{totalSelectedChars !== 1 ? "s" : ""} to practice
              </p>
            </div>
          ) : (
            <p className="text-sm text-green-500 italic">
              Select at least one group to continue
            </p>
          )}
        </div>

        {/* Start Button */}
        <button
          onClick={onStart}
          disabled={!isValid}
          className={`px-8 py-3 rounded-xl font-bold text-white transition-all ${
            isValid
              ? "bg-green-600 hover:bg-green-700 shadow-lg shadow-green-600/50 active:scale-95"
              : "bg-green-300 cursor-not-allowed opacity-60"
          }`}
        >
          Start
        </button>
      </div>
    </motion.div>
  );
}
