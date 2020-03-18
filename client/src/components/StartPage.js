import React, { useEffect, useState } from "react";
import AppBar from "./AppBar";
import ButlerCard from "./ButlerCard";
import { makeStyles } from "@material-ui/core/";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import useSelectedServices from "../hooks/useSelectedServices";
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Menu from "@material-ui/core/Menu";
import TextField from '@material-ui/core/TextField';
import IconButton from "@material-ui/core/IconButton";
import ToolTip from '@material-ui/core/Tooltip';


const useStyles = makeStyles(theme => ({
    root: {
        '& > *:not(button)': {
            width: '25ch',
        },
        '& > *': {
            margin: theme.spacing(1)
        }
    },
    background: {
        backgroundColor: theme.palette.primary.light
    },
    grid: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: theme.spacing(1)
    },
    title: {
        display: 'flex',
        justifyContent: 'center'
    },
    fab: {
        margin: 0,
        top: 'auto',
        right: 20,
        bottom: 20,
        left: 'auto',
        position: 'fixed',
    }
}));
const ColoredLine = ({ color }) => (
    <hr
        style={{
            color: color,
            backgroundColor: color,
            height: 2,
            width: '95%'
        }}
    />
);
function StartPage() {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const isMenuOpen = Boolean(anchorEl);
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

        if (!(listOfSubscribedServices.includes(subscribedService))) {
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

    const handleOpenAddService = event => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleAddService = () => {

    }

    const renderAddServiceMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            keepMounted
            transformOrigin={{ vertical: "bottom", horizontal: "right" }}
            open={isMenuOpen}
            onClose={handleMenuClose}
            className={classes.menu}
        >
            <form className={classes.root} noValidate autoComplete="off">
                <TextField id="standard-basic" label="Name of service" />
                <TextField id="filled-basic" label="Description" />
                <IconButton
                    edge="end"
                    aria-label="services button"
                    color="inherit"
                    onClick={handleAddService}
                >
                    <AddIcon />
                </IconButton>
            </form>
        </Menu>
    );

    return (
        <div className={classes.background}>
            <AppBar listOfSubscribedServices={listOfSubscribedServices} />
            <Typography className={classes.title} variant="h1">
                List of services
            </Typography>
            <ColoredLine color="#22333B" />
            <ToolTip title="Add a new Service!" aria-label="add">
            <Fab className={classes.fab} aria-label="add" onClick={handleOpenAddService}>
                <AddIcon />
            </Fab>
            </ToolTip>
            <Grid item xs={12} className={classes.grid}>
                <ButlerCard
                    open={open}
                    handleClose={handleClose}
                    handleSubscribe={handleSubscribe}
                    listOfSubscribedServices={listOfSubscribedServices}
                    setListOfSubscribedServices={setListOfSubscribedServices}
                    handleOpen={handleOpen}
                />
            </Grid>
    
            {renderAddServiceMenu}
        </div>
    );
}
export default StartPage;
