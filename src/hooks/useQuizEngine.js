import { useState, useEffect } from "react";
import { shuffle } from "../utils/helpers";
import nekoData from "../data/nekoData";

export function useQuizEngine(session, mode, view, quizIndex) {
  const [quizOptions, setQuizOptions] = useState([]);
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  // Generate quiz options saat view berubah ke quiz atau quizIndex berubah
  useEffect(() => {
    if (view !== "quiz" || !session || session.characters.length === 0) return;

    const currentCharacter = session.characters[quizIndex];
    if (!currentCharacter) return;

    const correctAnswer = currentCharacter.romanization;

    // Get all characters dari same type untuk distractors
    let sameTypeCharacters;
    if (mode === "2Selected") {
      sameTypeCharacters = nekoData.filter(
        (c) => c.type === "hiragana" || c.type === "katakana"
      );
    } else {
      sameTypeCharacters = nekoData.filter((c) => c.type === mode);
    }

    // Get unique distractors
    const availableDistractors = [
      ...new Set(
        sameTypeCharacters
          .filter((c) => c.romanization !== correctAnswer)
          .map((c) => c.romanization)
      ),
    ];

    const shuffledDistractors = shuffle(availableDistractors);
    const distractors = shuffledDistractors.slice(0, 3);

    setQuizOptions(shuffle([correctAnswer, ...distractors]));
  }, [view, quizIndex, mode]);

  const currentCharacter = session?.characters[quizIndex] || null;
  const isAnswered = selectedAnswer !== null;
  const totalCharacters = session?.characters.length || 0;
  const isLastQuestion = quizIndex + 1 >= totalCharacters;

  return {
    quizIndex,
    selectedAnswer,
    setSelectedAnswer,
    quizOptions,
    currentCharacter,
    isAnswered,
    isLastQuestion,
    totalCharacters,
  };
}