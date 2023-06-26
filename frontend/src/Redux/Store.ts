import { Store, combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import { AppState } from './StoreModels';
import { questionsReducer } from './Reducers';

const rootReducer = combineReducers<AppState>({
  questions: questionsReducer,
});

export function configStore(): Store<AppState> {
  const store = configureStore({ reducer: rootReducer });
  return store;
}
