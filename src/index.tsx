import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './app/store';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './index.css';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import { SingleCharacter } from './features/players/singleCharacter';
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
import ParentLayout from './layout/parentLayout';
import { Header } from './components/header';
import { Favourites } from './components/favourites';


const container = document.getElementById('root')!;
const root = createRoot(container);

root.render(
  <ParentLayout>
    <Provider store={store}>
      <BrowserRouter>
      <Header/>

    <Routes>
      <Route path="/" element={<App />} />
      <Route path="single" element={<SingleCharacter/>} />
      <Route path="favourites" element={<Favourites/>} />

    </Routes>
  </BrowserRouter>
    </Provider>
    </ParentLayout>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
