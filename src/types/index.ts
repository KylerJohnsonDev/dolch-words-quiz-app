export interface WordGroup {
  grouping: string;
  words: string[];
}

export interface QuizResult {
  correct: string[];
  incorrect: string[];
}

export interface QuizState {
  selectedGroups: string[];
  currentWords: string[];
  currentIndex: number;
  results: QuizResult;
}