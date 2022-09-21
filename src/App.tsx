import React, { Suspense } from 'react';
import logo from './logo.svg';
import { Counter } from './features/counter/Counter';
import './App.css';
import { Header } from './components/header';
import { ThemeProvider } from "styled-components";
import { setDarkTheme, setDefaultTheme, theme } from "./features/theme/themeSlice";
import { useAppSelector, useAppDispatch } from './app/hooks';
import { Button ,Switch} from 'antd';
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

const onChange = (checked: boolean) => {
  console.log("check",checked,"thems",themes)
  if(checked){
    !themes.darkMode && setDark()
  }else {
  setDefault()}

};

const renderLoader = () => <p>Loading</p>;


  return (
    <ThemeProvider theme={themes}>
        <GlobalStyles />
        <Switch  onChange={onChange} />
 
        <Suspense fallback={renderLoader()}>

      <div className="App">
        <Player />
      </div>
      </Suspense>

   
    </ThemeProvider>
  );
}

export default App;
