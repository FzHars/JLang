import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate, useSearchParams } from "react-router-dom";
import { validateTrainingParams, shuffle, calculateScore } from "../../utils/helpers.js";
import { useTraining } from "../../context/TrainingContext.jsx";
import nekoData from "../../data/nekoData.js";
import Card from "../../components/Card.jsx";
import QuizOptions from "../../components/QuizOptions.jsx";
import Header from "../../components/Header.jsx";

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.25 } },
};

export default function TrainingMode() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { session, setSession } = useTraining();

  // Local state for the current training flow
  const [isCardRevealed, setIsCardRevealed] = useState(false);
  const [quizOptions, setQuizOptions] = useState([]);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showQuiz, setShowQuiz] = useState(false);

  // Read URL parameters
  const mode = searchParams.get("mode");
  const groups = searchParams.get("groups")?.split(",") ?? [];

  // Guard: validate parameters and redirect if invalid
  useEffect(() => {
    if (!validateTrainingParams(mode, groups)) {
      navigate("/kana", { replace: true });
    }
  }, [mode, groups, navigate]);

  // Initialize session when component mounts with valid params
  useEffect(() => {
    if (validateTrainingParams(mode, groups)) {
      // Load characters matching the mode and groups
      let loadedCharacters;
      
      if (mode === "both") {
        // If mode is "both", load from both hiragana and katakana
        loadedCharacters = nekoData.filter(
          (c) => (c.type === "hiragana" || c.type === "katakana") && groups.includes(c.group)
        );
      } else {
        // Single type: hiragana or katakana
        loadedCharacters = nekoData.filter(
          (c) => c.type === mode && groups.includes(c.group)
        );
      }

      // Initialize training session
      setSession({
        characters: shuffle(loadedCharacters),
        currentIndex: 0,
        answers: [],
        startedAt: new Date(),
      });
    }
  }, [mode, groups, setSession]);

  // Generate quiz options when card is revealed
  useEffect(() => {
    if (!isCardRevealed || !session || session.characters.length === 0) return;
    
    // Only generate if quiz not already shown (prevent regeneration)
    if (showQuiz) return;

    const currentCharacter = session.characters[session.currentIndex];
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

    // Generate 3 random distractors (excluding the correct answer)
    const distractors = [];
    const availableDistractors = sameTypeCharacters
      .filter((c) => c.romanization !== correctAnswer)
      .map((c) => c.romanization);

    // Shuffle and take 3 unique distractors
    const shuffledDistractors = shuffle(availableDistractors);
    for (let i = 0; i < Math.min(3, shuffledDistractors.length); i++) {
      if (!distractors.includes(shuffledDistractors[i])) {
        distractors.push(shuffledDistractors[i]);
      }
    }

    // Combine correct answer with distractors and shuffle
    const allOptions = [correctAnswer, ...distractors];
    setQuizOptions(shuffle(allOptions));
    setShowQuiz(true);
  }, [isCardRevealed, showQuiz, mode]);

  const handleCardReveal = () => {
    setIsCardRevealed(true);
  };

  const handleQuizSelect = (selectedOption) => {
    if (selectedAnswer !== null) return; // Already answered

    setSelectedAnswer(selectedOption);

    if (!session) return;

    const currentCharacter = session.characters[session.currentIndex];
    const isCorrect = selectedOption === currentCharacter.romanization;

    // Update answers array
    const updatedAnswers = [...session.answers, isCorrect];

    // Update session with new answer
    setSession({
      ...session,
      answers: updatedAnswers,
    });

    // Move to next card after a short delay, or finish if this was the last card
    setTimeout(() => {
      // Use updatedAnswers.length to avoid stale closure - it's the current value
      // If answers length >= total characters, quiz is complete
      if (updatedAnswers.length >= session.characters.length) {
        // Quiz completed - navigate to score page
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
        // Move to next card
        setSession({
          ...session,
          currentIndex: session.currentIndex + 1,
          answers: updatedAnswers,
        });

        // Reset card state for next character
        setIsCardRevealed(false);
        setSelectedAnswer(null);
        setShowQuiz(false);
        setQuizOptions([]);
      }
    }, 1500); // Give user time to see the result
  };

  const handleBack = () => {
    navigate("/kana");
  };

  // Don't render anything if session is not initialized or params are invalid
  if (!session || !validateTrainingParams(mode, groups)) {
    return null;
  }

  const currentCharacter = session.characters[session.currentIndex];
  const progress = session.currentIndex + 1;
  const total = session.characters.length;
  const modeLabel = mode === "both" ? "Hiragana & Katakana" : mode;

  return (
    <>
      <Header title={`Training: ${modeLabel} (${progress}/${total})`} onBack={handleBack} />

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
              <span className="text-sm font-medium text-green-700">Progress</span>
              <span className="text-sm font-medium text-green-700">
                {progress} of {total}
              </span>
            </div>
            <div className="w-full bg-green-100 rounded-full h-2">
              <div
                className="bg-green-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${(progress / total) * 100}%` }}
              />
            </div>
          </div>

          {/* Card section */}
          <div className="mb-8">
            <Card
              character={currentCharacter}
              isRevealed={isCardRevealed}
              onReveal={handleCardReveal}
            />
          </div>

          {/* Quiz section */}
          {showQuiz && isCardRevealed && (
            <div className="space-y-6">
              <div className="text-center">
                <h2 className="text-xl font-bold text-green-900 mb-2">What is the romanization?</h2>
                <p className="text-green-700">
                  Choose the correct reading for{" "}
                  <span className="font-jp font-bold text-2xl">{currentCharacter.char}</span>
                </p>
              </div>

              <QuizOptions
                options={quizOptions}
                onSelect={handleQuizSelect}
                selected={selectedAnswer}
                correct={currentCharacter.romanization}
              />
            </div>
          )}

          {/* Instructions */}
          {!isCardRevealed && (
            <div className="text-center mt-8">
              <p className="text-green-600 text-sm">
                Tap the card to reveal the romanization, then answer the quiz
              </p>
            </div>
          )}
        </div>
      </motion.div>
    </>
  );
}