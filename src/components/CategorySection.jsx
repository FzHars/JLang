import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import GroupItem from './GroupItem';
import nekoData from '../data/nekoData';

export default function CategorySection({ 
  type,
  category,
  isExpanded,
  onToggle,
  isGroupSelected,
  onGroupToggle
}) {
  const Icon = category.icon;
  
  const getAvailableGroups = (type) => {
    return Array.from(new Set(
      nekoData
        .filter(k => k.type === type)
        .map(k => k.group)
    ));
  };

  const groups = getAvailableGroups(type);
  if (groups.length === 0) return null;

  return (
    <div className="border border-green-200 bg-white shadow-sm rounded-2xl overflow-hidden">
      <button
        onClick={() => onToggle(type, category.id)}
        className="w-full flex items-center justify-between p-4 hover:bg-green-50 transition-colors"
      >
        <div className="flex items-center gap-3">
          <span className={`p-1.5 rounded-lg ${isExpanded ? 'bg-green-500/20' : 'bg-green-100'}`}>
            <Icon className={`w-4 h-4 ${isExpanded ? 'text-green-600' : 'text-green-500'}`} />
          </span>
          <span className="font-bold text-sm text-green-900">{category.name}</span>
        </div>
        <ChevronRight className={`w-4 h-4 text-green-600 transition-transform ${isExpanded ? 'rotate-90' : ''}`} />
      </button>

      <AnimatePresence mode="wait">
        {isExpanded && (
          <motion.div
            key={`${type}-${category.id}-content`}
            initial={{ height: 0 }}
            animate={{ height: 'auto' }}
            exit={{ height: 0 }}
            className="overflow-hidden border-t border-green-200"
          >
            <div className="p-1">
              {groups.map((group) => (
                <GroupItem
                  key={`${type}-${category.id}-${group}`}
                  type={type}
                  category={category.id}
                  group={group}
                  isSelected={isGroupSelected(type, category.id, group)}
                  onToggle={onGroupToggle}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}