import { motion } from "framer-motion";
import Card from "../../components/Card.jsx";
import QuizOptions from "../../components/QuizOptions.jsx";

/**
 * QuizPhase Component
 * Props:
 *   character {Object}          - Current character object: { id, char, romanization, type, group }
 *   quizOptions {Array}         - Array of 4 answer options (1 correct + 3 distractors)
 *   selectedAnswer {string|null} - Currently selected answer (null if not answered yet)
 *   onSelect {Function}         - Called when user selects an answer: onSelect(selectedOption)
 *   quizProgress {number}       - Current question number (1-based)
 *   totalCount {number}         - Total number of characters to quiz
 */
export default function QuizPhase({
  character,
  quizOptions,
  selectedAnswer,
  onSelect,
  quizProgress,
  totalCount,
}) {
  return (
    <motion.div
      key="quiz"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-8"
    >
      <div className="flex justify-center">
        <Card character={character} isRevealed={true} onReveal={() => {}} />
      </div>

      <div className="text-center">
        {/* <h2 className="text-2xl font-bold text-green-900 mb-2">What is the romanization?</h2> */}
        <p className="text-green-700">Choose the correct reading for the character above.</p>
      </div>

      {/* PROGRESS TEXT */}
      {/* <div className="text-center">
        <p className="text-sm text-green-600 font-medium">
          Question {quizProgress} of {totalCount}
        </p>
      </div> */}

      {/* ===================================================================
          QUIZ OPTIONS 
          Props passed down:
            - options: array of 4 answer choices
            - onSelect: callback when user clicks an option
            - selected: tracks which option is currently selected
            - correct: the correct answer (for showing feedback)
          =================================================================== */}
      <div className="flex justify-center">
        <div className="w-full max-w-md">
          <QuizOptions
            options={quizOptions}
            onSelect={onSelect}
            selected={selectedAnswer}
            correct={character.romanization}
          />
        </div>
      </div>
    </motion.div>
  );
}
