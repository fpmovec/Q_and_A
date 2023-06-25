/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React from 'react';
import { Page } from '../Page/Page';
import { useParams } from 'react-router-dom';
import { QuestionData } from '../MockData/QuestionsData';
import { getQuestion } from '../MockData/QuestionsFunctions';
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
} from '../Styles';
import { AnswerList } from '../AnswerComponents/AnswerList';
import { useForm } from 'react-hook-form';

type FormData = {
  content: string;
};

export const QuestionPage = () => {
  const [question, setQuestion] = React.useState<QuestionData | null>(null);
  const { questionId } = useParams();
  const {
    register,
    formState: { errors },
  } = useForm<FormData>({
    mode: 'onBlur',
  });

  React.useEffect(() => {
    const doGetQuestion = async (questionId: number) => {
      const foundQuestion = await getQuestion(questionId);
      setQuestion(foundQuestion);
    };
    if (questionId) {
      doGetQuestion(Number(questionId));
    }
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
            >
              <Fieldset>
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
              </Fieldset>
            </form>
          </React.Fragment>
        )}
      </div>
    </Page>
  );
};