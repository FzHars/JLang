import { useState } from "react";
import { motion } from "motion/react";
import { BookOpen, ChevronDown } from "lucide-react";
import { filterByGroup } from "../utils/helpers";
import nekoData from "../data/nekoData";

const groups = ["vowels", "ka", "sa", "ta", "na", "ha", "ma", "ya", "ra", "wa"];

export default function Home({ onStart }) {
  const [selectedMode, setSelectedMode] = useState(null);
  const [selectedGroup, setSelectedGroup] = useState("vowels");

  const getCharacterCount = (mode, group) => {
    if (!mode) return 0;
    return filterByGroup(nekoData, mode, group).length;
  };

  const handleStart = () => {
    if (selectedMode) {
      onStart(selectedMode, selectedGroup);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 px-4">
      <motion.div
        className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <motion.div
          className="flex items-center justify-center mb-6"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <BookOpen className="w-8 h-8 text-indigo-600 mr-2" />
          <h1 className="text-3xl font-bold text-gray-800">Select Mode</h1>
        </motion.div>

        {/* Mode Selection */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <p className="text-sm font-semibold text-gray-600 mb-3">Choose Character Type:</p>
          <div className="flex gap-4">
            <button
              onClick={() => setSelectedMode("hiragana")}
              className={`flex-1 py-3 px-4 rounded-lg font-semibold transition-all ${
                selectedMode === "hiragana"
                  ? "bg-indigo-600 text-white shadow-lg"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              ひらがな
            </button>
            <button
              onClick={() => setSelectedMode("katakana")}
              className={`flex-1 py-3 px-4 rounded-lg font-semibold transition-all ${
                selectedMode === "katakana"
                  ? "bg-indigo-600 text-white shadow-lg"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              カタカナ
            </button>
          </div>
        </motion.div>

        {/* Group Selection */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <p className="text-sm font-semibold text-gray-600 mb-3">Select Group:</p>
          <div className="relative">
            <select
              value={selectedGroup}
              onChange={(e) => setSelectedGroup(e.target.value)}
              className="w-full py-3 px-4 bg-gray-50 border-2 border-gray-200 rounded-lg font-semibold text-gray-700 appearance-none cursor-pointer hover:border-indigo-300 focus:outline-none focus:border-indigo-600"
            >
              {groups.map((group) => (
                <option key={group} value={group}>
                  {group.charAt(0).toUpperCase() + group.slice(1)}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
          </div>
        </motion.div>

        {/* Character Count */}
        <motion.div
          className="mb-8 p-4 bg-indigo-50 rounded-lg border-2 border-indigo-200"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          <p className="text-center text-gray-700">
            <span className="font-bold text-indigo-600 text-lg">
              {getCharacterCount(selectedMode, selectedGroup)}
            </span>
            <span className="text-gray-600"> characters in this group</span>
          </p>
        </motion.div>

        {/* Start Button */}
        <motion.button
          onClick={handleStart}
          disabled={!selectedMode}
          whileHover={selectedMode ? { scale: 1.05 } : {}}
          whileTap={selectedMode ? { scale: 0.95 } : {}}
          className={`w-full py-4 px-6 rounded-lg font-semibold text-lg transition-all ${
            selectedMode
              ? "bg-indigo-600 text-white shadow-lg hover:bg-indigo-700 cursor-pointer"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          Start Training
        </motion.button>
      </motion.div>
    </div>
  );
}
