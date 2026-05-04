import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronDown, 
  ChevronRight, 
  Check, 
  Type, 
  Zap,
  Sparkles
} from 'lucide-react';
import { filterByGroup } from '../utils/helpers';
import nekoData from '../data/nekoData';
import ActionBar from './ActionBar';

// Constants for categories metadata
const CATEGORIES = [
  { id: 'base', name: 'Base Characters', icon: Type },
  { id: 'dakuon', name: 'Dakuon & Handakuon', icon: Zap },
  { id: 'yoon', name: 'Yoon (Contracted)', icon: Sparkles },
];

const GROUP_NAMES = {
  seion: 'Seion (a, i, u, e, o)',
  ka: 'Ka Series (ka, ki, ku, ke, ko)',
  sa: 'Sa Series (sa, shi, su, se, so)',
  ta: 'Ta Series (ta, chi, tsu, te, to)',
  na: 'Na Series (na, ni, nu, ne, no)',
  ha: 'Ha Series (ha, hi, fu, he, ho)',
  ma: 'Ma Series (ma, mi, mu, me, mo)',
  ya: 'Ya Series (ya, yu, yo)',
  ra: 'Ra Series (ra, ri, ru, re, ro)',
  wa: 'Wa/N Series (wa, wo, n)',
};

export default function Home({ onStart }) {
  const [expandedType, setExpandedType] = useState('');
  const [expandedCategories, setExpandedCategories] = useState(['']);
  const [selectedGroups, setSelectedGroups] = useState([]);

  const toggleType = (type) => {
    setExpandedType(expandedType === type ? null : type);
  };

  const toggleCategory = (catId) => {
    setExpandedCategories(prev => 
      prev.includes(catId) 
        ? prev.filter(id => id !== catId) 
        : [...prev, catId]
    );
  };

  const toggleGroup = (type, category, group) => {
    const groupId = `${type}-${category}-${group}`;
    setSelectedGroups(prev => 
      prev.includes(groupId)
        ? prev.filter(id => id !== groupId)
        : [...prev, groupId]
    );
  };

  const isGroupSelected = (type, category, group) => {
    return selectedGroups.includes(`${type}-${category}-${group}`);
  };

  const handleStart = () => {
    if (selectedGroups.length === 0) return;
    
    // Convert selectedGroups (string IDs) back to characters
    const selectedChars = nekoData.filter(k => 
      selectedGroups.some(id => {
        const [t, c, g] = id.split('-');
        return k.type === t && k.group === g; // Only check type and group (ignore category for now)
      })
    );
    
    onStart(selectedChars);
  };

  const getCharactersForGroup = (type, group) => {
    return filterByGroup(nekoData, type, group);
  };

  const totalSelectedChars = nekoData.filter(k => 
    selectedGroups.some(id => {
      const [t, c, g] = id.split('-');
      return k.type === t && k.group === g;
    })
  ).length;

  // Get available groups for base category (only groups that exist in nekoData)
  const getAvailableGroups = (type) => {
    return Array.from(new Set(
      nekoData
        .filter(k => k.type === type)
        .map(k => k.group)
    ));
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
          {['hiragana', 'katakana'].map((type) => (
            <div key={type} className="bg-white border-2 border-green-200 rounded-3xl overflow-hidden shadow-xl shadow-green-100">
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

              <AnimatePresence>
                {expandedType === type && (
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: 'auto' }}
                    exit={{ height: 0 }}
                    className="overflow-hidden bg-green-50/50 border-t border-green-200"
                  >
                    <div className="p-4 space-y-3">
                      {CATEGORIES.map((cat) => {
                        const Icon = cat.icon;
                        const isExpanded = expandedCategories.includes(cat.id);
                        
                        // Only show base category for now (since we only have base groups in nekoData)
                        if (cat.id !== 'base') return null;
                        
                        const groups = getAvailableGroups(type);
                        if (groups.length === 0) return null;

                        return (
                          <div key={cat.id} className="border border-green-200 bg-white shadow-sm rounded-2xl overflow-hidden">
                            <button
                              onClick={() => toggleCategory(cat.id)}
                              className="w-full flex items-center justify-between p-4 hover:bg-green-50 transition-colors"
                            >
                              <div className="flex items-center gap-3">
                                <span className={`p-1.5 rounded-lg ${isExpanded ? 'bg-green-500/20' : 'bg-green-100'}`}>
                                  <Icon className={`w-4 h-4 ${isExpanded ? 'text-green-600' : 'text-green-500'}`} />
                                </span>
                                <span className="font-bold text-sm text-green-900">{cat.name}</span>
                              </div>
                              <ChevronRight className={`w-4 h-4 text-green-600 transition-transform ${isExpanded ? 'rotate-90' : ''}`} />
                            </button>

                            <AnimatePresence>
                              {isExpanded && (
                                <motion.div
                                  initial={{ height: 0 }}
                                  animate={{ height: 'auto' }}
                                  exit={{ height: 0 }}
                                  className="overflow-hidden border-t border-green-200"
                                >
                                  <div className="p-1">
                                    {groups.map((group) => {
                                      const selected = isGroupSelected(type, cat.id, group);
                                      const chars = getCharactersForGroup(type, group);
                                      return (
                                        <button
                                          key={group}
                                          onClick={() => toggleGroup(type, cat.id, group)}
                                          className={`w-full flex items-center gap-4 p-3 rounded-xl transition-all ${
                                            selected 
                                              ? 'bg-green-500/10 text-green-800 border border-green-500/30 mb-1' 
                                              : 'hover:bg-green-50 text-green-700 m-1'
                                          }`}
                                        >
                                          <div className={`w-5 h-5 rounded border flex items-center justify-center shrink-0 transition-all ${
                                            selected ? 'bg-green-600 border-green-600 shadow-sm shadow-green-600/50' : 'bg-green-100 border-green-300'
                                          }`}>
                                            {selected && <Check className="w-3 h-3 text-white" strokeWidth={4} />}
                                          </div>
                                          <div className="flex-1 text-left min-w-0">
                                            <div className="text-sm font-bold truncate">
                                              {GROUP_NAMES[group] || group}
                                            </div>
                                            <div className="flex gap-2 mt-0.5 overflow-x-auto scrollbar-hide">
                                              {chars.slice(0, 5).map(c => (
                                                <span key={c.id} className="text-xs font-jp opacity-50 whitespace-nowrap">{c.char}</span>
                                              ))}
                                              {chars.length > 5 && <span className="text-xs opacity-50">...</span>}
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
            </div>
          ))}
        </div>

        {/* Action Bar */}
        <ActionBar 
          selectedGroups={selectedGroups}
          totalSelectedChars={totalSelectedChars}
          onStart={handleStart}
        />
        <div className="h-24" />  
      </motion.div>
    </div>
  );
}