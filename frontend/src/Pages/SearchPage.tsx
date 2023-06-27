/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React from 'react';
import { Page } from '../Page/Page';
import { useSearchParams } from 'react-router-dom';
import { QuestionList } from '../QuestionComponents/QuestionsList';
import { searchQuestions } from '../MockData/QuestionsFunctions';
//import { QuestionData } from '../MockData/QuestionsData';
import { AppState } from '../Redux/StoreModels';
import {
  searchingQuestionAction,
  searchedQuestionsAction,
} from '../Redux/Actions';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

export const SearchPage = () => {
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const questions = useSelector((state: AppState) => state.questions.searched);
  const search = searchParams.get('criteria') || '';
  React.useEffect(() => {
    const doSearch = async (criteria: string) => {
      dispatch(searchingQuestionAction());
      const foundResults = await searchQuestions(criteria);
      dispatch(searchedQuestionsAction(foundResults));
    };
    doSearch(search);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);
  return (
    <Page title="Search Results">
      {search && (
        <p
          css={css`
            font-size: 16px;
            font-style: italic;
            margin-top: 0px;
          `}
        >
          for "{search}"
        </p>
      )}
      <QuestionList data={questions} />
    </Page>
  );
};
