import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate, useSearchParams } from "react-router-dom";
import { validateTrainingParams, shuffle, calculateScore } from "../../utils/helpers.js";
import { useTraining } from "../../context/TrainingContext.jsx";
import nekoData from "../../data/nekoData.js";
import Header from "../../components/Header.jsx";
import LearnPhase from "../../features/training/LearnPhase.jsx";
import QuizPhase from "../../features/training/QuizPhase.jsx";

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.25 } },
};

export default function TrainingMode() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { session, setSession } = useTraining();

  // Local state
  const [revealedCards, setRevealedCards] = useState({});
  const [quizOptions, setQuizOptions] = useState([]);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [view, setView] = useState("learn");
  const [quizIndex, setQuizIndex] = useState(0);

  // Read URL parameters
  const mode = searchParams.get("mode");
  const groups = useMemo(() => searchParams.get("groups")?.split(",") ?? [], [searchParams]);

  // EFFECT 1: VALIDATE & REDIRECT
  useEffect(() => {
    if (!validateTrainingParams(mode, groups)) {
      navigate("/kana", { replace: true });
    }
  }, [mode, groups, navigate]);

  // EFFECT 2: INITIALIZE SESSION
  useEffect(() => {
    if (validateTrainingParams(mode, groups)) {
      let loadedCharacters;

      if (mode === "both") {
        loadedCharacters = nekoData.filter(
          (c) => (c.type === "hiragana" || c.type === "katakana") && groups.includes(c.group),
        );
      } else {
        loadedCharacters = nekoData.filter((c) => c.type === mode && groups.includes(c.group));
      }

      // Initialize training session
      setSession({
        characters: shuffle(loadedCharacters),
        currentIndex: 0,
        answers: [],
        startedAt: new Date(),
      });

      // Initialize revealed cards state
      const initialRevealedState = {};
      loadedCharacters.forEach((char) => {
        initialRevealedState[char.id] = false;
      });
      setRevealedCards(initialRevealedState);
    }
  }, [mode, groups, setSession]);

  // EFFECT 3: GENERATE QUIZ OPTIONS
  useEffect(() => {
    if (view !== "quiz" || !session || session.characters.length === 0) return;

    const currentCharacter = session.characters[quizIndex];
    if (!currentCharacter) return;
    const correctAnswer = currentCharacter.romanization;

    // Get all characters from the same dataset (same mode) for distractors
    let sameTypeCharacters;
    if (mode === "both") {
      // If mode is "both", get distractors from both types
      sameTypeCharacters = nekoData.filter((c) => c.type === "hiragana" || c.type === "katakana");
    } else {
      // Single type mode
      sameTypeCharacters = nekoData.filter((c) => c.type === mode);
    }

    const availableDistractors = [
      ...new Set(
        sameTypeCharacters
          .filter((c) => c.romanization !== correctAnswer)
          .map((c) => c.romanization),
      ),
    ]; 
    
    const shuffledDistractors = shuffle(availableDistractors);
    const distractors = shuffledDistractors.slice(0, 3);

    setQuizOptions(shuffle([correctAnswer, ...distractors]));
  }, [view, quizIndex, mode]);

  // HANDLER: handleCardReveal
  const handleCardReveal = (cardId) => {
    setRevealedCards((prev) => ({
      ...prev,
      [cardId]: !prev[cardId],
    }));
  };

  // HANDLER: handleStartQuiz
  const handleStartQuiz = () => {
    setView("quiz");
    setQuizIndex(0);
    setSelectedAnswer(null);
  };

  // HANDLER: handleQuizSelect
  const handleQuizSelect = (selectedOption) => {
    if (selectedAnswer !== null) return;

    setSelectedAnswer(selectedOption);

    if (!session) return;

    const currentCharacter = session.characters[quizIndex];
    const isCorrect = selectedOption === currentCharacter.romanization;
    const updatedAnswers = [...session.answers, isCorrect];

    setSession({
      ...session,
      answers: updatedAnswers,
    });

    setTimeout(() => {
      if (updatedAnswers.length >= session.characters.length) {
        const score = calculateScore(updatedAnswers);
        navigate("/score", {
          state: {
            score: {
              ...score,
              mode,
              groups,
            },
          },
        });
      } else {
        setQuizIndex((prev) => prev + 1);
        setSelectedAnswer(null);
      }
    }, 1500);
  };

  // HandleBack
  const handleBack = () => {
    navigate("/kana");
  };

  // Don't render anything if session is not initialized or params are invalid
  if (!session || !validateTrainingParams(mode, groups)) {
    return null;
  }

  const modeLabel = mode === "both" ? "Hiragana & Katakana" : mode;
  // const currentCharacter = session.characters[session.currentIndex];
  const totalCharacters = session.characters.length;
  // const progress = session.currentIndex + 1;
  // const total = session.characters.length;
  const revealedCount = Object.values(revealedCards).filter(Boolean).length;
  const quizProgress = quizIndex + 1;

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
                character={session.characters[quizIndex]}
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
