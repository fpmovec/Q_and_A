import React from 'react';
import { Page } from '../Page/Page';
import {
  Fieldset,
  FieldContainer,
  FieldLabel,
  FieldInput,
  FieldTextArea,
  FormButtonContainer,
  PrimaryButton,
  FieldError,
  SubmissionSucces,
} from '../Styles';
import { useForm } from 'react-hook-form';
import { postQuestion } from '../MockData/QuestionsFunctions';
//import { title } from 'process';

type FormData = {
  title: string;
  content: string;
};

const AskPage = () => {
  const [succesfullySubmitted, setSuccesfullySubmitted] = React.useState(false);

  const {
    register,
    formState: { errors },
    handleSubmit,
    formState,
  } = useForm<FormData>({
    mode: 'onBlur',
  });

  const submitForm = async (data: FormData) => {
    const result = await postQuestion({
      title: data.title,
      content: data.content,
      userName: 'Fred',
      created: new Date(),
    });
    setSuccesfullySubmitted(result ? true : false);
  };

  return (
    <Page title="Ask a Question">
      <form onSubmit={handleSubmit(submitForm)}>
        <Fieldset disabled={formState.isSubmitting || succesfullySubmitted}>
          <FieldContainer>
            <FieldLabel htmlFor="title">Title</FieldLabel>
            <FieldInput
              id="title"
              type="text"
              {...register('title', { required: true, minLength: 10 })}
            />
            {errors.title && errors.title.type === 'required' && (
              <FieldError> You must enter the question title</FieldError>
            )}
            {errors.title && errors.title.type === 'minLength' && (
              <FieldError>The title must be at least 10 characters</FieldError>
            )}
          </FieldContainer>
          <FieldContainer>
            <FieldLabel htmlFor="content">Content</FieldLabel>
            <FieldTextArea
              id="content"
              {...register('content', { required: true, minLength: 50 })}
            />
            {errors.content && errors.content.type === 'required' && (
              <FieldError> You must enter the question content</FieldError>
            )}
            {errors.content && errors.content.type === 'minLength' && (
              <FieldError>
                The content must be at least 50 characters
              </FieldError>
            )}
          </FieldContainer>
          <FormButtonContainer>
            <PrimaryButton type="submit">Submit yout question</PrimaryButton>
          </FormButtonContainer>
          {succesfullySubmitted && (
            <SubmissionSucces>
              Your question was succesfully submitted
            </SubmissionSucces>
          )}
        </Fieldset>
      </form>
    </Page>
  );
};
export default AskPage;
