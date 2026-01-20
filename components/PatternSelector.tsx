import React, { useState } from 'react';
import { ALL_PATTERNS } from '../constants';
import { PromptPattern } from '../types';
import { PatternCard } from './PatternCard';
import { Wand2 } from 'lucide-react';

interface PatternSelectorProps {
  selectedPatterns: PromptPattern[];
  onAddPattern: (pattern: PromptPattern) => void;
}

export const PatternSelector: React.FC<PatternSelectorProps> = ({ 
  selectedPatterns, 
  onAddPattern 
}) => {
  const [filter, setFilter] = useState('');

  const filteredPatterns = ALL_PATTERNS.filter(p => 
    p.trigger.toLowerCase().includes(filter.toLowerCase()) || 
    p.purpose.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="flex flex-col gap-3 lg:gap-4 lg:w-1/2 h-1/2 lg:h-full min-h-0">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 shrink-0">
        <h2 className="text-lg sm:text-xl font-bold font-mono text-emerald-700 flex items-center gap-2">
          <Wand2 size={20} /> Pattern Library
        </h2>
        <input 
          type="text"
          placeholder="Search..."
          className="bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all w-full sm:w-48 shadow-sm"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 overflow-y-auto pr-1 sm:pr-2 pb-2 content-start flex-1 min-h-0">
        {filteredPatterns.map(pattern => (
          <PatternCard 
            key={pattern.id} 
            pattern={pattern} 
            onClick={onAddPattern} 
            isCompact={true}
            isSelected={selectedPatterns.some(p => p.id === pattern.id)}
          />
        ))}
      </div>
    </div>
  );
};