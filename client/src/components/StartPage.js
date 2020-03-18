import React from "react";
import AppBar from "./AppBar";
import ButlerCard from "./ButlerCard";
import { makeStyles } from "@material-ui/core/";
import Grid from "@material-ui/core/Grid";
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';

const useStyles = makeStyles(theme => ({
    background: {
        backgroundColor: theme.palette.primary.light,
        height: "100vh"
    },
    grid: {
        padding: theme.spacing(1)
    },
    title: {
        display: 'flex',
        justifyContent: 'center',
    }
}));

const ColoredLine = ({ color }) => (
    <hr
        style={{
            color: color,
            backgroundColor: color,
            height: 2,
            width: "95%",
        }}
    />
); 

function StartPage() {
    const classes = useStyles();
    return (
        <div className={classes.background}>
            <AppBar />
            <Typography className={classes.title} variant="h1">List of services</Typography>
            <ColoredLine color="#22333B"/>
            <Grid container xs={12} className={classes.grid}>
                <ButlerCard />
            </Grid>
        </div>
    );
}
export default StartPage;