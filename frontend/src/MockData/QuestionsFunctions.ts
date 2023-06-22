import { QuestionData, AnswerData } from './QuestionsData';
import { questions } from './FakeQuestions';

export const getUnansweredQuestions = (): QuestionData[] => {
  return questions.filter((q) => q.answers.length === 0);
};
