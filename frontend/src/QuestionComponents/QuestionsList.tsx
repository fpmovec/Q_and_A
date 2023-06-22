import React from 'react';
import { QuestionData } from '../MockData/QuestionsData';
import { Question } from './Question';
import styles from './QuestionList.module.css';

interface Props {
  data: QuestionData[];
}

export const QuestionList = ({ data }: Props) => (
  <ul>
    {data.map((question) => (
      <li className={styles.list} key={question.questionId}>
        <Question data={question} />
      </li>
    ))}
  </ul>
);
