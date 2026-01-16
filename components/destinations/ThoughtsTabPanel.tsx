'use client';

import { useState } from 'react';
import { DayThoughts } from '@/lib/types/itinerary';

interface ThoughtsTabPanelProps {
  thoughts: DayThoughts;
  defaultTab?: 'shared' | 'lissi' | 'alex';
}

export default function ThoughtsTabPanel({ thoughts, defaultTab = 'shared' }: ThoughtsTabPanelProps) {
  const [activeTab, setActiveTab] = useState<'shared' | 'lissi' | 'alex'>(defaultTab);

  // Determine which tabs to show
  const tabs: Array<{ key: 'shared' | 'lissi' | 'alex'; label: string; color: string }> = [];
  if (thoughts.shared && thoughts.shared.length > 0) tabs.push({ key: 'shared' as const, label: 'Shared Thoughts', color: 'purple' });
  if (thoughts.lissi && thoughts.lissi.length > 0) tabs.push({ key: 'lissi' as const, label: "Lissi's Thoughts", color: 'teal' });
  if (thoughts.alex && thoughts.alex.length > 0) tabs.push({ key: 'alex' as const, label: "Alex's Thoughts", color: 'coral' });

  // If no thoughts, don't render anything
  if (tabs.length === 0) return null;

  // Set default to first available tab if current isn't available
  if (!tabs.find(t => t.key === activeTab)) {
    setTimeout(() => setActiveTab(tabs[0].key), 0);
  }

  const getTabStyles = (tabKey: string, color: string) => {
    const isActive = activeTab === tabKey;
    const baseStyles = 'px-4 py-2 text-sm font-semibold transition-all rounded-t-lg';

    if (isActive) {
      return `${baseStyles} bg-${color}/20 text-${color} border-b-2 border-${color}`;
    }
    return `${baseStyles} bg-gray-700 text-gray-300 hover:bg-gray-600`;
  };

  const getBulletColor = (color: string) => {
    return `text-${color}`;
  };

  const currentThoughts = thoughts[activeTab] || [];

  return (
    <div className="mt-4">
      {/* Tab buttons */}
      <div className="flex flex-wrap gap-2 mb-0">
        {tabs.map(({ key, label, color }) => (
          <button
            key={key}
            onClick={() => setActiveTab(key)}
            className={getTabStyles(key, color)}
            aria-selected={activeTab === key}
            role="tab"
          >
            {label}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div
        className="bg-gray-800/50 p-6 rounded-b-lg rounded-tr-lg border border-gray-700"
        role="tabpanel"
      >
        {currentThoughts.length > 0 ? (
          <ul className="space-y-3">
            {currentThoughts.map((thought, idx) => (
              <li key={idx} className="flex items-start gap-3 text-gray-300">
                <span className={`${getBulletColor(tabs.find(t => t.key === activeTab)?.color || 'purple')} text-lg mt-0.5`}>
                  •
                </span>
                <span>{thought}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-400 italic">No thoughts recorded for this section.</p>
        )}
      </div>
    </div>
  );
}
