'use client';

import { useTheme } from '@/contexts/ThemeContext';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full transition-all border-2"
      style={{
        backgroundColor: theme === 'alex' ? '#1f2937' : '#ffffff',
        borderColor: theme === 'alex' ? '#374151' : '#d1d5db',
        color: theme === 'alex' ? '#f3f4f6' : '#1f2937',
      }}
      aria-label={`Switch to ${theme === 'alex' ? 'Lissi' : 'Alex'} mode`}
    >
      {theme === 'alex' ? (
        <>
          <span className="text-lg sm:text-2xl">🌙</span>
          <span className="text-xs sm:text-sm font-semibold">Alex</span>
        </>
      ) : (
        <>
          <span className="text-lg sm:text-2xl">☀️</span>
          <span className="text-xs sm:text-sm font-semibold">Lissi</span>
        </>
      )}
    </button>
  );
}
