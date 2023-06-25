/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React from 'react';
import { Header } from './Header/Header';
import { HomePage } from './HomePage';
import { fontFamily, fontSize, gray2 } from './Styles';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { SearchPage } from './Pages/SearchPage';
import { SignInPage } from './Pages/SignInPage';
//import AskPage from './Pages/AskPage';
import { NotFoundPage } from './Pages/NotFoundPage';
import { QuestionPage } from './Pages/QuestionPage';

const AskPage = React.lazy(() => import('./Pages/AskPage'));

function App() {
  return (
    <BrowserRouter>
      <div
        css={css`
          font-family: ${fontFamily};
          font-size: ${fontSize};
          color: ${gray2};
        `}
      >
        <Header />
        <Routes>
          <Route path="" element={<HomePage />} />
          <Route path="search" element={<SearchPage />} />
          <Route
            path="ask"
            element={
              <React.Suspense
                fallback={
                  <div
                    css={css`
                      margin-top: 100px;
                      text-align: center;
                    `}
                  >
                    Loading...
                  </div>
                }
              >
                <AskPage />
              </React.Suspense>
            }
          />
          <Route path="signin" element={<SignInPage />} />
          <Route path="questions/:questionId" element={<QuestionPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
