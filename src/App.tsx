import React, { useState } from 'react';
import { ThemeToggle } from './components/ThemeToggle';
import { WordList } from './components/WordList';
import { GroupSelector } from './components/GroupSelector';
import { FlashCard } from './components/FlashCard';
import { QuizResults } from './components/QuizResults';
import { dolchWords } from './data/dolchWords';
import { QuizState } from './types';

function App() {
  const [view, setView] = useState<'home' | 'quiz-setup' | 'quiz' | 'results'>('home');
  const [selectedGroup, setSelectedGroup] = useState<string | 'all'>('all');
  const [quizState, setQuizState] = useState<QuizState>({
    selectedGroups: [],
    currentWords: [],
    currentIndex: 0,
    results: { correct: [], incorrect: [] }
  });

  const startQuiz = () => {
    if (quizState.selectedGroups.length === 0) {
      alert('Please select at least one word group');
      return;
    }

    const words = dolchWords
      .filter(group => quizState.selectedGroups.includes(group.grouping))
      .flatMap(group => group.words)
      .sort(() => Math.random() - 0.5);

    setQuizState(prev => ({
      ...prev,
      currentWords: words,
      currentIndex: 0,
      results: { correct: [], incorrect: [] }
    }));
    setView('quiz');
  };

  const handleQuizAction = (correct: boolean) => {
    const currentWord = quizState.currentWords[quizState.currentIndex];
    const newResults = {
      correct: [...quizState.results.correct],
      incorrect: [...quizState.results.incorrect]
    };

    if (correct) {
      newResults.correct.push(currentWord);
    } else {
      newResults.incorrect.push(currentWord);
    }

    if (quizState.currentIndex === quizState.currentWords.length - 1) {
      setQuizState(prev => ({ ...prev, results: newResults }));
      setView('results');
    } else {
      setQuizState(prev => ({
        ...prev,
        currentIndex: prev.currentIndex + 1,
        results: newResults
      }));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
   

      {view === 'home' && (
        <div className="max-w-4xl mx-auto p-4">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold">Dolch Sight Words</h1>
            <div className='flex flex-row gap-4'>
            <button
              onClick={() => setView('quiz-setup')}
              className="hidden sm:block px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Start Quiz
            </button>
            <ThemeToggle />
            </div>
          </div>

          <button
              onClick={() => setView('quiz-setup')}
              className="sm:hidden w-full px-4 py-2 mb-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Start Quiz
            </button>
          
          <div className="mb-4">
            <select
              value={selectedGroup}
              onChange={(e) => setSelectedGroup(e.target.value)}
              className="w-full md:w-auto px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800"
            >
              <option value="all">All Groups</option>
              {dolchWords.map(group => (
                <option key={group.grouping} value={group.grouping}>
                  {group.grouping}
                </option>
              ))}
            </select>
          </div>

          <WordList selectedGroup={selectedGroup} />
        </div>
      )}

      {view === 'quiz-setup' && (
        <div className="max-w-md mx-auto p-4">
          <h1 className="text-2xl font-bold mb-6">Select Word Groups</h1>
          <GroupSelector
            selectedGroups={quizState.selectedGroups}
            onChange={(groups) => setQuizState(prev => ({ ...prev, selectedGroups: groups }))}
          />
          <div className="flex space-x-4 mt-6">
            <button
              onClick={() => setView('home')}
              className="flex-1 px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={startQuiz}
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Start Quiz
            </button>
          </div>
        </div>
      )}

      {view === 'quiz' && (
        <FlashCard
          word={quizState.currentWords[quizState.currentIndex]}
          onCorrect={() => handleQuizAction(true)}
          onIncorrect={() => handleQuizAction(false)}
          onExit={() => setView('home')}
        />
      )}

      {view === 'results' && (
        <QuizResults
          results={quizState.results}
          onReturn={() => setView('home')}
        />
      )}
    </div>
  );
}

export default App;