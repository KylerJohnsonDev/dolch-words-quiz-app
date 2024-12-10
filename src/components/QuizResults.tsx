import React from 'react';
import { Home } from 'lucide-react';
import { QuizResult } from '../types';

interface QuizResultsProps {
  results: QuizResult;
  onReturn: () => void;
}

export function QuizResults({ results, onReturn }: QuizResultsProps) {
  const total = results.correct.length + results.incorrect.length;
  const percentage = Math.round((results.correct.length / total) * 100);

  return (
    <div className="min-h-screen p-4 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-6">
          <h1 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-200">
            Quiz Results
          </h1>
          <p className="text-xl mb-6 text-gray-700 dark:text-gray-300">
            {results.correct.length}/{total} correct - {percentage}%
          </p>
          
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-2 text-green-600 dark:text-green-400">
              Correct Words ({results.correct.length})
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {results.correct.map(word => (
                <div key={word} className="p-2 bg-green-100 dark:bg-green-900 rounded">
                  <p className="text-green-800 dark:text-green-200">{word}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-2 text-red-600 dark:text-red-400">
              Incorrect Words ({results.incorrect.length})
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {results.incorrect.map(word => (
                <div key={word} className="p-2 bg-red-100 dark:bg-red-900 rounded">
                  <p className="text-red-800 dark:text-red-200">{word}</p>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={onReturn}
            className="flex items-center justify-center w-full p-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
          >
            <Home className="w-5 h-5 mr-2" />
            Return Home
          </button>
        </div>
      </div>
    </div>
  );
}