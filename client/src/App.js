import React from 'react';
import AppBar from './components/AppBar';
import Login from './components/Login';
import { ThemeProvider } from '@material-ui/core/styles';
import darkTheme from './themes/darkTheme';

function App() {
  

  return (
    <ThemeProvider theme={darkTheme}>
        <AppBar/>
        <Login />
    </ThemeProvider>
  );
}

export default App;
