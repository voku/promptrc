import React from 'react';
import { PromptPattern } from '../types';
import { PatternSelector } from './PatternSelector';
import { PromptAssembly } from './PromptAssembly';

interface BuilderProps {
  selectedPatterns: PromptPattern[];
  onRemovePattern: (index: number) => void;
  onAddPattern: (pattern: PromptPattern) => void;
  userContext: string;
  setUserContext: (text: string) => void;
  onGenerate: () => void;
}

export const Builder: React.FC<BuilderProps> = ({ 
  selectedPatterns, 
  onRemovePattern, 
  onAddPattern,
  userContext,
  setUserContext,
  onGenerate
}) => {
  return (
    <div className="flex flex-col lg:flex-row h-full gap-4 lg:gap-6">
      {/* Selection Panel */}
      <PatternSelector 
        selectedPatterns={selectedPatterns}
        onAddPattern={onAddPattern}
      />

      {/* Assembly Panel */}
      <PromptAssembly 
        selectedPatterns={selectedPatterns}
        onRemovePattern={onRemovePattern}
        userContext={userContext}
        setUserContext={setUserContext}
        onGenerate={onGenerate}
      />
    </div>
  );
};