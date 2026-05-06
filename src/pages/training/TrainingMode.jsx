// Stub — full implementation in task 7
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.25 } },
};

export default function TrainingMode() {
  const navigate = useNavigate();

  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <p>TrainingMode stub</p>
      <button
        onClick={() =>
          navigate("/score", {
            state: {
              score: {
                correct: 0,
                total: 0,
                mode: "hiragana",
                groups: ["seion"],
              },
            },
          })
        }
      >
        Go to Score
      </button>
    </motion.div>
  );
}
