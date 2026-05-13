/**
 * Training Reducer
 * Pure state machine logic for training sessions
 */

import { ACTIONS } from "./trainingActions.js";

/**
 * Initial state shape
 */
export const initialState = {
  // Session data
  session: null,

  // Learn phase
  revealedCards: {}, // { charId: boolean }

  // Quiz phase
  view: "learn", // "learn" | "quiz"
  quizIndex: 0,
  selectedAnswer: null,
  quizOptions: [], // 4 romanization options

  // Metadata
  isValid: false,
};

/**
 * Helper: Initialize revealed cards object from characters array
 * @param {Array} characters - Array of character objects
 * @returns {Object} Object mapping charId -> false (all unrevealed)
 */
function initializeRevealedCards(characters) {
  const revealed = {};
  characters.forEach((char) => {
    revealed[char.id] = false;
  });
  return revealed;
}

/**
 * Helper: Generate quiz options (1 correct + 3 distractors)
 * @param {Object} character - Current character object
 * @param {Array} allCharacters - All characters for distractor selection
 * @returns {Array} Array of 4 romanization options
 */
function generateQuizOptions(character, allCharacters) {
  const correctAnswer = character.romanization;

  // Get all possible romanizations
  const allRomanizations = [...new Set(allCharacters.map((c) => c.romanization))];

  // Get 3 distractors (different from correct answer)
  const distractors = allRomanizations
    .filter((r) => r !== correctAnswer)
    .sort(() => Math.random() - 0.5)
    .slice(0, 3);

  // Combine and shuffle
  const options = [correctAnswer, ...distractors].sort(() => Math.random() - 0.5);

  return options;
}

/**
 * Main reducer function - pure state machine
 * @param {Object} state - Current state
 * @param {Object} action - Action object with type and optional payload
 * @returns {Object} New state
 */
export const trainingReducer = (state, action) => {
  switch (action.type) {
    // ===== INITIALIZATION =====
    case ACTIONS.INIT_SESSION: {
      const { characters, mode, groups, ...rest } = action.payload;
      return {
        ...state,
        session: {
          characters,
          mode,
          groups,
          answers: [],
          startedAt: new Date(),
          ...rest,
        },
        revealedCards: initializeRevealedCards(characters),
        isValid: true,
      };
    }

    // ===== LEARN PHASE =====
    case ACTIONS.REVEAL_CARD: {
      const cardId = action.payload;
      return {
        ...state,
        revealedCards: {
          ...state.revealedCards,
          [cardId]: !state.revealedCards[cardId],
        },
      };
    }

    case ACTIONS.START_QUIZ: {
      if (!state.session || state.session.characters.length === 0) {
        return state;
      }

      const firstChar = state.session.characters[0];
      const options = generateQuizOptions(firstChar, state.session.characters);

      return {
        ...state,
        view: "quiz",
        quizIndex: 0,
        selectedAnswer: null,
        quizOptions: options,
      };
    }

    // ===== QUIZ PHASE =====
    case ACTIONS.SELECT_ANSWER: {
      return {
        ...state,
        selectedAnswer: action.payload,
      };
    }

    case ACTIONS.NEXT_QUESTION: {
      if (!state.session) return state;

      const nextIndex = state.quizIndex + 1;
      const characters = state.session.characters;

      // Check if quiz is complete
      if (nextIndex >= characters.length) {
        return {
          ...state,
          view: "quiz_complete",
        };
      }

      const nextChar = characters[nextIndex];
      const options = generateQuizOptions(nextChar, characters);

      return {
        ...state,
        quizIndex: nextIndex,
        selectedAnswer: null,
        quizOptions: options,
      };
    }

    case ACTIONS.QUIZ_COMPLETE: {
      return {
        ...state,
        view: "quiz_complete",
      };
    }

    // ===== UTILITY =====
    case ACTIONS.RESET: {
      return initialState;
    }

    default: {
      return state;
    }
  }
};