import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, Check, Type, Zap, Sparkles } from "lucide-react";
import { filterByGroup } from "../../utils/helpers.js";
import nekoData from "../../data/nekoData.js";

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const CATEGORIES = [
  {
    id: "base",
    name: "Seion",
    icon: Type,
  },
  {
    id: "dakuon",
    name: "Dakuon",
    icon: Zap,
  },
  {
    id: "yoon",
    name: "Yoon",
    icon: Sparkles,
  },
];

const GROUP_NAMES = {
  seion: "a, i, u, e, o",
  ka: "ka, ki, ku, ke, ko",
  sa: "sa, shi, su, se, so",
  ta: "ta, chi, tsu, te, to",
  na: "na, ni, nu, ne, no",
  ha: "ha, hi, fu, he, ho",
  ma: "ma, mi, mu, me, mo",
  ya: "ya, yu, yo",
  ra: "ra, ri, ru, re, ro",
  wa: "wa, wo, n",
};

// Type metadata
const TYPE_CONFIG = {
  hiragana: {
    icon: "あ",
    label: "Hiragana",
    labelJp: "ひらがな",
  },
  katakana: {
    icon: "ア",
    label: "Katakana",
    labelJp: "カタカナ",
  },
};

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

/**
 * HiraganaAccordion
 *
 * Props:
 *   - type: "hiragana" or "katakana"
 *   - isExpanded: boolean - is the type section expanded?
 *   - selectedGroups: array of selected group IDs
 *   - expandedCategories: array of expanded category IDs
 *   - onTypeToggle: callback() when user clicks type header
 *   - onGroupToggle: callback(groupId) when user clicks a group checkbox
 *   - onCategoryToggle: callback(categoryId) when user expands/collapses a category
 */
export default function HiraganaAccordion({
  type,
  isExpanded,
  expandedCategories,
  selectedGroups,
  onTypeToggle,
  onGroupToggle,
  onCategoryToggle,
}) {
  // you forget set this lol
  // Get config for this type
  const config = TYPE_CONFIG[type];

  // ---------------------------------------------------------------------------
  // Derived values
  // ---------------------------------------------------------------------------

  /**
   * Get all available groups for this type from nekoData.
   */
  function getAvailableGroups() {
    return Array.from(new Set(nekoData.filter((c) => c.type === type).map((c) => c.group)));
  }

  const availableGroups = getAvailableGroups();

  // ---------------------------------------------------------------------------
  // Render
  // ---------------------------------------------------------------------------

  return (
    <div className="bg-white border-2 border-green-200 rounded-3xl overflow-hidden shadow-xl shadow-green-100">
      {/* Type Header */}
      <button
        onClick={onTypeToggle}
        className="w-full flex items-center justify-between p-6 bg-green-50 hover:bg-green-100 transition-colors"
      >
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-xl font-jp shadow-sm bg-green-600 text-white">
            {config.icon}
          </div>
          <div className="text-left">
            <h3 className="font-bold text-lg capitalize text-green-900">{config.label}</h3>
            <p className="text-xs text-green-600 font-jp uppercase tracking-widest">
              {config.labelJp}
            </p>
          </div>
        </div>
        <ChevronRight
          className={`w-5 h-5 text-green-600 transition-transform ${isExpanded ? "rotate-90" : ""}`}
        />
      </button>

      {/* Type Body - Categories & Groups */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{
              height: 0,
            }}
            animate={{
              height: "auto",
            }}
            exit={{
              height: 0,
            }}
            className="overflow-hidden bg-green-50/50 border-t border-green-200"
          >
            <div className="p-4 space-y-3">
              {CATEGORIES.map((cat) => {
                const Icon = cat.icon;
                const isCatExpanded = expandedCategories.includes(cat.id);

                // Only show categories that have groups in nekoData
                if (cat.id !== "base") return null;

                return (
                  <div
                    key={cat.id}
                    className="border border-green-200 bg-white shadow-sm rounded-2xl overflow-hidden"
                  >
                    {/* Category Header - Toggle Button */}
                    <button
                      onClick={() => onCategoryToggle(cat.id)}
                      className="w-full flex items-center justify-between p-4 hover:bg-green-50 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        {/* Icon */}
                        <span
                          className={`p-1.5 rounded-lg ${isCatExpanded ? "bg-green-500/20" : "bg-green-100"}`}
                        >
                          <Icon
                            className={`w-4 h-4 ${isCatExpanded ? "text-green-600" : "text-green-500"}`}
                          />
                        </span>
                        {/* Category name */}
                        <span className="font-bold text-sm text-green-900">{cat.name}</span>
                      </div>
                      {/* Chevron indicator */}
                      <ChevronRight
                        className={`w-4 h-4 text-green-600 transition-transform ${isCatExpanded ? "rotate-90" : ""}`}
                      />
                    </button>

                    {/* Category Body - Group List */}
                    <AnimatePresence>
                      {isCatExpanded && (
                        <motion.div
                          initial={{
                            height: 0,
                          }}
                          animate={{
                            height: "auto",
                          }}
                          exit={{
                            height: 0,
                          }}
                          className="overflow-hidden border-t border-green-200"
                        >
                          <div className="p-1">
                            {availableGroups.map((group) => {
                              const isSelected = selectedGroups.includes(group);
                              const chars = filterByGroup(nekoData, type, group);

                              return (
                                <button
                                  key={group}
                                  onClick={() => onGroupToggle(group)}
                                  className={`w-full flex items-center gap-4 p-3 rounded-xl transition-all ${isSelected ? "bg-green-500/10 text-green-800 border border-green-500/30 mb-1" : "hover:bg-green-50 text-green-700 m-1"}`}
                                >
                                  {/* Checkbox */}
                                  <div
                                    className={`w-5 h-5 rounded border flex items-center justify-center shrink-0 transition-all ${isSelected ? "bg-green-600 border-green-600 shadow-sm shadow-green-600/50" : "bg-green-100 border-green-300"}`}
                                  >
                                    {isSelected && (
                                      <Check className="w-3 h-3 text-white" strokeWidth={4} />
                                    )}
                                  </div>

                                  {/* Group label + character preview */}
                                  <div className="flex-1 text-left min-w-0">
                                    <div className="text-sm font-bold truncate">
                                      {GROUP_NAMES[group] || group}
                                    </div>
                                    {/* Character preview (first 5 chars) */}
                                    <div className="flex gap-2 mt-0.5 overflow-x-auto scrollbar-hide">
                                      {chars.slice(0, 5).map((c) => (
                                        <span
                                          key={c.id}
                                          className="text-md font-jp opacity-50 whitespace-nowrap"
                                        >
                                          {c.char}
                                        </span>
                                      ))}
                                      {chars.length > 5 && (
                                        <span className="text-xs opacity-50">...</span>
                                      )}
                                    </div>
                                  </div>
                                </button>
                              );
                            })}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      {/* <div className="bg-green-50/50 border-t border-green-200">
        <div className="p-4 space-y-3">aaaaaaaaaaaa</div>
      </div> */}
    </div>
  );
}
