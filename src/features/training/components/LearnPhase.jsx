import { motion, AnimatePresence } from "framer-motion";

/**
 * Props:
 *   characters {Array}        - Array of character objects to display
 *   revealedCards {Object}    - Object tracking reveal state: { charId: boolean, ... }
 *   onReveal {Function}       - Called when user taps a card: onReveal(cardId)
 *   onStartQuiz {Function}    - Called when user clicks "Next to Quiz" button
 *   revealedCount {number}    - How many cards are currently revealed
 *   totalCount {number}       - Total number of cards
 */
export default function LearnPhase({
  characters,
  revealedCards,
  onReveal,
  onStartQuiz,
  revealedCount,
  totalCount,
}) {
  return (
    <motion.div
      key="learn"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-8"
    >
      <div className="text-center">
        <h2 className="text-2xl font-bold text-green-900 mb-2">Memorize</h2>
        <p className="text-green-600">
          Tap cards to reveal and memorize all characters before the quiz.
        </p>
      </div>

      {/* Grid better bro */}
      <div className="flex justify-center">
        <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-3 w-5xl">
            {characters.map((character) => (
            <motion.div
              key={character.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.2 }}
              onClick={() => onReveal(character.id)}
              className="cursor-pointer"
            >
              {/* INDIVIDUAL CARD CONTAINER */}
              <div
                className={`
                  aspect-square rounded-lg border-2 flex flex-col items-center justify-center p-2
                  transition-all duration-300 select-none
                  ${
                    revealedCards[character.id]
                      ? "bg-green-100 border-green-400 shadow-md"
                      : "bg-white border-green-200 hover:border-green-300 hover:shadow-sm"
                  }
                `}
              >
                <AnimatePresence mode="wait">
                  {revealedCards[character.id] ? (
                    <motion.div
                      key="romanization"
                      initial={{ opacity: 0, rotateY: -90 }}
                      animate={{ opacity: 1, rotateY: 0 }}
                      exit={{ opacity: 0, rotateY: 90 }}
                      transition={{ duration: 0.2 }}
                      className="text-center w-full"
                    >
                      <div className="text-xl font-semibold text-green-700">
                        {character.romanization}
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="character"
                      initial={{ opacity: 0, rotateY: -90 }}
                      animate={{ opacity: 1, rotateY: 0 }}
                      exit={{ opacity: 0, rotateY: 90 }}
                      transition={{ duration: 0.2 }}
                      className="text-center w-full"
                    >
                      <div className="text-xl font-jp font-bold text-green-900">
                        {character.char}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* PROGRESS INDICATOR */}
      <div className="flex justify-center">
        <p className="text-sm text-green-600">
          {revealedCount} of {totalCount} cards revealed
        </p>
      </div>

      {/* "NEXT TO QUIZ" BUTTON */}
      <div className="flex justify-center">
        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          onClick={onStartQuiz}
          className="px-8 py-4 bg-green-600 text-white rounded-xl font-semibold hover:bg-green-700 transition-all shadow-lg shadow-green-600/30"
        >
          Next to Quiz 🚀
        </motion.button>
      </div>
    </motion.div>
  );
}
