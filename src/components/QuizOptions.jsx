import { motion } from "framer-motion";

/**
 * QuizOptions — multiple choice quiz component for kana training
 *
 * Props:
 *   options  {string[]}     — array of 4 romanization options (1 correct + 3 distractors)
 *   onSelect {function}     — called when user selects an option: onSelect(selectedOption)
 *   selected {string|null}  — currently selected option (null if no selection yet)
 *   correct  {string}       — the correct romanization answer
 */
export default function QuizOptions({ options, onSelect, selected, correct }) {
  const hasAnswered = selected !== null;

  const getButtonStyle = (option) => {
    if (!hasAnswered) {
      // Before selection - default style
      return "bg-white border-2 border-green-200 text-green-900 hover:border-green-300 hover:bg-green-50";
    }

    // After selection - show correct/incorrect feedback
    if (option === correct) {
      // Correct answer - always green
      return "bg-green-500 border-2 border-green-600 text-white";
    } else if (option === selected) {
      // Selected wrong answer - red
      return "bg-red-500 border-2 border-red-600 text-white";
    } else {
      // Other options - muted
      return "bg-gray-100 border-2 border-gray-200 text-gray-500";
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        staggerChildren: 0.1,
      },
    },
  };

  const buttonVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.3 },
    },
  };

  return (
    <motion.div
      className="w-full max-w-md mx-auto"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="grid grid-cols-1 gap-3">
        {options.map((option) => (
          <motion.button
            key={option}
            variants={buttonVariants}
            onClick={() => !hasAnswered && onSelect(option)}
            disabled={hasAnswered}
            className={`
              relative px-6 py-4 rounded-2xl font-medium text-lg
              transition-all duration-200 min-h-[44px]
              ${getButtonStyle(option)}
              ${!hasAnswered ? "active:scale-95 cursor-pointer" : "cursor-default"}
              disabled:cursor-default
            `}
            whileHover={!hasAnswered ? { scale: 1.02 } : {}}
            whileTap={!hasAnswered ? { scale: 0.98 } : {}}
            aria-label={
              !hasAnswered
                ? `Option ${option}`
                : `Option ${option}, ${option === correct ? "correct" : "incorrect"}`
            }
          >
            {/* Option text */}
            <span className="relative z-10">{option}</span>

            {/* Selection indicator */}
            {hasAnswered && option === correct && (
              <motion.div
                className="absolute right-4 top-1/2 transform -translate-y-1/2"
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.2, duration: 0.3 }}
              >
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </motion.div>
            )}

            {/* Wrong selection indicator */}
            {hasAnswered && option === selected && option !== correct && (
              <motion.div
                className="absolute right-4 top-1/2 transform -translate-y-1/2"
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.2, duration: 0.3 }}
              >
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </motion.div>
            )}

            {/* Subtle gradient overlay for depth */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none rounded-2xl" />
          </motion.button>
        ))}
      </div>

      {/* Feedback text */}
      {hasAnswered && (
        <motion.div
          className="mt-4 text-center"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.3 }}
        >
          <p
            className={`text-sm font-medium ${
              selected === correct ? "text-green-600" : "text-red-600"
            }`}
          >
            {selected === correct ? "Correct!" : `Correct answer: ${correct}`}
          </p>
        </motion.div>
      )}
    </motion.div>
  );
}
