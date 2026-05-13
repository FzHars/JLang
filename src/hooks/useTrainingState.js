import { useState, useEffect } from "react";
import { useTraining } from "../context/TrainingContext";
import { validateTrainingParams, shuffle } from "../utils/helpers";
import nekoData from "../data/nekoData";

export function useTrainingState(mode, groups) {
  const { session, setSession } = useTraining();
  const [revealedCards, setRevealedCards] = useState({});

  // Initialize session dan revealed cards
  useEffect(() => {
    if (!validateTrainingParams(mode, groups)) return;

    let loadedCharacters;
    if (mode === "2Selected") {
      loadedCharacters = nekoData.filter(
        (c) => (c.type === "hiragana" || c.type === "katakana") && groups.includes(c.group)
      );
    } else {
      loadedCharacters = nekoData.filter((c) => c.type === mode && groups.includes(c.group));
    }

    // Initialize session
    setSession({
      characters: shuffle(loadedCharacters),
      currentIndex: 0,
      answers: [],
      startedAt: new Date(),
    });

    // Initialize revealed cards
    const initialRevealedState = {};
    loadedCharacters.forEach((char) => {
      initialRevealedState[char.id] = false;
    });
    setRevealedCards(initialRevealedState);
  }, [mode, groups, setSession]);

  const handleCardReveal = (cardId) => {
    setRevealedCards((prev) => ({
      ...prev,
      [cardId]: !prev[cardId],
    }));
  };

  const revealedCount = Object.values(revealedCards).filter(Boolean).length;
  const isSessionReady = !!session && session.characters.length > 0;

  return {
    session,
    revealedCards,
    handleCardReveal,
    revealedCount,
    isSessionReady,
  };
}