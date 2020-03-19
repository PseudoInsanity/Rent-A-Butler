import React from 'react';
import Login from './components/Login';
import Signup from './components/Signup';
import { PrivateRoute } from './components/PrivateRoute'
import StartPage from './components/StartPage';
import { ThemeProvider } from '@material-ui/core/styles';
import darkTheme from './themes/darkTheme';
import { BrowserRouter, Switch, Route } from "react-router-dom/";

function App() {

    return (
        <BrowserRouter>
            <ThemeProvider theme={darkTheme}>
                <Switch>
                    <PrivateRoute exact path="/" component={StartPage} />
                    <Route exact path="/login" component={Login} />
                    <Route exact path="/signup" component={Signup} />
                </Switch>
            </ThemeProvider>
        </BrowserRouter>
    );
}

export default App;