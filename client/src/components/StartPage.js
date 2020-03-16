import React from 'react';
import AppBar from './AppBar';
import ButlerCard from './ButlerCard';
import { makeStyles } from '@material-ui/core/';
import Grid from '@material-ui/core/Grid';


const useStyles = makeStyles((theme) => ({
    background: {
        backgroundColor: theme.palette.primary.light,
        height: '100vh',
    },
    grid: {
        display: 'flex',
        justify: 'center',
        alignItems: 'center',
        direction: 'row',
        padding: theme.spacing(1),
    }


}));

function StartPage() {
    const classes = useStyles();

    return (
        <div className={classes.background}>
            <AppBar />
            <Grid container xs={12} className={classes.grid}>
                <Grid item xs={12}>
                <ButlerCard />
                </Grid>
            </Grid>
        </div>
    )
}

export default StartPage;