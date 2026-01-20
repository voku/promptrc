import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { Plus, Trash2, Save, X } from 'lucide-react';
import { PromptPattern, PatternType } from '../types';
import { ALL_PATTERNS } from '../constants';

const Options: React.FC = () => {
  const [customPatterns, setCustomPatterns] = useState<PromptPattern[]>([]);
  const [isAdding, setIsAdding] = useState(false);
  const [editForm, setEditForm] = useState({
    id: '',
    trigger: '',
    purpose: '',
    implication: '',
    type: PatternType.DEV_PATTERN,
    icon: '📝',
    examples: ['']
  });
  const [saveStatus, setSaveStatus] = useState('');

  useEffect(() => {
    loadCustomPatterns();
  }, []);

  const loadCustomPatterns = async () => {
    try {
      chrome.storage.sync.get(['customPatterns'], (result) => {
        if (chrome.runtime.lastError) {
          console.error('Failed to load custom patterns:', chrome.runtime.lastError);
          return;
        }
        setCustomPatterns((result.customPatterns || []) as PromptPattern[]);
      });
    } catch (error) {
      console.error('Error loading custom patterns:', error);
    }
  };

  const handleSavePattern = async () => {
    if (!editForm.trigger || !editForm.purpose) {
      alert('Trigger and Purpose are required');
      return;
    }

    const newPattern: PromptPattern = {
      id: editForm.id || `custom-${Date.now()}`,
      trigger: editForm.trigger,
      purpose: editForm.purpose,
      implication: editForm.implication,
      type: editForm.type,
      icon: editForm.icon,
      examples: editForm.examples.filter(e => e.trim() !== '')
    };

    chrome.storage.sync.get(['customPatterns'], (result) => {
      if (chrome.runtime.lastError) {
        alert('Failed to save pattern: ' + chrome.runtime.lastError.message);
        return;
      }
      const patterns = (result.customPatterns || []) as PromptPattern[];
      const existingIndex = patterns.findIndex((p: PromptPattern) => p.id === newPattern.id);
      
      if (existingIndex !== -1) {
        patterns[existingIndex] = newPattern;
      } else {
        patterns.push(newPattern);
      }

      chrome.storage.sync.set({ customPatterns: patterns }, () => {
        if (chrome.runtime.lastError) {
          alert('Failed to save pattern: ' + chrome.runtime.lastError.message);
          return;
        }
        loadCustomPatterns();
        setIsAdding(false);
        resetForm();
        setSaveStatus('Saved!');
        setTimeout(() => setSaveStatus(''), 2000);
      });
    });
  };

  const handleDeletePattern = (patternId: string) => {
    if (!confirm('Delete this custom pattern?')) return;

    chrome.storage.sync.get(['customPatterns'], (result) => {
      if (chrome.runtime.lastError) {
        alert('Failed to delete pattern: ' + chrome.runtime.lastError.message);
        return;
      }
      const patterns = (result.customPatterns || []) as PromptPattern[];
      const filtered = patterns.filter((p: PromptPattern) => p.id !== patternId);
      chrome.storage.sync.set({ customPatterns: filtered }, () => {
        if (chrome.runtime.lastError) {
          alert('Failed to delete pattern: ' + chrome.runtime.lastError.message);
          return;
        }
        loadCustomPatterns();
        setSaveStatus('Deleted!');
        setTimeout(() => setSaveStatus(''), 2000);
      });
    });
  };

  const resetForm = () => {
    setEditForm({
      id: '',
      trigger: '',
      purpose: '',
      implication: '',
      type: PatternType.DEV_PATTERN,
      icon: '📝',
      examples: ['']
    });
  };

  const handleAddExample = () => {
    setEditForm({
      ...editForm,
      examples: [...editForm.examples, '']
    });
  };

  const handleExampleChange = (index: number, value: string) => {
    const newExamples = [...editForm.examples];
    newExamples[index] = value;
    setEditForm({ ...editForm, examples: newExamples });
  };

  const handleRemoveExample = (index: number) => {
    const newExamples = editForm.examples.filter((_, i) => i !== index);
    setEditForm({ ...editForm, examples: newExamples });
  };

  return (
    <div className="max-w-5xl mx-auto">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 mb-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-emerald-600 rounded-lg flex items-center justify-center text-white font-bold text-lg">
            P
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">.promptrc Options</h1>
            <p className="text-sm text-gray-600">Manage your custom prompt patterns</p>
          </div>
        </div>

        <div className="mb-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <h3 className="font-semibold text-blue-900 mb-2">How to use slash commands:</h3>
          <ol className="list-decimal list-inside text-sm text-blue-800 space-y-1">
            <li>Type <code className="bg-blue-100 px-1 py-0.5 rounded">/</code> in any text field (ChatGPT, Claude, etc.)</li>
            <li>Start typing to filter patterns (e.g., <code className="bg-blue-100 px-1 py-0.5 rounded">/rabbit</code>)</li>
            <li>Use ↑↓ arrows to navigate, Enter to select</li>
            <li>Or use <code className="bg-blue-100 px-1 py-0.5 rounded">Ctrl+Shift+I</code> to open the prompt picker</li>
          </ol>
        </div>

        {saveStatus && (
          <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg text-green-800 text-sm font-medium">
            {saveStatus}
          </div>
        )}

        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-bold text-gray-900">Custom Patterns ({customPatterns.length})</h2>
          <button
            onClick={() => {
              setIsAdding(true);
              resetForm();
            }}
            className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors font-medium text-sm"
          >
            <Plus size={16} />
            Add Pattern
          </button>
        </div>

        {isAdding && (
          <div className="mb-6 p-6 bg-gray-50 border border-gray-200 rounded-lg">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-gray-900">New Custom Pattern</h3>
              <button
                onClick={() => {
                  setIsAdding(false);
                  resetForm();
                }}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={20} />
              </button>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Icon (emoji)
                  </label>
                  <input
                    type="text"
                    value={editForm.icon}
                    onChange={(e) => setEditForm({ ...editForm, icon: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    placeholder="📝"
                    maxLength={2}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Type
                  </label>
                  <select
                    value={editForm.type}
                    onChange={(e) => setEditForm({ ...editForm, type: e.target.value as PatternType })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  >
                    <option value={PatternType.RITUAL}>Ritual</option>
                    <option value={PatternType.DEV_PATTERN}>Dev Pattern</option>
                    <option value={PatternType.COMBINATION}>Combination</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Trigger Text *
                </label>
                <input
                  type="text"
                  value={editForm.trigger}
                  onChange={(e) => setEditForm({ ...editForm, trigger: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  placeholder="e.g., Follow the white rabbit..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Purpose *
                </label>
                <input
                  type="text"
                  value={editForm.purpose}
                  onChange={(e) => setEditForm({ ...editForm, purpose: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  placeholder="e.g., Marks a mode shift into high-context thinking"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Implication
                </label>
                <input
                  type="text"
                  value={editForm.implication}
                  onChange={(e) => setEditForm({ ...editForm, implication: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  placeholder="e.g., Cognitive priming for complexity"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Examples
                </label>
                {editForm.examples.map((example, index) => (
                  <div key={index} className="flex gap-2 mb-2">
                    <textarea
                      value={example}
                      onChange={(e) => handleExampleChange(index, e.target.value)}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                      placeholder="Example usage..."
                      rows={2}
                    />
                    {editForm.examples.length > 1 && (
                      <button
                        onClick={() => handleRemoveExample(index)}
                        className="px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg"
                      >
                        <Trash2 size={16} />
                      </button>
                    )}
                  </div>
                ))}
                <button
                  onClick={handleAddExample}
                  className="text-sm text-emerald-600 hover:text-emerald-700 font-medium"
                >
                  + Add another example
                </button>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  onClick={handleSavePattern}
                  className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors font-medium"
                >
                  <Save size={16} />
                  Save Pattern
                </button>
                <button
                  onClick={() => {
                    setIsAdding(false);
                    resetForm();
                  }}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-medium"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="space-y-3">
          {customPatterns.length === 0 && !isAdding && (
            <div className="text-center py-12 text-gray-500">
              <p className="mb-2">No custom patterns yet.</p>
              <p className="text-sm">Click "Add Pattern" to create your first one!</p>
            </div>
          )}

          {customPatterns.map((pattern) => (
            <div key={pattern.id} className="p-4 bg-white border border-gray-200 rounded-lg hover:border-gray-300 transition-colors">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xl">{pattern.icon}</span>
                    <span className="font-semibold text-gray-900">{pattern.id}</span>
                    <span className="px-2 py-0.5 bg-blue-100 text-blue-800 text-xs font-medium rounded">
                      {pattern.type}
                    </span>
                  </div>
                  <p className="text-sm text-gray-700 mb-1 font-medium">{pattern.trigger}</p>
                  <p className="text-xs text-gray-600">{pattern.purpose}</p>
                </div>
                <button
                  onClick={() => handleDeletePattern(pattern.id)}
                  className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  title="Delete pattern"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-bold text-gray-900 mb-4">Built-in Patterns ({ALL_PATTERNS.length})</h2>
        <p className="text-sm text-gray-600 mb-4">
          These patterns are included by default and can be accessed via slash commands.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-96 overflow-y-auto">
          {ALL_PATTERNS.slice(0, 20).map((pattern) => (
            <div key={pattern.id} className="p-3 bg-gray-50 border border-gray-200 rounded-lg">
              <div className="flex items-center gap-2 mb-1">
                <span>{pattern.icon}</span>
                <span className="text-xs font-semibold text-gray-900">{pattern.id}</span>
              </div>
              <p className="text-xs text-gray-600 line-clamp-2">{pattern.trigger}</p>
            </div>
          ))}
          {ALL_PATTERNS.length > 20 && (
            <div className="col-span-2 text-center text-sm text-gray-500 py-2">
              ... and {ALL_PATTERNS.length - 20} more patterns
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById('options-root')!);
root.render(
  <React.StrictMode>
    <Options />
  </React.StrictMode>
);

export default Options;
