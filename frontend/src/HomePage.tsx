/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React from 'react';
import { QuestionList } from './QuestionComponents/QuestionsList';
import { getUnansweredQuestions } from './MockData/QuestionsFunctions';
import { Page } from './Page/Page';
import { PageTitle } from './Page/PageTitle';
import { PrimaryButton } from './Styles';
import { useNavigate } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from './Redux/Hooks';
import {
  gettingUnansweredQuestions,
  gotUnansweredQuestions,
} from './Redux/Slice';

export const HomePage = () => {
  const dispatch = useAppDispatch();
  const questions = useAppSelector((state) => state.questions.unanswered);
  const questionsLoading = useAppSelector((state) => state.questions.loading);

  React.useEffect(() => {
    const doGetUnansweredQuestions = async () => {
      dispatch(gettingUnansweredQuestions());
      const unansweredQuestions = await getUnansweredQuestions();
      dispatch(gotUnansweredQuestions(unansweredQuestions));
    };
    doGetUnansweredQuestions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const navigate = useNavigate();

  const handleAskQuestionClick = () => {
    navigate('ask');
  };

  return (
    <Page>
      <div
        css={css`
          display: flex;
          align-items: center;
          justify-content: space-between;
        `}
      >
        <PageTitle>Unanswered Questions</PageTitle>
        <PrimaryButton onClick={handleAskQuestionClick}>
          Ask a question
        </PrimaryButton>
      </div>
      {questionsLoading ? (
        <div>Loading...</div>
      ) : (
        <QuestionList data={questions || []} />
      )}
    </Page>
  );
};
