import { motion } from "framer-motion"; 
import { Sparkles, ArrowRight } from "lucide-react";
import logoImg from "../assets/neko1.svg"

export default function LandingPage({ onStart }) {
  // const [emojiIndex, setEmojiIndex] = useState(0);
  // const emojis = ["😺", "😸"];

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setEmojiIndex((prev) => (prev + 1) % emojis.length);
  //   }, 500);
  //   return () => clearInterval(interval);
  // }, []);
  return (
    <div
      className="flex items-center justify-center min-h-screen bg-green-50"
    >
      <motion.div
        className="text-center px-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* <div className="  ">
          <img src={logoImg}/>
        </div> */}
        <motion.h1
          className="text-5xl font-bold font-sans text-green-900 mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          NekoMoji
        </motion.h1>
        <motion.p
          className="text-xl mb-8 text-green-700"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          {/* Learn Japanese characters with fun! {emojis[emojiIndex]} */}
          Learn Japanese characters with fun! 😺
        </motion.p>
        <motion.p
          className="text-lg text-gray-600 mb-12 max-w-[30rem] mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          Master hiragana and katakana through interactive flashcards and
          quizzes. Inspired by the methodologies of KanaDojo and Duolingo.{" "}
          <br />
          Start your journey to fluency today!
        </motion.p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onStart}
          className="group relative inline-flex items-center gap-3 px-8 py-4 bg-green-600 text-white rounded-2xl font-semibold text-lg shadow-xl shadow-green-100 hover:bg-green-700 transition-all"
        >
          <span>Start Learning</span>
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </motion.button>
      </motion.div>
    </div>
  );
}
