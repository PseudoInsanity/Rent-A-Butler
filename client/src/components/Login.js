import React, { useState } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import FormControl from '@material-ui/core/FormControl';
import InputAdornment from '@material-ui/core/InputAdornment';
import InputLabel from '@material-ui/core/InputLabel';
import FilledInput from '@material-ui/core/FilledInput';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import { Link, useHistory } from "react-router-dom";
import Grid from '@material-ui/core/Grid';
import CardMedia from "@material-ui/core/CardMedia";
import { userService } from '../services/user.service';
import logo from '../resources/butler_logo.png';

const useStyles = makeStyles((theme) => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        padding: theme.spacing(5),
        backgroundColor: theme.palette.background.main,
        '& > *': {
            margin: theme.spacing(1),
            width: theme.spacing(50),
            height: theme.spacing(70),
        },
    },
    box: {
        backgroundColor: theme.palette.primary.main,
    },
    title: {
        display: 'flex',
        color: theme.palette.background.main,
        fontFamily: 'Gotham Pro, Montserrat, sans-serif',
        fontWeight: 'bold',
        justifyContent: 'space-around',
        paddingLeft: '110px',
        padding: theme.spacing(7),
    },
    signup: {
        '& > * + *': {
            marginLeft: theme.spacing(2),
        },
        display: 'flex',
        color: theme.palette.background.main,
        fontFamily: 'Gotham pro, Montserrat, sans-serif',
        justifyContent: 'center',
    },
    here: {
        color: theme.palette.secondary.light,
        justifyContent: 'center',
        display: 'flex',
        fontFamily: 'Gotham pro, Montserrat, sans-serif',
    },
    root: {
        '& > *': {
            display: 'flex',
            margin: 'auto',
            width: 250,
            height: 50,
            content: 'center',
        },
    },
    media: {
        display: 'flex',
        justifyContent: 'space-around',
        padding: theme.spacing(10),
        marginTop: theme.spacing(2),
        height: 60
    },
    formField: {
        marginTop: 10,
        backgroundColor: theme.palette.background.light,
        color: theme.palette.secondary.dark,
        '&>*': {
            color: theme.palette.secondary.main,
        },
    },
    button: {
        backgroundColor: theme.palette.secondary.light,
        height: '40px',
        width: '160px',
        display: 'flex',
        margin: 'auto',
        marginTop: 30,
        marginBottom: 15,
        fontWeight: '550',
    },
    textField: {
        marginTop: 10,
        marginLeft: 75,
        width: 250,
        height: 50,
        backgroundColor: theme.palette.background.light,
        color: theme.palette.secondary.main,
        '&>*': {
            color: theme.palette.secondary.main,
        },
    },
}));

function Login() {
    const classes = useStyles();
    const history = useHistory();
    const [values, setValues] = useState({
        username: '',
        password: '',
        submitted: false,
        loading: false,
        error: '',
        showPassword: false,
    });
    let user;
    const handleChange = prop => event => {
        setValues({ ...values, [prop]: event.target.value });
    };

    const handleClickShowPassword = () => {
        setValues({ ...values, showPassword: !values.showPassword });
    };

    const handleMouseDownPassword = event => {
        event.preventDefault();
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        setValues({ submitted: true });
        const { username, password } = values;

        if (!(username && password)) {
            return;
        }

        setValues({ loading: true });

        userService.login(username, password)
            .then(
                user = createdUser => {
                    history.push('/');
                },
                error => setValues({ error, loading: false })
            );
    }

    return (
        <div className={classes.container}>
            <Paper className={classes.box} elevation={3}>
                <CardMedia
                    className={classes.media}
                    image={logo}
                    title="Rent A Butler"
                />
                <form className={classes.root} noValidate autoComplete="off">
                    <TextField className={classes.formField} label="Username" value={values.username} onChange={handleChange('username')} variant="filled" color="secondary" />

                    {/* password field */}
                    <FormControl className={clsx(classes.textField)} type="password" autoComplete="current-password" variant="filled" color="secondary">
                        <InputLabel htmlFor="filled-adornment-password">Password</InputLabel>
                        <FilledInput
                            id="filled-adornment-password"
                            type={values.showPassword ? 'text' : 'password'}
                            value={values.password}
                            onChange={handleChange('password')}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        edge="end" backgroundcolor="#4F565F"
                                    >
                                        {values.showPassword ? <Visibility /> : <VisibilityOff />}
                                    </IconButton>
                                </InputAdornment>
                            }
                        />
                    </FormControl>
                    <Button
                        variant="contained"
                        className={classes.button}
                        type="submit"
                        color="secondary"
                        onClick={handleSubmit}>
                        LOGIN
                </Button>
                </form>
                <Typography className={classes.signup} variant="h6">
                    Don't have an account?
                </Typography>
                <Grid container justify="center">
                    <Link to="./signup" variant="body2">
                        Signup here!
                </Link>
                {user ? <Typography className={classes.textField}>Incorrect username or password!</Typography> : ''}
                </Grid>
            </Paper>
        </div>
    );
}
export default Login;
