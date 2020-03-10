import React from 'react';
import AppBar from './components/AppBar';
import Signup from './components/Signup';
import Login from './components/Login';
import { ThemeProvider } from '@material-ui/core/styles';
import darkTheme from './themes/darkTheme';
import BrowserRouter from "react-router-dom/BrowserRouter";
import Switch from "react-router-dom/Switch";
import Route from "react-router-dom/Route";

function App() {

    return (
        <BrowserRouter>
            <ThemeProvider theme={darkTheme} >
                <Switch>
                    <Route path="/" exact component={Login} />
                    <Route path="/signup" exact component={Signup} />
                </Switch>
            </ThemeProvider>
        </BrowserRouter>
    );
}

export default App;