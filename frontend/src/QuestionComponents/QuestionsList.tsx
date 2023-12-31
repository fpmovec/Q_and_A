/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React from 'react';
import { QuestionData } from '../MockData/QuestionsData';
import { Question } from './Question';
import styles from './QuestionList.module.css';
import { accent2, gray5 } from '../Styles';

interface Props {
  data: QuestionData[];
  renderItem?: (item: QuestionData) => React.JSX.Element;
}

export const QuestionList = ({ data, renderItem }: Props) => (
  <ul
    css={css`
      list-style: none;
      margin: 10px 0 0 0;
      padding: 0 20px;
      background-color: #fff;
      border-bottom-left-radius: 4px;
      border-bottom-right-radius: 4px;
      border-top: 3px solid ${accent2};
      box-shadow: 0 3px 5px 0 rgba(0, 0, 0, 0.16);
    `}
  >
    {data.map((question) => (
      <li
        className={styles.list}
        css={css`
          border-top: 1px solid ${gray5};
          :first-of-type {
            border-top: none;
          }
        `}
        key={question.questionId}
      >
        {renderItem ? renderItem(question) : <Question data={question} />}
      </li>
    ))}
  </ul>
);
