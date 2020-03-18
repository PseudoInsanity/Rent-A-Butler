import React from 'react';
import { makeStyles } from '@material-ui/core/';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import {Link} from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
        color: theme.palette.secondary.dark,
        '&>*': {
            color: theme.palette.secondary.main,
        },
    },
    container: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        padding: theme.spacing(5),

    },
    box: {
        backgroundColor: theme.palette.primary.main,
        padding: theme.spacing(1),
        margin: theme.spacing(1),
        width: theme.spacing(70),
        height: theme.spacing(80),
    },
    title: {
        display: 'flex',
        color: theme.palette.background.main,
        fontFamily: 'Gotham Pro, Montserrat, sans-serif',
        fontWeight: 'bold',
        justifyContent: 'space-around',
        paddingLeft: '40dp',
        padding: theme.spacing(7),
    },
    formField: {
        backgroundColor: theme.palette.background.light,
        color: theme.palette.secondary.dark,
        '&>*': {
            color: theme.palette.secondary.main,
        },
        justify: 'space-around',
    },
    button: {
        backgroundColor: theme.palette.secondary.light,
        height: '40px',
        width: '160px',
        display: 'flex',
        margin: 'auto',
        marginTop: 30,
        marginBottom: 10,
        fontWeight: '550',
    },
}));


function Signup() {
    const classes = useStyles();

    return (
        <div className={classes.container}>
            <Paper className={classes.box}>
                <Typography className={classes.title} component="h1" variant="h3">
                    Sign up
          </Typography>
                <form className={classes.form} noValidate>
                    <Grid container spacing={2}>
                        <Grid item xs={6} >
                            <TextField className={classes.formField}
                                autoComplete="fname"
                                name="firstName"
                                variant="filled"
                                required
                                fullWidth
                                id="firstName"
                                label="First Name"
                                autoFocus
                            />
                        </Grid>
                        <Grid item xs={6} >
                            <TextField className={classes.formField}
                                variant="filled"
                                required
                                fullWidth
                                id="lastName"
                                label="Last Name"
                                name="lastName"
                                autoComplete="lname"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField className={classes.formField}
                                variant="filled"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField className={classes.formField}
                                variant="filled"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                            />
                        </Grid>

                    </Grid>
                    <Grid justify="center" container>
                        <Grid item>
                            <Button
                                className={classes.button}
                                type="submit"
                                variant="contained"
                                color="secondary">
                                Sign Up
                            </Button>
                        </Grid>
                    </Grid>
                    <Grid container justify="center">
                        <Grid item>
                            <Link to="/" variant="body2">
                                Already have an account? Sign in
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </div>
    )
}

export default Signup;