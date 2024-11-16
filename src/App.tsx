import React, { useState } from 'react';
import { Header } from './components/Header';
import { UrlForm } from './components/UrlForm';
import { Preview } from './components/Preview';
import { generateMarkdown } from './utils/markdown';
import type { ConversionResult } from './types';

function App() {
  const [url, setUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [result, setResult] = useState<ConversionResult | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const response = await fetch('/.netlify/functions/convert', {
        method: 'POST',
        body: JSON.stringify({ url }),
      });

      if (!response.ok) {
        throw new Error('Failed to convert documentation');
      }

      const data = await response.json();
      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownload = () => {
    if (!result) return;
    
    const markdown = generateMarkdown(result);
    const blob = new Blob([markdown], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'llms.md';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="space-y-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
              Transform Documentation for LLMs
            </h2>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
              Convert any web documentation into a structured, LLM-friendly markdown format
              following Jeremy Howard's llms.txt standard.
            </p>
          </div>

          <UrlForm
            url={url}
            isLoading={isLoading}
            onUrlChange={setUrl}
            onSubmit={handleSubmit}
          />

          {error && (
            <div className="max-w-3xl mx-auto">
              <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
                {error}
              </div>
            </div>
          )}

          {result && (
            <Preview
              result={result}
              markdown={generateMarkdown(result)}
              onDownload={handleDownload}
            />
          )}
        </div>
      </main>

      <footer className="mt-12 border-t border-gray-200 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-gray-500 text-sm">
            © {new Date().getFullYear()} DocToLLM. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;