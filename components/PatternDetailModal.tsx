import React, { useEffect, useRef } from 'react';
import { PromptPattern, PatternType } from '../types';
import { X, Copy, ArrowRight, Quote } from 'lucide-react';

interface PatternDetailModalProps {
  pattern: PromptPattern | null;
  onClose: () => void;
}

export const PatternDetailModal: React.FC<PatternDetailModalProps> = ({ pattern, onClose }) => {
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  // Focus the close button when the modal opens
  useEffect(() => {
    if (pattern) {
      // Small timeout to ensure DOM is ready
      const timer = setTimeout(() => closeButtonRef.current?.focus(), 50);
      return () => clearTimeout(timer);
    }
  }, [pattern]);

  if (!pattern) return null;

  const isRitual = pattern.type === PatternType.RITUAL;
  
  let badgeClass = '';
  let typeLabel = '';
  let accentColor = '';

  // Improved contrast
  if (isRitual) {
    badgeClass = 'bg-purple-100 text-purple-900 border border-purple-200';
    typeLabel = 'RITUAL';
    accentColor = 'text-purple-700';
  } else {
    badgeClass = 'bg-emerald-100 text-emerald-900 border border-emerald-200';
    typeLabel = 'DEV PATTERN';
    accentColor = 'text-emerald-700';
  }

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-gray-900/60 backdrop-blur-sm animate-in fade-in duration-200" 
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div 
        className="bg-white border border-gray-200 w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl animate-in zoom-in-95 duration-200 flex flex-col" 
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 z-10 bg-white/95 backdrop-blur border-b border-gray-100 p-6 flex justify-between items-start">
          <div className="flex gap-5 items-start">
            <div className="text-4xl bg-gray-50 w-16 h-16 rounded-2xl flex items-center justify-center border border-gray-100 shadow-inner" aria-hidden="true">
              {pattern.icon}
            </div>
            <div>
               <div className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider mb-2 ${badgeClass}`}>
                 {typeLabel}
               </div>
               <h2 id="modal-title" className="text-xl sm:text-2xl font-bold font-mono text-gray-900 leading-tight">
                 "{pattern.trigger}"
               </h2>
            </div>
          </div>
          <button 
            ref={closeButtonRef}
            onClick={onClose}
            className="text-gray-500 hover:text-gray-900 transition-colors p-2 hover:bg-gray-100 rounded-full focus:outline-none focus:ring-2 focus:ring-emerald-500"
            aria-label="Close modal"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-8 flex-1">
          
          {/* Deep Dive Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
             <div className="bg-gray-50 p-5 rounded-xl border border-gray-100">
                <h4 className="text-gray-600 text-xs font-bold uppercase tracking-wider mb-2 flex items-center gap-2">
                    Why is it used?
                </h4>
                <p className="text-gray-900 text-sm leading-relaxed font-medium">{pattern.purpose}</p>
             </div>
             <div className="bg-gray-50 p-5 rounded-xl border border-gray-100">
                <h4 className="text-gray-600 text-xs font-bold uppercase tracking-wider mb-2 flex items-center gap-2">
                    Hidden Lesson
                </h4>
                <p className="text-gray-900 text-sm leading-relaxed font-medium">{pattern.implication}</p>
             </div>
          </div>

          {/* Examples */}
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Quote size={20} className={accentColor} aria-hidden="true" />
              Usage Example
            </h3>
            <div className="space-y-4">
              {pattern.examples.map((example, idx) => (
                <div key={idx} className="group relative bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md hover:border-gray-300 transition-all">
                  <p className="font-mono text-sm text-gray-800 pr-8 whitespace-pre-wrap leading-relaxed">{example}</p>
                  <button 
                    onClick={() => handleCopy(example)}
                    className="absolute top-3 right-3 p-2 text-gray-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-all opacity-0 group-hover:opacity-100 focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    title="Copy example"
                    aria-label="Copy example to clipboard"
                  >
                    <Copy size={16} />
                  </button>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Footer Actions */}
        <div className="border-t border-gray-100 p-6 bg-gray-50 flex justify-end">
          <button 
            onClick={onClose}
            className="px-6 py-2.5 bg-white border border-gray-200 rounded-lg text-sm font-semibold text-gray-700 hover:text-gray-900 hover:border-gray-300 hover:shadow-sm transition-all w-full sm:w-auto focus:outline-none focus:ring-2 focus:ring-emerald-500"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};