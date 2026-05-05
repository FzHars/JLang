import { motion } from 'framer-motion';
import ActionBar from './ActionBar';
import TypeAccordion from './TypeAccordion';
import { useAccordionState } from '../hooks/useAccordionState';
import { useGroupSelection } from '../hooks/useGroupSelection';

export default function Home({ onStart }) {
  const {
    expandedType,
    toggleType,
    isCategoryExpanded,
    toggleCategory
  } = useAccordionState();

  const {
    selectedGroups,
    toggleGroup,
    isGroupSelected,
    getSelectedCharacters,
    getTotalSelectedChars
  } = useGroupSelection();

  const handleStart = () => {
    if (selectedGroups.length === 0) return;
    const selectedChars = getSelectedCharacters();
    onStart(selectedChars);
  };

  return (
    <div className="min-h-screen pt-8 pb-32 px-4 md:px-6 max-w-6xl mx-auto bg-green-50">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-8"
      >
        <div className="space-y-3 text-center">
          <h2 className="text-4xl font-bold font-sans tracking-tight text-green-900">Training Config</h2>
          <p className="text-green-700 text-lg">Pick the characters you want to practice.</p>
        </div>

        {/* Horizontal Layout - Side by Side */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <TypeAccordion
            key="hiragana-accordion"
            type="hiragana"
            expandedType={expandedType}
            toggleType={toggleType}
            isCategoryExpanded={isCategoryExpanded}
            toggleCategory={toggleCategory}
            isGroupSelected={isGroupSelected}
            toggleGroup={toggleGroup}
          />
          <TypeAccordion
            key="katakana-accordion"
            type="katakana"
            expandedType={expandedType}
            toggleType={toggleType}
            isCategoryExpanded={isCategoryExpanded}
            toggleCategory={toggleCategory}
            isGroupSelected={isGroupSelected}
            toggleGroup={toggleGroup}
          />
        </div>

        {/* Action Bar */}
        <ActionBar 
          selectedGroups={selectedGroups}
          totalSelectedChars={getTotalSelectedChars()}
          onStart={handleStart}
        />
        <div className="h-24" /> {/* Spacer for fixed bottom bar */}
      </motion.div>
    </div>
  );
}