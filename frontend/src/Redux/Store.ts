import { configureStore } from '@reduxjs/toolkit';
import questionsReducer from './Slice';

const store = configureStore({
  reducer: {
    questions: questionsReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
