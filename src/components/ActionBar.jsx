import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';

export default function ActionBar({ 
  selectedGroups, 
  totalSelectedChars, 
  onStart 
}) {
  return (
    <div className="fixed bottom-0 left-0 right-0 p-4 md:p-6 bg-white/90 backdrop-blur-xl border-t border-green-200 z-50">
      <div className="max-w-6xl mx-auto flex items-center justify-between gap-4 md:gap-6">
        <div className="hidden sm:block">
          <div className="text-[10px] font-bold text-green-600 uppercase tracking-widest mb-1">
            Session Data
          </div>
          <p className="text-base font-bold text-green-900">
            {selectedGroups.length} Selected
          </p>
        </div>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onStart}
          disabled={selectedGroups.length === 0}
          className={`flex-1 sm:flex-none flex items-center justify-center gap-3 px-8 md:px-12 py-4 rounded-2xl font-bold text-lg shadow-xl transition-all ${
            selectedGroups.length > 0
              ? 'bg-green-600 text-white hover:bg-green-700 shadow-green-600/50'
              : 'bg-green-200 text-green-500 cursor-not-allowed shadow-none'
          }`}
        >
          <span>Practice {totalSelectedChars} items</span>
          <ChevronRight className="w-5 h-5" />
        </motion.button>
      </div>
    </div>
  );
}