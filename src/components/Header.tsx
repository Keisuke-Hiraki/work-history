'use client';

import { useState } from 'react';
import DownloadButton from './DownloadButton';
import DarkModeToggle from './DarkModeToggle';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-700">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
            Hiraki Keisuke
          </h1>
          <span className="hidden md:block text-sm text-slate-600 dark:text-slate-400">
            Solution Architect
          </span>
        </div>

        <div className="hidden md:flex items-center space-x-6">
          <nav className="flex space-x-6">
            <a href="#personal" className="text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors">
              基本情報
            </a>
            <a href="#experience" className="text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors">
              職務経歴
            </a>
            <a href="#skills" className="text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors">
              スキル
            </a>
            <a href="#certifications" className="text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors">
              資格
            </a>
          </nav>
          <div className="flex items-center space-x-3">
            <DarkModeToggle />
            <DownloadButton />
          </div>
        </div>

        <button
          className="md:hidden p-2 rounded-md text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="メニューを開く"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      {isMenuOpen && (
        <div className="md:hidden bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-700">
          <nav className="container mx-auto px-4 py-4 space-y-2">
            <a href="#personal" className="block text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors">
              基本情報
            </a>
            <a href="#experience" className="block text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors">
              職務経歴
            </a>
            <a href="#skills" className="block text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors">
              スキル
            </a>
            <a href="#certifications" className="block text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors">
              資格
            </a>
            <div className="pt-2 flex items-center space-x-3">
              <DarkModeToggle />
              <DownloadButton />
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}