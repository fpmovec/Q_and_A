/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React from 'react';
import user from './user.svg';
//import styles from './Icons.module.css';

const UserIcon = () => (
  <img
    src={user}
    alt="User"
    css={css`
      width: 17px;
      opacity: 0.6;
    `}
  />
);

export default UserIcon;
