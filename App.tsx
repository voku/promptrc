import React, { useState } from 'react';
import { Library } from './components/Library';
import { Builder } from './components/Builder';
import { Terminal } from './components/Terminal';
import { Layers, Wand2 } from 'lucide-react';
import { PromptPattern } from './types';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'library' | 'workbench'>('library');
  
  // Builder State
  const [selectedPatterns, setSelectedPatterns] = useState<PromptPattern[]>([]);
  const [userContext, setUserContext] = useState('');
  const [generatedOutput, setGeneratedOutput] = useState('');
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);

  const handleAddPattern = (pattern: PromptPattern) => {
    // Prevent duplicates
    if (!selectedPatterns.find(p => p.id === pattern.id)) {
      setSelectedPatterns([...selectedPatterns, pattern]);
    }
  };

  const handleRemovePattern = (index: number) => {
    const newPatterns = [...selectedPatterns];
    newPatterns.splice(index, 1);
    setSelectedPatterns(newPatterns);
  };

  const handleGenerate = () => {
    const blocks = selectedPatterns.map(p => `${p.trigger}\n// ${p.purpose}`);
    const context = userContext ? `\n\nCONTEXT:\n${userContext}` : '';
    const fullPrompt = `${blocks.join('\n\n')}${context}`;
    
    setGeneratedOutput(fullPrompt);
    setIsTerminalOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 text-gray-900 font-sans">
      {/* Navigation Bar */}
      <nav className="border-b border-gray-200 bg-white/80 backdrop-blur-md sticky top-0 z-40 supports-[backdrop-filter]:bg-white/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center text-white font-bold font-mono shadow-md shadow-emerald-600/20">
                P
              </div>
              <span className="font-mono text-lg font-bold tracking-tight text-gray-900 hidden sm:block">.promptrc</span>
            </div>
            
            {/* Tabs */}
            <div className="flex bg-gray-100 p-1 rounded-xl">
              <button
                onClick={() => setActiveTab('library')}
                className={`flex items-center gap-2 px-4 py-1.5 rounded-lg text-sm font-bold transition-all ${
                  activeTab === 'library' 
                    ? 'bg-white text-emerald-700 shadow-sm' 
                    : 'text-gray-500 hover:text-gray-900'
                }`}
              >
                <Layers size={16} />
                <span>Reference</span>
              </button>
              <button
                onClick={() => setActiveTab('workbench')}
                className={`flex items-center gap-2 px-4 py-1.5 rounded-lg text-sm font-bold transition-all ${
                  activeTab === 'workbench' 
                    ? 'bg-white text-emerald-700 shadow-sm' 
                    : 'text-gray-500 hover:text-gray-900'
                }`}
              >
                <Wand2 size={16} />
                <span>Workbench</span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        <div className={activeTab === 'library' ? 'block' : 'hidden'}>
           <Library />
        </div>
        <div className={activeTab === 'workbench' ? 'block h-[calc(100vh-8rem)]' : 'hidden'}>
           <Builder 
             selectedPatterns={selectedPatterns}
             onAddPattern={handleAddPattern}
             onRemovePattern={handleRemovePattern}
             userContext={userContext}
             setUserContext={setUserContext}
             onGenerate={handleGenerate}
           />
        </div>
      </main>
      
      {/* Footer */}
      <footer className="border-t border-gray-200 bg-white py-8 text-center text-gray-500 text-sm mt-auto">
        <p className="font-mono">Prompt Engineer Toolkit // 2025</p>
        <p className="mt-2">
          <a 
            href="https://github.com/voku/promptrc" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-emerald-600 hover:text-emerald-700 underline"
          >
            Contribute on GitHub
          </a>
        </p>
      </footer>

      {/* Terminal Modal */}
      {isTerminalOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-sm animate-in fade-in duration-200" 
          onClick={() => setIsTerminalOpen(false)}
        >
          <div 
            className="w-full max-w-3xl h-[600px] relative animate-in zoom-in-95 duration-200 shadow-2xl rounded-xl overflow-hidden" 
            onClick={e => e.stopPropagation()}
          >
             <Terminal 
               output={generatedOutput} 
               onClose={() => setIsTerminalOpen(false)} 
             />
          </div>
        </div>
      )}
    </div>
  );
};

export default App;