export type QuestionType = 'mcq' | 'true-false' | 'match-pairs' | 'order-sequence' | 'flashcard';

export interface BaseQuestion {
    id: string;
    type: QuestionType;
    question: string;
}

export interface MCQQuestion extends BaseQuestion {
    type: 'mcq';
    options: string[];
    correctAnswer: number;
}

export interface TrueFalseQuestion extends BaseQuestion {
    type: 'true-false';
    correctAnswer: boolean;
}

export interface MatchPairsQuestion extends BaseQuestion {
    type: 'match-pairs';
    pairs: { left: string; right: string }[];
}

export interface OrderSequenceQuestion extends BaseQuestion {
    type: 'order-sequence';
    items: string[];
    correctOrder: string[];
}

export interface FlashcardQuestion extends BaseQuestion {
    type: 'flashcard';
    answer: string;
}

export type Question =
    | MCQQuestion
    | TrueFalseQuestion
    | MatchPairsQuestion
    | OrderSequenceQuestion
    | FlashcardQuestion;
