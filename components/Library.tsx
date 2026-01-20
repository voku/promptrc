import React, { useState, useMemo } from 'react';
import { ALL_PATTERNS } from '../constants';
import { PatternCard } from './PatternCard';
import { PatternDetailModal } from './PatternDetailModal';
import { PromptPattern, PatternType } from '../types';
import { Search } from 'lucide-react';

export const Library: React.FC = () => {
  const [search, setSearch] = useState('');
  const [selectedPattern, setSelectedPattern] = useState<PromptPattern | null>(null);
  const [typeFilter, setTypeFilter] = useState<'ALL' | PatternType>('ALL');

  const filteredPatterns = useMemo(() => {
    return ALL_PATTERNS.filter(p => {
      const matchesSearch = 
        p.trigger.toLowerCase().includes(search.toLowerCase()) || 
        p.purpose.toLowerCase().includes(search.toLowerCase());
      const matchesType = typeFilter === 'ALL' || p.type === typeFilter;
      return matchesSearch && matchesType;
    });
  }, [search, typeFilter]);

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
      {/* Header & Search */}
      <div className="flex flex-col xl:flex-row justify-between items-start xl:items-end gap-6 mb-8 sm:mb-10">
        <div className="max-w-2xl w-full">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight mb-3">.promptrc</h1>
          <p className="text-gray-600 text-base sm:text-lg leading-relaxed mb-4">
            Steal these hints. Fork it. Adapt it. Treat it like <code className="bg-gray-200 px-1 py-0.5 rounded text-gray-800 text-sm font-mono whitespace-nowrap">.dotfiles</code> for your LLM interactions.
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-3 w-full xl:w-auto">
           {/* Type Toggles */}
           <div className="flex flex-wrap sm:flex-nowrap bg-white p-1.5 rounded-xl border border-gray-200 shadow-sm gap-1">
              <button 
                onClick={() => setTypeFilter('ALL')}
                className={`flex-1 sm:flex-none px-3 sm:px-4 py-2 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
                  typeFilter === 'ALL' 
                    ? 'bg-gray-100 text-gray-900 shadow-sm' 
                    : 'text-gray-500 hover:text-gray-800 hover:bg-gray-50'
                }`}
              >
                ALL
              </button>
              <button 
                onClick={() => setTypeFilter(PatternType.RITUAL)}
                className={`flex-1 sm:flex-none px-3 sm:px-4 py-2 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
                  typeFilter === PatternType.RITUAL 
                    ? 'bg-purple-50 text-purple-700 border border-purple-100 shadow-sm' 
                    : 'text-gray-500 hover:text-purple-600 hover:bg-purple-50'
                }`}
              >
                RITUALS
              </button>
              <button 
                onClick={() => setTypeFilter(PatternType.DEV_PATTERN)}
                className={`flex-1 sm:flex-none px-3 sm:px-4 py-2 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
                  typeFilter === PatternType.DEV_PATTERN 
                    ? 'bg-emerald-50 text-emerald-700 border border-emerald-100 shadow-sm' 
                    : 'text-gray-500 hover:text-emerald-600 hover:bg-emerald-50'
                }`}
              >
                DEV
              </button>
           </div>

           {/* Search Input */}
           <div className="relative group w-full md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-emerald-600 transition-colors" size={18} />
            <input 
              type="text" 
              placeholder="Search triggers..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-white border border-gray-200 rounded-xl pl-10 pr-4 py-2.5 text-sm text-gray-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all placeholder:text-gray-400"
            />
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
        {filteredPatterns.map(pattern => (
          <PatternCard 
            key={pattern.id} 
            pattern={pattern} 
            onClick={setSelectedPattern}
          />
        ))}
        {filteredPatterns.length === 0 && (
          <div className="col-span-full flex flex-col items-center justify-center py-20 text-center border-2 border-dashed border-gray-200 rounded-2xl bg-gray-50/50">
            <div className="text-4xl mb-4">🔍</div>
            <p className="text-gray-500 font-medium text-lg">No patterns found matching "{search}"</p>
            <p className="text-gray-400 text-sm mt-2">Try adjusting your filters or search terms</p>
          </div>
        )}
      </div>

      {/* Modal */}
      <PatternDetailModal 
        pattern={selectedPattern} 
        onClose={() => setSelectedPattern(null)}
      />
    </div>
  );
};