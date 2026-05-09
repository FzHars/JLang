import { createContext, useContext, useState } from "react";

/**
 * Context for holding ephemeral training session state.
 * Avoids prop drilling through the training flow.
 * Session shape:
 * {
 *   characters:   KanaCharacter[],  // shuffled subset from nekoData
 *   currentIndex: number,           // 0-based index into characters
 *   answers:      boolean[],        // per-card correct/incorrect results
 *   startedAt:    Date,
 * }
 * or null when no session is active.
 */
const TrainingContext = createContext(null);

/**
 * Provider component that holds the training session state.
 * Wrap the app (or the relevant subtree) with this provider.
 * @param {{ children: React.ReactNode }} props
 */
function TrainingProvider({ children }) {
  const [session, setSession] = useState(null);

  return (
    <TrainingContext.Provider value={{ session, setSession }}>{children}</TrainingContext.Provider>
  );
}

/**
 * Hook to access the training context value.
 * Returns { session, setSession }.
 * @returns {{ session: object|null, setSession: Function }}
 */
function useTraining() {
  return useContext(TrainingContext);
}

export { TrainingProvider, useTraining };
