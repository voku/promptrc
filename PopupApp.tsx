import React, { useState, useMemo } from 'react';
import { Search, Settings, Copy, ExternalLink } from 'lucide-react';
import { ALL_PATTERNS } from './constants';
import { PromptPattern, PatternType } from './types';

const PopupApp: React.FC = () => {
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState<'ALL' | PatternType>('ALL');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const filteredPatterns = useMemo(() => {
    return ALL_PATTERNS.filter(p => {
      const matchesSearch = 
        p.trigger.toLowerCase().includes(search.toLowerCase()) || 
        p.purpose.toLowerCase().includes(search.toLowerCase()) ||
        p.id.toLowerCase().includes(search.toLowerCase());
      const matchesType = typeFilter === 'ALL' || p.type === typeFilter;
      return matchesSearch && matchesType;
    }).slice(0, 10); // Limit to 10 for popup
  }, [search, typeFilter]);

  const handleCopyPrompt = (pattern: PromptPattern) => {
    navigator.clipboard.writeText(pattern.trigger);
    setCopiedId(pattern.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleInsertPrompt = async (pattern: PromptPattern) => {
    // Send message to content script to insert the prompt
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    if (tab.id) {
      chrome.tabs.sendMessage(tab.id, {
        action: 'insertPrompt',
        pattern: pattern
      });
      window.close(); // Close popup after insertion
    }
  };

  const openOptions = () => {
    chrome.runtime.openOptionsPage();
  };

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Header */}
      <div className="px-4 py-3 border-b border-gray-200 bg-gradient-to-r from-emerald-50 to-white">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-emerald-600 rounded-md flex items-center justify-center text-white font-bold text-xs">
              P
            </div>
            <span className="font-mono text-sm font-bold text-gray-900">.promptrc</span>
          </div>
          <button
            onClick={openOptions}
            className="p-1.5 text-gray-600 hover:text-emerald-600 hover:bg-emerald-50 rounded-md transition-colors"
            title="Open settings"
          >
            <Settings size={16} />
          </button>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={14} />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search patterns... (or type / in any field)"
            className="w-full pl-9 pr-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
          />
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-1 mt-2">
          {['ALL', PatternType.RITUAL, PatternType.DEV_PATTERN].map((type) => (
            <button
              key={type}
              onClick={() => setTypeFilter(type as typeof typeFilter)}
              className={`px-2 py-1 rounded text-xs font-semibold transition-colors ${
                typeFilter === type
                  ? 'bg-emerald-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {type === 'ALL' ? 'All' : type.replace('_', ' ')}
            </button>
          ))}
        </div>
      </div>

      {/* Pattern List */}
      <div className="flex-1 overflow-y-auto p-2">
        {filteredPatterns.length === 0 ? (
          <div className="text-center py-8 text-gray-500 text-sm">
            <p>No patterns found.</p>
            <p className="mt-1">Try a different search term.</p>
          </div>
        ) : (
          <div className="space-y-1">
            {filteredPatterns.map((pattern) => (
              <div
                key={pattern.id}
                className="p-2 rounded-lg hover:bg-gray-50 border border-gray-200 hover:border-emerald-300 transition-all cursor-pointer group"
              >
                <div className="flex items-start gap-2">
                  <span className="text-lg flex-shrink-0 mt-0.5">{pattern.icon || '📝'}</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-xs font-semibold text-gray-900 truncate">
                        {pattern.id.replace(/^(ritual|pat)-/, '')}
                      </h3>
                      <span className="px-1.5 py-0.5 bg-blue-100 text-blue-800 text-[10px] font-medium rounded flex-shrink-0">
                        {pattern.type.replace('_', ' ')}
                      </span>
                    </div>
                    <p className="text-[11px] text-gray-600 leading-tight mb-2 line-clamp-2">
                      {pattern.trigger}
                    </p>
                    <div className="flex gap-1">
                      <button
                        onClick={() => handleCopyPrompt(pattern)}
                        className="flex items-center gap-1 px-2 py-1 text-[10px] font-medium text-emerald-700 bg-emerald-50 rounded hover:bg-emerald-100 transition-colors"
                        title="Copy to clipboard"
                      >
                        <Copy size={10} />
                        {copiedId === pattern.id ? 'Copied!' : 'Copy'}
                      </button>
                      <button
                        onClick={() => handleInsertPrompt(pattern)}
                        className="flex items-center gap-1 px-2 py-1 text-[10px] font-medium text-blue-700 bg-blue-50 rounded hover:bg-blue-100 transition-colors"
                        title="Insert into current page"
                      >
                        <ExternalLink size={10} />
                        Insert
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="px-4 py-2 border-t border-gray-200 bg-gray-50">
        <p className="text-[10px] text-gray-600 text-center">
          💡 Type <code className="bg-gray-200 px-1 rounded">/</code> in any text field to search • 
          <code className="bg-gray-200 px-1 rounded mx-1">Ctrl+Shift+I</code> to quick insert
        </p>
      </div>
    </div>
  );
};

export default PopupApp;
