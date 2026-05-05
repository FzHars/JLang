import { Check } from 'lucide-react';
import { filterByGroup } from '../utils/helpers';
import nekoData from '../data/nekoData';
import { GROUP_NAMES } from '../constants/homeConstants';

export default function GroupItem({ 
  type, 
  category, 
  group, 
  isSelected, 
  onToggle 
}) {
  const chars = filterByGroup(nekoData, type, group);

  return (
    <button
      onClick={() => onToggle(type, category, group)}
      className={`w-full flex items-center gap-4 p-3 rounded-xl transition-all ${
        isSelected 
          ? 'bg-green-500/10 text-green-800 border border-green-500/30 mb-1' 
          : 'hover:bg-green-50 text-green-700 m-1'
      }`}
    >
      <div className={`w-5 h-5 rounded border flex items-center justify-center shrink-0 transition-all ${
        isSelected ? 'bg-green-600 border-green-600 shadow-sm shadow-green-600/50' : 'bg-green-100 border-green-300'
      }`}>
        {isSelected && <Check className="w-3 h-3 text-white" strokeWidth={4} />}
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
}