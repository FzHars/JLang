import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { encodeTrainingParams } from "../../utils/helpers.js";
import nekoData from "../../data/nekoData.js";
import ActionBar from "../../components/ActionBar.jsx";
import KanaAccordion from "./KanaAccordion.jsx";

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

// Page-level Framer Motion variants
const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.25 } },
};

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function Kana() {
  const navigate = useNavigate();

  // =========================================================================
  // State Management hehe
  const [expandedTypes, setExpandedTypes] = useState({
    hiragana: true,
    katakana: true,
  });

  const [expandedCategories, setExpandedCategories] = useState({
    hiragana: [],
    katakana: [],
  });

  const [selectedGroups, setSelectedGroups] = useState({
    hiragana: [],
    katakana: [],
  });

  // =========================================================================
  // Handlersssss
  // =========================================================================
  const handleTypeToggle = (type) => {
    setExpandedTypes((prev) => ({
      ...prev,
      [type]: !prev[type],
    }));
  };

  const handleCategoryToggle = (type, catId) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [type]: prev[type].includes(catId)
        ? prev[type].filter((id) => id !== catId)
        : [...prev[type], catId],
    }));
  };

  const handleGroupToggle = (type, group) => {
    setSelectedGroups((prev) => ({
      ...prev,
      [type]: prev[type].includes(group)
        ? prev[type].filter((g) => g !== group)
        : [...prev[type], group],
    }));
  };

  const handleStart = () => {
    const hasHira = selectedGroups.hiragana.length > 0;
    const hasKata = selectedGroups.katakana.length > 0;

    if (!hasHira && !hasKata) return;

    let mode, groups;

    if (hasHira && hasKata) {
      // Both selected: combine both
      mode = "2Selected";
      groups = [...selectedGroups.hiragana, ...selectedGroups.katakana];
    } else if (hasHira) {
      // Only hiragana
      mode = "hiragana";
      groups = selectedGroups.hiragana;
    } else {
      // Only katakana
      mode = "katakana";
      groups = selectedGroups.katakana;
    }

    const params = encodeTrainingParams(mode, groups);
    navigate(`/training?${params}`);
  };

  // =========================================================================
  // Derived Values
  // =========================================================================

  // Count total selected characters
  const totalSelectedCharsHiragana = nekoData.filter(
    (c) => c.type === "hiragana" && selectedGroups.hiragana.includes(c.group),
  ).length;

  const totalSelectedCharsKatakana = nekoData.filter(
    (c) => c.type === "katakana" && selectedGroups.katakana.includes(c.group),
  ).length;
  // =========================================================================
  // Render
  // =========================================================================

  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="min-h-screen pt-8 pb-32 px-4 md:px-6 max-w-6xl mx-auto bg-green-50"
    >
      <div className="space-y-8">
        {/* Page Heading */}
        <div className="space-y-3 text-center">
          <h2 className="text-4xl font-bold font-sans tracking-tight text-green-900">
            Training Config
          </h2>
          <p className="text-green-700 text-lg">
            Pick the characters you want to practice.
          </p>
        </div>
        {/* Accordion Grid */} 
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
          <KanaAccordion
            type="hiragana"
            isExpanded={expandedTypes.hiragana}
            selectedGroups={selectedGroups.hiragana}
            expandedCategories={expandedCategories.hiragana}
            onTypeToggle={() => handleTypeToggle("hiragana")}
            onGroupToggle={(group) => handleGroupToggle("hiragana", group)}
            onCategoryToggle={(catId) =>
              handleCategoryToggle("hiragana", catId)
            }
          />

          <KanaAccordion
            type="katakana"
            isExpanded={expandedTypes.katakana}
            selectedGroups={selectedGroups.katakana}
            expandedCategories={expandedCategories.katakana}
            onTypeToggle={() => handleTypeToggle("katakana")}
            onGroupToggle={(group) => handleGroupToggle("katakana", group)}
            onCategoryToggle={(catId) =>
              handleCategoryToggle("katakana", catId)
            }
          />
        </div>
        {/* Spacer so content isn't hidden behind fixed ActionBar */}
        <div className="h-24" />
      </div>

        <ActionBar
          selectedGroupsHiragana={selectedGroups.hiragana}
          selectedGroupsKatakana={selectedGroups.katakana}
          totalSelectedCharsHiragana={totalSelectedCharsHiragana}
          totalSelectedCharsKatakana={totalSelectedCharsKatakana}
          onStart={handleStart}
        /> 
    </motion.div>
  );
}