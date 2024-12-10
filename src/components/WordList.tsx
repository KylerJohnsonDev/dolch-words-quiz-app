import React from 'react';
import { dolchWords } from '../data/dolchWords';

interface WordListProps {
  selectedGroup: string | 'all';
}

export function WordList({ selectedGroup }: WordListProps) {
  const filteredWords = selectedGroup === 'all'
    ? dolchWords
    : dolchWords.filter(group => group.grouping === selectedGroup);

  return (
    <div className="p-4">
      {filteredWords.map((group) => (
        <div key={group.grouping} className="mb-8">
          <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-gray-200">
            {group.grouping}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {group.words.map((word) => (
              <div
                key={word}
                className="p-3 bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-shadow"
              >
                <p className="text-center text-gray-700 dark:text-gray-300">{word}</p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}