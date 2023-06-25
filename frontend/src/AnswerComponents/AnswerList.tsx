import React from 'react';
import { AnswerData } from '../MockData/QuestionsData';
import { Answer } from './Answer';
import styles from './AnswerList.module.css';

interface Props {
  data: AnswerData[];
}

export const AnswerList = ({ data }: Props) => (
  <ul className={styles.ul}>
    {data.map((answer) => (
      <li className={styles.li} key={answer.answerId}>
        <Answer data={answer} />
      </li>
    ))}
  </ul>
);
