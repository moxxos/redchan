import React from "react";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router";
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  html {
    font-size: 12px; /* Adjust the scale of the application */
    scroll-behavior: auto !important;
  }
  body {
    background: linear-gradient(to bottom, #fed6af, #ffffee 350px);
    min-height: 100vh;
  }
`;

/*
const Background = styled.div`
    background: linear-gradient(to bottom, #fed6af, #ffffee 350px);
    height: 100%;
`
*/

import Home from "./Home/Home";
import Rules from "./Rules/Rules";
import FAQ from "./FAQ/FAQ";
import Board from "./Board/Board";
import BoardPage from "./Board/BoardPage"
import Thread from "./Thread/Thread";
import UploadView from "./Board/UploadView";

export default function App() {

  return (
    <>
      <GlobalStyle />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/rules" element={<Rules />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/boards/:board_id" element={<Board />}>
            <Route index element={<BoardPage />} />
            <Route path="page/:page_num" element={<BoardPage />} />
            <Route path="thread/:thread_id" element={<Thread />} />
            <Route path="upload/:upload_id" element={<UploadView />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}