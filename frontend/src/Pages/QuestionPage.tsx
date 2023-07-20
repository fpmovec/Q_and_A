/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React from 'react';
import { Page } from '../Page/Page';
import { useParams } from 'react-router-dom';
import { getQuestion, postAnswer } from '../MockData/QuestionsFunctions';
import styles from './QuestionPage.module.css';
import {
  gray3,
  Fieldset,
  FieldContainer,
  FieldLabel,
  FieldTextArea,
  FormButtonContainer,
  PrimaryButton,
  FieldError,
  SubmissionSucces,
} from '../Styles';
import { AnswerList } from '../AnswerComponents/AnswerList';
import { useForm } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from '../Redux/Hooks';
import { gettingQuestion, gotQuestion } from '../Redux/Slice';

type FormData = {
  content: string;
};

export const QuestionPage = () => {
  const dispatch = useAppDispatch();
  const question = useAppSelector((state) => state.questions.viewing);

  const [succesfullySubmitted, setSuccesfullySubmitted] = React.useState(false);
  const { questionId } = useParams();
  const {
    register,
    formState: { errors },
    formState,
    handleSubmit,
  } = useForm<FormData>({
    mode: 'onBlur',
  });

  const submitForm = async (data: FormData) => {
    const result = await postAnswer({
      questionId: question!.questionId,
      content: data.content,
      userName: 'Fred',
      created: new Date(),
    });
    setSuccesfullySubmitted(result ? true : false);
  };

  React.useEffect(() => {
    const doGetQuestion = async (questionId: number) => {
      dispatch(gettingQuestion());
      const foundQuestion = await getQuestion(questionId);
      dispatch(gotQuestion(foundQuestion));
    };
    if (questionId) {
      doGetQuestion(Number(questionId));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [questionId]);
  return (
    <Page>
      <div className={styles.cont}>
        <div className={styles.cont1}>
          {question === null ? '' : question.title}
        </div>
        {question !== null && (
          <React.Fragment>
            <p
              css={css`
                margin-top: 0px;
                background-color: white;
              `}
            >
              {question.content}
            </p>
            <div
              css={css`
                font-size: 12px;
                font-style: italic;
                color: ${gray3};
              `}
            >
              {`Asked by ${question.userName} on 
              ${question.created.toLocaleDateString()}
              ${question.created.toLocaleTimeString()}`}
            </div>
            <AnswerList data={question.answers} />
            <form
              css={css`
                margin-top: 20px;
              `}
              onSubmit={handleSubmit(submitForm)}
            >
              <Fieldset
                disabled={formState.isSubmitting || succesfullySubmitted}
              >
                <FieldContainer>
                  <FieldLabel htmlFor="content">Your Answer</FieldLabel>
                  <FieldTextArea
                    id="content"
                    {...register('content', { required: true, minLength: 50 })}
                  />
                  {errors.content && errors.content.type === 'required' && (
                    <FieldError>You must enter the answer content</FieldError>
                  )}
                  {errors.content && errors.content.type === 'minLength' && (
                    <FieldError>
                      The answer must be at least 50 characters
                    </FieldError>
                  )}
                </FieldContainer>
                <FormButtonContainer>
                  <PrimaryButton type="submit">
                    Submit Your Answer
                  </PrimaryButton>
                </FormButtonContainer>
                {succesfullySubmitted && (
                  <SubmissionSucces>
                    Your answer was successfully submitted
                  </SubmissionSucces>
                )}
              </Fieldset>
            </form>
          </React.Fragment>
        )}
      </div>
    </Page>
  );
};
