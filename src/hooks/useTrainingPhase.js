import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { calculateScore } from "../utils/helpers";

export function useTrainingPhase(session, mode, groups) {
  const navigate = useNavigate();
  const [view, setView] = useState("learn");
  const [quizIndex, setQuizIndex] = useState(0);

  const handleStartQuiz = () => {
    setView("quiz");
    setQuizIndex(0);
  };

  const handleFinishQuiz = (selectedAnswer) => {
    if (!session) return;

    const currentCharacter = session.characters[quizIndex];
    const isCorrect = selectedAnswer === currentCharacter.romanization;
    const updatedAnswers = [...session.answers, isCorrect];

    // Update session dengan answers terbaru
    // (akan di-handle di parent component melalui context)

    return { updatedAnswers, shouldNavigateToScore: updatedAnswers.length >= session.characters.length };
  };

  const navigateToScore = (answers) => {
    const score = calculateScore(answers);
    navigate("/score", {
      state: {
        score: {
          ...score,
          mode,
          groups,
        },
      },
    });
  };

  const handleBack = () => {
    navigate("/kana");
  };

  const totalCharacters = session?.characters.length || 0;
  const revealedCount = 0; // akan di-pass dari parent
  const quizProgress = quizIndex + 1;

  return {
    view,
    setView,
    quizIndex,
    setQuizIndex,
    handleStartQuiz,
    handleFinishQuiz,
    navigateToScore,
    handleBack,
    totalCharacters,
    quizProgress,
  };
}