import React from 'react';
import AppBar from './components/AppBar';
import { ThemeProvider } from '@material-ui/core/styles';
import darkTheme from './themes/darkTheme';

function App() {
  

  return (
    <ThemeProvider theme={darkTheme}>
        <AppBar/>
    </ThemeProvider>
  );
}

export default App;
