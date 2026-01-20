import React from 'react';
import { Terminal as TerminalIcon, Copy, Check, X } from 'lucide-react';

interface TerminalProps {
  output: string;
  onClose?: () => void;
}

export const Terminal: React.FC<TerminalProps> = ({ output, onClose }) => {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="h-full flex flex-col bg-white border border-gray-200 rounded-xl overflow-hidden shadow-xl">
       <div className="bg-gray-50 p-4 border-b border-gray-200 flex justify-between items-center shrink-0">
          <div className="flex items-center gap-2 text-emerald-700">
            <TerminalIcon size={18} />
            <span className="font-mono text-sm font-bold">Final Prompt Output</span>
          </div>
          
          <div className="flex items-center gap-2">
            <button 
               onClick={handleCopy}
               className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white border border-gray-200 shadow-sm hover:border-gray-300 hover:shadow text-gray-600 hover:text-emerald-700 text-xs font-bold uppercase tracking-wider transition-all"
               aria-label="Copy to clipboard"
            >
              {copied ? <Check size={14} className="text-emerald-600" /> : <Copy size={14} />}
              {copied ? 'Copied' : 'Copy'}
            </button>
            
            {onClose && (
              <button 
                onClick={onClose}
                className="p-1.5 ml-1 text-gray-400 hover:text-gray-900 hover:bg-gray-200/50 rounded-lg transition-colors"
                aria-label="Close terminal"
              >
                <X size={20} />
              </button>
            )}
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-6 font-mono text-sm bg-white">
           {!output ? (
             <div className="flex flex-col items-center justify-center h-full text-gray-400 italic text-center space-y-2">
               <TerminalIcon size={48} className="opacity-20" />
               <p>No prompt generated yet.<br/>Go to Builder to assemble your prompt.</p>
             </div>
           ) : (
             <pre className="whitespace-pre-wrap font-mono text-sm leading-relaxed text-gray-800 bg-gray-50 p-5 rounded-lg border border-gray-200 shadow-inner">
               {output}
             </pre>
           )}
        </div>
    </div>
  );
};