import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import CategorySection from './CategorySection';
import { CATEGORIES } from '../constants/homeConstants';

export default function TypeAccordion({ 
  type,
  expandedType,
  toggleType,
  isCategoryExpanded,
  toggleCategory,
  isGroupSelected,
  toggleGroup
}) {
  return (
    <div className="bg-white border-2 border-green-200 rounded-3xl overflow-hidden shadow-xl shadow-green-100">
      <button
        onClick={() => toggleType(type)}
        className="w-full flex items-center justify-between p-6 hover:bg-green-50 transition-colors"
      >
        <div className="flex items-center gap-4">
          <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-xl font-jp shadow-sm ${
            expandedType === type ? 'bg-green-600 text-white' : 'bg-green-100 text-green-700'
          }`}>
            {type === 'hiragana' ? 'あ' : 'ア'}
          </div>
          <div className="text-left">
            <h3 className="font-bold text-lg capitalize text-green-900">{type}</h3>
            <p className="text-xs text-green-600 font-jp uppercase tracking-widest">
              {type === 'hiragana' ? 'ひらがな' : 'カタカナ'}
            </p>
          </div>
        </div>
        <div className={`transition-transform duration-300 ${expandedType === type ? 'rotate-180' : ''}`}>
          <ChevronDown className="w-6 h-6 text-green-600" />
        </div>
      </button>

      <AnimatePresence mode="wait">
        {expandedType === type && (
          <motion.div
            key={`${type}-content`}
            initial={{ height: 0 }}
            animate={{ height: 'auto' }}
            exit={{ height: 0 }}
            className="overflow-hidden bg-green-50/50 border-t border-green-200"
          >
            <div className="p-4 space-y-3">
              {CATEGORIES.map((cat) => {
                // Only show base category for now
                if (cat.id !== 'base') return null;
                
                return (
                  <CategorySection
                    key={`${type}-${cat.id}-category`}
                    type={type}
                    category={cat}
                    isExpanded={isCategoryExpanded(type, cat.id)}
                    onToggle={(t, catId) => toggleCategory(t, catId)}
                    isGroupSelected={isGroupSelected}
                    onGroupToggle={toggleGroup}
                  />
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}