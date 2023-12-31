import { AnswerData, PostAnswersData, QuestionData } from './QuestionsData';
import { questions } from './FakeQuestions';
//import { resolve } from 'path';
import { PostQuestionData } from './QuestionsData';

export const getUnansweredQuestions = async (): Promise<QuestionData[]> => {
  let unansweredQuestions: QuestionData[] = [];

  const response = await fetch(
    'https://localhost:7175/api/questions/unanswered',
  );
  //console.log(await response.json());
  unansweredQuestions = await response.json();
  return unansweredQuestions.map((question) => ({
    ...question,
    created: new Date(question.created),
  }));
};

const wait = (ms: number): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export const getQuestion = async (
  questionId: number,
): Promise<QuestionData | null> => {
  await wait(500);
  const results = questions.filter((q) => q.questionId === questionId);
  return results.length === 0 ? null : results[0];
};

export const searchQuestions = async (
  criteria: string,
): Promise<QuestionData[]> => {
  await wait(500);
  return questions.filter(
    (q) =>
      q.title.toLowerCase().indexOf(criteria.toLowerCase()) >= 0 ||
      q.content.toLowerCase().indexOf(criteria.toLowerCase()) >= 0,
  );
};

export const postQuestion = async (
  question: PostQuestionData,
): Promise<QuestionData | undefined> => {
  await wait(500);
  const questionId = Math.max(...questions.map((q) => q.questionId)) + 1;
  const newQuestion: QuestionData = {
    ...question,
    questionId: questionId,
    answers: [],
  };
  questions.push(newQuestion);
  return newQuestion;
};

export const postAnswer = async (
  answer: PostAnswersData,
): Promise<AnswerData | undefined> => {
  await wait(500);
  const question = questions.filter(
    (q) => q.questionId === answer.questionId,
  )[0];

  const answerInQuestion: AnswerData = {
    answerId: 99,
    ...answer,
  };
  question.answers.push(answerInQuestion);
  console.log(question.answers);
  return answerInQuestion;
};
