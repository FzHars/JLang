import { motion, AnimatePresence } from "framer-motion";

/**
 * Card — flashcard component for displaying kana characters
 *
 * Props:
 *   character  {KanaCharacter} — character object with id, char, romanization, type, group
 *   isRevealed {boolean}       — whether to show the romanization (true) or kana character (false)
 *   onReveal   {function}      — called when the card is clicked to reveal the answer
 */
export default function Card({ character, isRevealed, onReveal }) {
  return (
    <motion.div
      className="relative w-full max-w-sm mx-auto aspect-[2/1]"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* Card container */}
      <div className="relative w-full h-full bg-white border-2 border-green-200 rounded-3xl shadow-xl shadow-green-100/50 overflow-hidden">
        {/* Card content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center p-8">
          <AnimatePresence mode="wait">
            {!isRevealed ? (
              // Front side - show kana character
              <motion.div
                key="front"
                initial={{ opacity: 0, rotateY: -90 }}
                animate={{ opacity: 1, rotateY: 0 }}
                exit={{ opacity: 0, rotateY: 90 }}
                transition={{ duration: 0.3 }}
                className="text-center"
              >
                <div className="text-8xl md:text-9xl font-bold text-green-900 mb-4 font-jp">
                  {character.char}
                </div>
                <div className="text-sm text-green-600 font-medium">Tap to reveal</div>
              </motion.div>
            ) : (
              // Back side - show romanization
              <motion.div
                key="back"
                initial={{ opacity: 0, rotateY: -90 }}
                animate={{ opacity: 1, rotateY: 0 }}
                exit={{ opacity: 0, rotateY: 90 }}
                transition={{ duration: 0.3 }}
                className="text-center"
              > 
                <div className="text-6xl md:text-7xl font-bold text-green-700 mb-4 font-jp">
                  {character.char}
                </div>
                <div className="text-sm text-green-600 font-medium capitalize opacity-40">
                  • {character.type} • 
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Subtle gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-green-50/30 to-transparent pointer-events-none" />

        {/* Interactive indicator */}
        <div className="absolute top-4 right-4">
          <div
            className={`w-3 h-3 rounded-full transition-colors ${
              isRevealed ? "bg-green-500" : "bg-green-300"
            }`}
          />
        </div>
      </div>
    </motion.div>
  );
}
