import React, { useEffect, useState } from "react";
import AppBar from "./AppBar";
import ButlerCard from "./ButlerCard";
import { makeStyles } from "@material-ui/core/";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import useSelectedServices from "../hooks/useSelectedServices";


const useStyles = makeStyles(theme => ({
    background: {
        backgroundColor: theme.palette.primary.light,
        height: "100vh"
    },
    grid: {
        padding: theme.spacing(1)
    },
    title: {
        display: "flex",
        justifyContent: "center"
    }
}));
const ColoredLine = ({ color }) => (
    <hr
        style={{
            color: color,
            backgroundColor: color,
            height: 2,
            width: "95%"
        }}
    />
);
function StartPage() {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [subscribedService, setSubscribedService] = useState({});
    const [
        { listOfSubscribedServices },
        { setListOfSubscribedServices }
    ] = useSelectedServices();

    const handleOpen = name => {
        setOpen(true);
        setSubscribedService(name);
    };

    const handleSubscribe = () => {
        setOpen(false);

        if (listOfSubscribedServices.id === subscribedService.id) {
            console.log(listOfSubscribedServices);
            console.log(subscribedService.id);
            setListOfSubscribedServices([
                ...listOfSubscribedServices,
                subscribedService
            ]);
        }
    };

    useEffect(() => { }, [subscribedService, listOfSubscribedServices]);

    const handleClose = () => {
        setOpen(false);
        setSubscribedService("");
    };

    return (
        <div className={classes.background}>
            <AppBar listOfSubscribedServices={listOfSubscribedServices} />
            <Typography className={classes.title} variant="h1">
                List of services
            </Typography>
            <ColoredLine color="#22333B" />
            <Grid container xs={12} className={classes.grid}>
                <ButlerCard
                    open={open}
                    handleClose={handleClose}
                    handleSubscribe={handleSubscribe}
                    listOfSubscribedServices={listOfSubscribedServices}
                    setListOfSubscribedServices={setListOfSubscribedServices}
                    handleOpen={handleOpen}
                />
            </Grid>
        </div>
    );
}
export default StartPage;
