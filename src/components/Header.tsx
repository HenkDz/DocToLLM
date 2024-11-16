import React from 'react';
import { FileText, Github } from 'lucide-react';

export function Header() {
  return (
    <header className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-2">
            <FileText className="w-8 h-8 text-indigo-600" />
            <div>
              <h1 className="text-xl font-semibold text-gray-900">DocToLLM</h1>
              <p className="text-sm text-gray-500">Enterprise Documentation Converter</p>
            </div>
          </div>
          <a
            href="https://github.com/yourusername/doctollm"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-gray-500 hover:text-gray-700 transition-colors"
          >
            <Github className="w-5 h-5" />
            <span className="hidden sm:inline">View on GitHub</span>
          </a>
        </div>
      </div>
    </header>
  );
}