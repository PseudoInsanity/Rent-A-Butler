import React from 'react';
import Login from './components/Login';
import { PrivateRoute } from './components/PrivateRoute'
import StartPage from './components/StartPage';
import { ThemeProvider } from '@material-ui/core/styles';
import darkTheme from './themes/darkTheme';
import {BrowserRouter, Switch, Route} from "react-router-dom/";

function App() {

    return (
      /*  <ThemeProvider theme={darkTheme}>
        <StartPage/>
        </ThemeProvider> */
        <BrowserRouter>
            <ThemeProvider theme={darkTheme}>
                <Switch>
                    <PrivateRoute exact path="/" component={StartPage} />
                    <Route exact path="/login" component={Login} />
                </Switch>
            </ThemeProvider>
        </BrowserRouter>
    );
}

export default App;