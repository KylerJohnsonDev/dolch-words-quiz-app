import React from 'react';
import { X, Check, LogOut } from 'lucide-react';

interface FlashCardProps {
  word: string;
  onCorrect: () => void;
  onIncorrect: () => void;
  onExit: () => void;
}

export function FlashCard({ word, onCorrect, onIncorrect, onExit }: FlashCardProps) {
  const handleExit = () => {
    if (window.confirm('Are you sure you want to exit the quiz?')) {
      onExit();
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
        <div className="text-4xl font-bold text-center mb-8 text-gray-800 dark:text-gray-200">
          {word}
        </div>
        <div className="flex justify-center space-x-4">
          <button
            onClick={handleExit}
            className="p-4 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600"
            aria-label="Exit quiz"
          >
            <LogOut className="w-6 h-6 text-gray-600 dark:text-gray-300" />
          </button>
          <button
            onClick={onIncorrect}
            className="p-4 rounded-full bg-red-100 dark:bg-red-900 hover:bg-red-200 dark:hover:bg-red-800"
            aria-label="Mark as incorrect"
          >
            <X className="w-6 h-6 text-red-600 dark:text-red-300" />
          </button>
          <button
            onClick={onCorrect}
            className="p-4 rounded-full bg-green-100 dark:bg-green-900 hover:bg-green-200 dark:hover:bg-green-800"
            aria-label="Mark as correct"
          >
            <Check className="w-6 h-6 text-green-600 dark:text-green-300" />
          </button>
        </div>
      </div>
    </div>
  );
}