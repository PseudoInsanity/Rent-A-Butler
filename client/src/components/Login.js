import React from 'react';
import clsx from 'clsx';
import { makeStyles, Typography, Paper, TextField, Button, IconButton, FormControl, InputAdornment, InputLabel, FilledInput } from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';

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
            height: theme.spacing(60),
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
        paddingLeft: '125px',
        padding: theme.spacing(7),
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
        marginTop: 50,
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

function LoginComponent() {
    const classes = useStyles();
    const [values, setValues] = React.useState({
        password: '',
        showPassword: false,
    });

    const handleChange = prop => event => {
        setValues({ ...values, [prop]: event.target.value });
    };

    const handleClickShowPassword = () => {
        setValues({ ...values, showPassword: !values.showPassword });
    };

    const handleMouseDownPassword = event => {
        event.preventDefault();
    };
    return (
        <div className={classes.container}>
            <Paper className={classes.box} elevation={3}>
                <Typography className={classes.title} variant="h3">RENT A BUTLER</Typography>
                <form className={classes.root} noValidate autoComplete="off">
                    <TextField className={classes.formField} label="Username" variant="filled" color="secondary" />
                </form>
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
                                    edge="end" backgroundColor="#4F565F"
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
                    color="secondary"
                >
                    LOGIN
        </Button>
            </Paper>
        </div>
    );
}
export default LoginComponent;
