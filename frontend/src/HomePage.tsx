import React from 'react';
import { QuestionList } from './QuestionComponents/QuestionsList';
import { getUnansweredQuestions } from './MockData/QuestionsFunctions';

export const HomePage = () => (
  <div>
    <div>
      <h2>Unanswered Questions</h2>
      <button>Ask a question</button>
    </div>
    <QuestionList data={getUnansweredQuestions()} />
  </div>
);
