import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { initialQuestionState } from './StoreModels';
import { QuestionData } from '../MockData/QuestionsData';

const questionsSlice = createSlice({
  name: 'questions',
  initialState: initialQuestionState,
  reducers: {
    gettingUnansweredQuestions(state, action: PayloadAction<void>) {
      state.loading = true;
    },
    gotUnansweredQuestions(state, action: PayloadAction<QuestionData[]>) {
      state.loading = false;
      state.unanswered = action.payload;
    },

    gettingQuestion(state, action: PayloadAction<void>) {
      state.loading = true;
      state.viewing = null;
    },
    gotQuestion(state, action: PayloadAction<QuestionData | null>) {
      state.loading = false;
      state.viewing = action.payload;
    },

    searchingQuestions(state, action: PayloadAction<void>) {
      state.searched = [];
      state.loading = true;
    },
    searchedQuestions(state, action: PayloadAction<QuestionData[]>) {
      state.loading = false;
      state.searched = action.payload;
    },
  },
});

export const {
  gettingUnansweredQuestions,
  gotUnansweredQuestions,
  gettingQuestion,
  gotQuestion,
  searchingQuestions,
  searchedQuestions,
} = questionsSlice.actions;

export default questionsSlice.reducer;
