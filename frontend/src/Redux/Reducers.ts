import { QuestionsActions } from './Actions';
import {
  GETTINGQUESTION,
  GETTINGUNANSWEREDQUESTIONS,
  GOTQUESTION,
  GOTUNANSWEREDQUESTIONS,
  SEARCHEDQUESTIONS,
  SEARCHINGQUESTIONS,
} from './Constants';
import { initialQuestionState } from './StoreModels';

export const questionsReducer = (
  state = initialQuestionState,
  action: QuestionsActions,
) => {
  switch (action.type) {
    case GETTINGUNANSWEREDQUESTIONS: {
      return { ...state, loading: true };
    }
    case GOTUNANSWEREDQUESTIONS: {
      return {
        ...state,
        loading: false,
        unanswered: action.questions,
      };
    }
    case GETTINGQUESTION: {
      return {
        ...state,
        viewing: null,
        loading: true,
      };
    }
    case GOTQUESTION: {
      return {
        ...state,
        viewing: action.question,
        loading: false,
      };
    }
    case SEARCHINGQUESTIONS: {
      return {
        ...state,
        searched: [],
        loading: true,
      };
    }
    case SEARCHEDQUESTIONS: {
      return {
        ...state,
        searched: action.questions,
        loading: false,
      };
    }
  }
  return state;
};
