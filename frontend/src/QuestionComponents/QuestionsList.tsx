import React from 'react';
import { QuestionData } from '../MockData/QuestionsData';
import { Question } from './Question';
import styles from './QuestionList.module.css';

interface Props {
  data: QuestionData[];
  renderItem?: (item: QuestionData) => React.JSX.Element;
}

export const QuestionList = ({ data, renderItem }: Props) => (
  <ul>
    {data.map((question) => (
      <li className={styles.list} key={question.questionId}>
        {renderItem ? renderItem(question) : <Question data={question} />}
      </li>
    ))}
  </ul>
);
