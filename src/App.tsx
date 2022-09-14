import React, { Suspense } from 'react';
import logo from './logo.svg';
import { Counter } from './features/counter/Counter';
import './App.css';
import { Header } from './components/header';
import { ThemeProvider } from "styled-components";
import { setDarkTheme, setDefaultTheme, theme } from "./features/theme/themeSlice";
import { useAppSelector, useAppDispatch } from './app/hooks';
import { Button } from 'antd';
import GlobalStyles from "./features/theme/global";

const Player = React.lazy(() => import('./features/players/player'));


function App() {

  const dispatch = useAppDispatch();
const themes = useAppSelector(theme);

const setDark = () => {
  dispatch(setDarkTheme());
};

const setDefault = () => {
  dispatch(setDefaultTheme());
};

const renderLoader = () => <p>Loading</p>;


  return (
    <ThemeProvider theme={themes}>
        <GlobalStyles />

        <Suspense fallback={renderLoader()}>

      <div className="App">
        <Player />
      </div>
      </Suspense>

      {!themes?.darkmode ? (
          <Button onClick={setDark} >
            mode 1
          </Button>
        ) : (
          <Button onClick={setDefault} >
           mode 2
          </Button>
        )}
    </ThemeProvider>
  );
}

export default App;
