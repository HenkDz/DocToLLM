import React from 'react';
import { Globe, Loader2 } from 'lucide-react';

interface UrlFormProps {
  url: string;
  isLoading: boolean;
  onUrlChange: (url: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export function UrlForm({ url, isLoading, onUrlChange, onSubmit }: UrlFormProps) {
  return (
    <form onSubmit={onSubmit} className="w-full max-w-3xl mx-auto">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Convert Documentation</h2>
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="url"
                value={url}
                onChange={(e) => onUrlChange(e.target.value)}
                placeholder="Enter documentation URL (e.g., https://docs.example.com)"
                className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition bg-gray-50"
                required
              />
            </div>
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 transition-colors flex items-center justify-center gap-2 min-w-[140px]"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Converting...
              </>
            ) : (
              'Convert'
            )}
          </button>
        </div>
        <p className="mt-3 text-sm text-gray-500">
          Paste any documentation URL to convert it into an LLM-friendly markdown format
        </p>
      </div>
    </form>
  );
}