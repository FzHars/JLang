import { useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate, useSearchParams } from "react-router-dom";
import { validateTrainingParams } from "../../utils/helpers.js";
import { useTrainingState } from "../../hooks/useTrainingState";
import { useTrainingPhase } from "../../hooks/useTrainingPhase";
import { useQuizEngine } from "../../hooks/useQuizEngine";
import { useTraining } from "../../context/TrainingContext.jsx";
import Header from "../../components/Header.jsx";
import LearnPhase from "../../features/training/components/LearnPhase.jsx";
import QuizPhase from "../../features/training/components/QuizPhase.jsx";

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.25 } },
};

export default function TrainingMode() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { session, setSession } = useTraining();

  // Parse URL params
  const mode = searchParams.get("mode");
  const groups = useMemo(() => searchParams.get("groups")?.split(",") ?? [], [searchParams]);

  // Validate & redirect
  useEffect(() => {
    if (!validateTrainingParams(mode, groups)) {
      navigate("/kana", { replace: true });
    }
  }, [mode, groups, navigate]);

  // Use custom hooks
  const { revealedCards, handleCardReveal, revealedCount, isSessionReady } =
    useTrainingState(mode, groups);

  const { view, setView, quizIndex, setQuizIndex, handleStartQuiz, handleBack, totalCharacters, quizProgress } =
    useTrainingPhase(session, mode, groups);

  const { selectedAnswer, setSelectedAnswer, quizOptions, currentCharacter, isAnswered } =
    useQuizEngine(session, mode, view, quizIndex);

  // Handler quiz select dengan session update
  const handleQuizSelect = (selectedOption) => {
    if (isAnswered) return;

    setSelectedAnswer(selectedOption);

    if (!session) return;

    const currentChar = session.characters[quizIndex];
    const isCorrect = selectedOption === currentChar.romanization;
    const updatedAnswers = [...session.answers, isCorrect];

    setSession({
      ...session,
      answers: updatedAnswers,
    });

    setTimeout(() => {
      if (updatedAnswers.length >= session.characters.length) {
        // Navigate to score
        const score = {
          correct: updatedAnswers.filter(Boolean).length,
          total: updatedAnswers.length,
          mode,
          groups,
        };
        navigate("/score", { state: { score } });
      } else {
        setQuizIndex((prev) => prev + 1);
        setSelectedAnswer(null);
      }
    }, 1500);
  };

  // Guard: jika belum siap atau invalid
  if (!isSessionReady || !validateTrainingParams(mode, groups)) {
    return null;
  }

  const modeLabel = mode === "2Selected" ? "Hiragana & Katakana" : mode;

  return (
    <>
      <Header title={`Training: ${modeLabel} (${totalCharacters})`} onBack={handleBack} />

      <motion.div
        className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 pt-4 pb-8"
        variants={pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        <div className="max-w-2xl mx-auto px-4">
          {/* Progress indicator */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-green-700">
                {view === "learn" ? "Learning" : "Quiz"}
              </span>
              <span className="text-sm font-medium text-green-700">
                {view === "learn"
                  ? `${revealedCount} / ${totalCharacters} revealed`
                  : `${quizProgress} / ${totalCharacters}`}
              </span>
            </div>
            <div className="w-full bg-green-100 rounded-full h-2">
              <div
                className="bg-green-500 h-2 rounded-full transition-all duration-300"
                style={{
                  width: `${
                    view === "learn"
                      ? (revealedCount / totalCharacters) * 100
                      : (quizProgress / totalCharacters) * 100
                  }%`,
                }}
              />
            </div>
          </div>

          {/* Phases */}
          <AnimatePresence mode="wait">
            {view === "learn" ? (
              <LearnPhase
                characters={session.characters}
                revealedCards={revealedCards}
                onReveal={handleCardReveal}
                onStartQuiz={handleStartQuiz}
                revealedCount={revealedCount}
                totalCount={totalCharacters}
              />
            ) : (
              <QuizPhase
                character={currentCharacter}
                quizOptions={quizOptions}
                selectedAnswer={selectedAnswer}
                onSelect={handleQuizSelect}
                quizProgress={quizProgress}
                totalCount={totalCharacters}
              />
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </>
  );
}