import React from 'react';
import { PromptPattern, PatternType } from '../types';
import { Info, ArrowRight, Check } from 'lucide-react';

interface PatternCardProps {
  pattern: PromptPattern;
  onClick?: (pattern: PromptPattern) => void;
  isCompact?: boolean;
  isSelected?: boolean;
}

export const PatternCard: React.FC<PatternCardProps> = ({ pattern, onClick, isCompact = false, isSelected = false }) => {
  const isRitual = pattern.type === PatternType.RITUAL;
  
  let badgeClass = '';
  let typeLabel = '';

  // Improved contrast: used -900 for text on -100 backgrounds
  if (isRitual) {
    badgeClass = 'bg-purple-100 text-purple-900 border-purple-200';
    typeLabel = 'RITUAL';
  } else {
    badgeClass = 'bg-emerald-100 text-emerald-900 border-emerald-200';
    typeLabel = 'DEV PATTERN';
  }
  
  // Use semantic button if interactive
  const Component = onClick ? 'button' : 'div';
  
  return (
    <Component
      onClick={() => onClick && !isSelected && onClick(pattern)}
      type={onClick ? "button" : undefined}
      disabled={isSelected}
      className={`group relative rounded-xl transition-all duration-200 text-left w-full flex flex-col
        ${isCompact ? 'p-3 sm:p-4 h-auto' : 'p-4 sm:p-5 h-full shadow-sm'}
        ${isSelected 
            ? 'bg-emerald-50/80 border border-emerald-500 ring-1 ring-emerald-500 cursor-default' 
            : `bg-white border border-gray-200 ${onClick ? 'cursor-pointer hover:border-emerald-500/50 hover:shadow-lg hover:shadow-emerald-900/5 hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2' : ''}`}
        `}
      aria-label={onClick ? `Select pattern: ${pattern.trigger}` : undefined}
      aria-pressed={isSelected}
    >
      {isSelected && (
        <div className="absolute top-2 right-2 sm:top-3 sm:right-3 bg-emerald-600 text-white rounded-full p-0.5 shadow-sm z-10 animate-in zoom-in duration-200">
          <Check size={12} strokeWidth={3} />
        </div>
      )}

      <div className="flex justify-between items-start mb-3 w-full">
        <div className="flex items-center gap-2 sm:gap-3">
          <span className={`${isCompact ? 'text-2xl' : 'text-2xl sm:text-3xl'} filter drop-shadow-sm`} role="img" aria-hidden="true">{pattern.icon}</span>
          <span className={`text-[9px] sm:text-[10px] font-bold px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full uppercase tracking-wider border ${badgeClass}`}>
            {typeLabel}
          </span>
        </div>
        
        <div className="flex gap-1">
           {onClick && !isSelected && (
             <div className="opacity-0 group-hover:opacity-100 transition-all text-gray-400 group-hover:text-emerald-600 transform translate-x-[-10px] group-hover:translate-x-0 hidden sm:block" aria-hidden="true">
                <ArrowRight size={20} />
             </div>
           )}
        </div>
      </div>

      <div className="flex-1 flex flex-col w-full">
        <h3 className={`font-mono font-bold text-gray-900 mb-2 leading-snug break-words ${isCompact ? 'text-xs sm:text-sm' : 'text-sm sm:text-base'}`}>
          "{pattern.trigger}"
        </h3>
        {!isCompact && (
          <div className="space-y-2 sm:space-y-3 mt-auto pt-3 border-t border-gray-100 text-xs md:text-sm">
            <div className="flex gap-2">
              <Info size={14} className="mt-0.5 shrink-0 text-gray-400" aria-hidden="true" />
              <p className="text-gray-600 leading-relaxed line-clamp-2"><span className="text-gray-900 font-semibold">Purpose:</span> {pattern.purpose}</p>
            </div>
            <div className="flex gap-2">
              <span className="shrink-0 text-gray-400 text-[10px] mt-1 font-mono" aria-hidden="true">➔</span>
              <p className="text-gray-600 leading-relaxed line-clamp-2"><span className="text-gray-900 font-semibold">Implication:</span> {pattern.implication}</p>
            </div>
          </div>
        )}
      </div>
    </Component>
  );
};