import { useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import { encodeTrainingParams } from "../../utils/helpers.js";

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.25 } },
};

export default function ScoreScreen() {
  const navigate = useNavigate();
  const location = useLocation();
  const score = location.state?.score;

  // Guard: redirect if score is missing
  useEffect(() => {
    if (!score) {
      navigate("/kana", { replace: true });
    }
  }, [score, navigate]);

  // Don't render anything if score is missing (will redirect)
  if (!score) {
    return null;
  }

  const handleRetry = () => {
    const params = encodeTrainingParams(score.mode, score.groups);
    navigate(`/training?${params}`);
  };

  const handleBack = () => {
    navigate("/kana");
  };

  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 flex flex-col items-center justify-center p-4"
    >
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="mb-6"
        >
          <div className="text-6xl mb-4">{score.correct === score.total ? "🎉" : "📊"}</div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Quiz Complete!</h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-6"
        >
          <div className="text-5xl font-bold text-green-600 mb-2">
            {score.correct}/{score.total}
          </div>
          <div className="text-gray-600 mb-4">
            {Math.round((score.correct / score.total) * 100)}% correct
          </div>

          <div className="text-sm text-gray-500 space-y-1">
            <div>
              Mode: <span className="font-medium capitalize">{score.mode}</span>
            </div>
            <div>
              Groups: <span className="font-medium">{score.groups.join(", ")}</span>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="space-y-3"
        >
          <button
            onClick={handleRetry}
            className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-xl transition-colors duration-200"
          >
            Try Again
          </button>

          <button
            onClick={handleBack}
            className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 px-6 rounded-xl transition-colors duration-200"
          >
            Back to Selection
          </button>
        </motion.div>
      </div>
    </motion.div>
  );
}
