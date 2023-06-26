import { QuestionData } from '../MockData/QuestionsData';
import {
  GETTINGUNANSWEREDQUESTIONS,
  GOTUNANSWEREDQUESTIONS,
  GETTINGQUESTION,
  GOTQUESTION,
  SEARCHINGQUESTIONS,
  SEARCHEDQUESTIONS,
} from './Constants';

export const gettingUnansweredQuestionsAction = () =>
  ({
    type: GETTINGUNANSWEREDQUESTIONS,
  } as const);

export const gotUnansweredQuestionsAction = (questions: QuestionData[]) =>
  ({
    type: GOTUNANSWEREDQUESTIONS,
    questions: questions,
  } as const);

export const gettingQuestionAction = () =>
  ({
    type: GETTINGQUESTION,
  } as const);

export const gotQuestionAction = (question: QuestionData | null) =>
  ({
    type: GOTQUESTION,
    question: question,
  } as const);

export const searchingQuestionAction = () =>
  ({
    type: SEARCHINGQUESTIONS,
  } as const);

export const searchedQuestionsAction = (questions: QuestionData[]) =>
  ({
    type: SEARCHEDQUESTIONS,
    questions: questions,
  } as const);

export type QuestionsActions =
  | ReturnType<typeof gettingUnansweredQuestionsAction>
  | ReturnType<typeof gotUnansweredQuestionsAction>
  | ReturnType<typeof gettingQuestionAction>
  | ReturnType<typeof gotQuestionAction>
  | ReturnType<typeof searchingQuestionAction>
  | ReturnType<typeof searchedQuestionsAction>;
