/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React from 'react';
import { Page } from '../Page/Page';
import { useSearchParams } from 'react-router-dom';
import { QuestionList } from '../QuestionComponents/QuestionsList';
import { searchQuestions } from '../MockData/QuestionsFunctions';
import { searchedQuestions, searchingQuestions } from '../Redux/Slice';
import { useAppDispatch, useAppSelector } from '../Redux/Hooks';

export const SearchPage = () => {
  const dispatch = useAppDispatch();
  const [searchParams] = useSearchParams();
  const questions = useAppSelector((state) => state.questions.searched);
  const search = searchParams.get('criteria') || '';
  React.useEffect(() => {
    const doSearch = async (criteria: string) => {
      dispatch(searchingQuestions());
      const foundResults = await searchQuestions(criteria);
      dispatch(searchedQuestions(foundResults));
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
