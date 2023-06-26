import { QuestionData } from '../MockData/QuestionsData';

interface QuestionsState {
  readonly loading: boolean;
  readonly unanswered: QuestionData[];
  readonly viewing: QuestionData | null;
  readonly searched: QuestionData[];
}

export interface AppState {
  readonly questions: QuestionsState;
}

export const initialQuestionState: QuestionsState = {
  loading: false,
  unanswered: [],
  viewing: null,
  searched: [],
};
