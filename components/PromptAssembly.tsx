import React from 'react';
import { PromptPattern } from '../types';
import { Trash2, Copy, FileOutput, ArrowDown } from 'lucide-react';

interface PromptAssemblyProps {
  selectedPatterns: PromptPattern[];
  onRemovePattern: (index: number) => void;
  userContext: string;
  setUserContext: (text: string) => void;
  onGenerate: () => void;
}

export const PromptAssembly: React.FC<PromptAssemblyProps> = ({
  selectedPatterns,
  onRemovePattern,
  userContext,
  setUserContext,
  onGenerate
}) => {
  const copyToClipboard = () => {
    const fullPrompt = [
      ...selectedPatterns.map(p => p.trigger),
      userContext
    ].join('\n\n');
    navigator.clipboard.writeText(fullPrompt);
  };

  return (
    <div className="flex flex-col bg-white border border-gray-200 rounded-xl overflow-hidden shadow-xl lg:w-1/2 h-1/2 lg:h-full min-h-0">
      <div className="bg-gray-50 p-3 sm:p-4 border-b border-gray-200 flex justify-between items-center shrink-0">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-red-400 border border-red-500/20" />
          <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-yellow-400 border border-yellow-500/20" />
          <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-emerald-400 border border-emerald-500/20" />
          <span className="ml-2 sm:ml-3 font-mono text-xs sm:text-sm text-gray-500 font-medium">.promptrc</span>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={copyToClipboard}
            className="p-1.5 sm:p-2 hover:bg-white hover:shadow-sm border border-transparent hover:border-gray-200 rounded text-gray-500 hover:text-emerald-600 transition-all"
            title="Copy to Clipboard"
          >
            <Copy size={16} className="sm:w-[18px] sm:h-[18px]" />
          </button>
          <button 
            onClick={onGenerate}
            className="flex items-center gap-2 px-3 py-1.5 sm:px-4 bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-bold rounded-lg shadow-sm hover:shadow transition-all"
          >
            <FileOutput size={14} className="sm:w-4 sm:h-4" /> 
            <span>Generate</span>
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 font-mono text-xs sm:text-sm bg-white min-h-0">
        {selectedPatterns.length === 0 && !userContext && (
          <div className="flex flex-col items-center justify-center h-full text-gray-400 text-center italic border-2 border-dashed border-gray-100 rounded-lg p-4">
            <span className="mb-2 text-2xl">🏗️</span>
            Select patterns from the library <br/> to build your prompt configuration...
          </div>
        )}

        {selectedPatterns.map((pattern, idx) => (
          <div key={`${pattern.id}-${idx}`} className="group relative pl-4 sm:pl-6 border-l-2 border-emerald-500 hover:border-emerald-600 transition-colors">
            <div className="absolute left-0 top-0 -translate-x-[5px] -translate-y-[5px] opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity">
              <button 
                onClick={() => onRemovePattern(idx)}
                className="bg-white border border-gray-200 text-red-500 hover:bg-red-50 p-1 rounded-full shadow-sm"
                aria-label="Remove pattern"
              >
                <Trash2 size={12} />
              </button>
            </div>
            <p className="text-emerald-700 font-bold mb-1">{pattern.trigger}</p>
            <p className="text-gray-400 text-[10px] sm:text-xs italic">// {pattern.purpose}</p>
            
            {idx < selectedPatterns.length - 1 && (
               <div className="my-2 flex justify-center opacity-20 text-gray-400">
                  <ArrowDown size={12} />
               </div>
            )}
          </div>
        ))}

        <div className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-gray-100">
           <label className="block text-gray-400 text-[10px] sm:text-xs uppercase tracking-wider mb-2 font-bold">Task Context / Payload</label>
           <textarea 
             value={userContext}
             onChange={(e) => setUserContext(e.target.value)}
             placeholder="Paste your specific code, error message, or task description here..."
             className="w-full bg-gray-50 text-gray-900 border border-gray-200 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 resize-none h-[100px] sm:h-[120px] placeholder:text-gray-400 transition-all text-xs sm:text-sm font-sans"
           />
        </div>
      </div>
    </div>
  );
};