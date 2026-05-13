/**
 * Training Actions
 * Defines all action types dan action creators untuk training reducer
 */

export const ACTIONS = {
  // Session initialization
  INIT_SESSION: "INIT_SESSION",

  // Learn phase actions
  REVEAL_CARD: "REVEAL_CARD",
  START_QUIZ: "START_QUIZ",

  // Quiz phase actions
  SELECT_ANSWER: "SELECT_ANSWER",
  NEXT_QUESTION: "NEXT_QUESTION",
  QUIZ_COMPLETE: "QUIZ_COMPLETE",

  // Utility
  RESET: "RESET",
};

/**
 * Action creator: Initialize training session
 */
export const initSession = (session) => ({
  type: ACTIONS.INIT_SESSION,
  payload: session,
});

/**
 * Action creator: Reveal/hide a card in learn phase
 */
export const revealCard = (cardId) => ({
  type: ACTIONS.REVEAL_CARD,
  payload: cardId,
});

/**
 * Action creator: Start quiz phase
 */
export const startQuiz = () => ({
  type: ACTIONS.START_QUIZ,
});

/**
 * Action creator: Select answer in quiz
 */
export const selectAnswer = (answer) => ({
  type: ACTIONS.SELECT_ANSWER,
  payload: answer,
});

/**
 * Action creator: Move to next question
 */
export const nextQuestion = () => ({
  type: ACTIONS.NEXT_QUESTION,
});

/**
 * Action creator: Mark quiz as complete
 */
export const quizComplete = () => ({
  type: ACTIONS.QUIZ_COMPLETE,
});

/**
 * Action creator: Reset state
 */
export const reset = () => ({
  type: ACTIONS.RESET,
});