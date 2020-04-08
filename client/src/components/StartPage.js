import React, { useEffect, useState } from "react";
import Appbar from "./AppBar";
import ButlerCard from "./ButlerCard";
import { makeStyles } from "@material-ui/core/";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import useSelectedServices from "../hooks/useSelectedServices";
import useAddedServices from '../hooks/useAddedServices';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import TextField from '@material-ui/core/TextField';
import ToolTip from '@material-ui/core/Tooltip';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import { userService } from '../services/user.service';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';





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
        backgroundColor: theme.palette.primary.light,
    },
    grid: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: theme.spacing(1)
    },
    title: {
        display: 'flex',
        justifyContent: 'center',
        color: theme.palette.background.main
    },
    fab: {
        margin: 0,
        top: 'auto',
        right: 20,
        bottom: 20,
        left: 'auto',
        position: 'fixed',
    },
    aboutFab: {
        margin: 0,
        top: 'auto',
        right: 'auto',
        bottom: 20,
        left: 20,
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
    const [openAbout, setOpenAbout] = useState(false);
    const [openSubscribe, setOpenSubsribe] = useState(false);
    const [subscribedService, setSubscribedService] = useState({});
    const userFromLocalStorage = JSON.parse(localStorage.getItem('user'));


    const handleAddOpen = () => {
        setOpen(true);
    };

    const handleAboutOpen = () => {
        setOpenAbout(true);
    }

    const handleClose = () => {
        setOpen(false);
        setOpenSubsribe(false);
        setOpenAbout(false);
    };

    const [addedService, setAddedService] = useState({
        serviceName: '',
        serviceDescription: '',
        servicePrice: ''
    });
    const [selectedSubscription, setSelectedSubscription] = useState([])


    const [
        { listOfSubscribedServices, allServices },
        { setListOfSubscribedServices }
    ] = useSelectedServices();

    const [
        { listOfAddedServices },
        { setListOfAddedServices }
    ] = useAddedServices();

    const handleOpen = name => {
        setOpenSubsribe(true);
        setSubscribedService(name);
    };

    const handleSubscribe = () => {
        setOpenSubsribe(false);

        if (!(listOfSubscribedServices.includes(subscribedService))) {
            setListOfSubscribedServices([
                ...listOfSubscribedServices,
                subscribedService
            ]);
            userService.subscribeToService(subscribedService._id, userFromLocalStorage[0]._id);
        }
    };


    const handleChange = prop => event => {
        setAddedService({ ...addedService, [prop]: event.target.value });
    };


    const handleAddService = () => {
        const img_url = userFromLocalStorage[0].img_url;
        const { serviceName, serviceDescription, servicePrice } = addedService;
        const isNumber = (servicePrice) => Number.isFinite(servicePrice);

        if (!(serviceName && serviceDescription && servicePrice)) {
            return renderWarningText;
        }

        console.log(isNumber);
        if (!isNumber) {
            return (
                <Typography>Must be a number!</Typography>
            )
        }

        const userName = userFromLocalStorage[0].userName;
        const _id = userFromLocalStorage[0]._id


        setListOfAddedServices([
            ...listOfAddedServices,
            {
                serviceName, serviceDescription, userName, _id, img_url
            }
        ]);


        userService.addServiceToDatabase(serviceName, serviceDescription, servicePrice, userFromLocalStorage[0].userName, userFromLocalStorage[0]._id, img_url);
        setAddedService('');
        setOpen(false);
    }

    useEffect(() => {
        const selectedSubscribedServices = allServices.filter(item => listOfSubscribedServices.includes(item._id))
        setSelectedSubscription(selectedSubscribedServices)
    }, [subscribedService, allServices, listOfSubscribedServices, addedService, listOfAddedServices]);


    const renderWarningText = (
        <Typography>Must be a number!</Typography>
    )

    const renderAboutDialog = (
        <Dialog open={openAbout} onClose={handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle>About us</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    <strong>Edmir Suljic:</strong> frontend. Worked on the cards and services.<br />
                    <strong>Samin Dehghani:</strong> frontend. Worked on the login and signup functionality and pages.<br />
                    <strong>Matteo Madrusan:</strong> backend. Worked on api and setting up the server and adding/getting services functions.<br />
                    <strong>Filip Bengtsson:</strong> backend. Worked on database and login/create user functions.
                </DialogContentText>
            </DialogContent>
        </Dialog>
    )

    const renderAddServiceMenu = (
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Add service</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Here you can add a service that you will provide to other users! Write the name, price and a short description of what the service is.
          </DialogContentText>

                <TextField required value={addedService.serviceName} onChange={handleChange('serviceName')} id="standard-basic" label="Name of service" />
                <TextField required value={addedService.servicePrice} onChange={handleChange('servicePrice')} id="standard-basic" label="Price" />
                <TextField required multiline value={addedService.serviceDescription} onChange={handleChange('serviceDescription')} id="standard-basic" label="Description" />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Cancel
          </Button>
                <Button onClick={handleAddService} color="primary">
                    Add Service
          </Button>
            </DialogActions>
        </Dialog>
    );

    return (
        <div className={classes.background}>
            <Appbar allServices={allServices} listOfSubscribedServices={listOfSubscribedServices} listOfAddedServices={listOfAddedServices} selectedSubscription={selectedSubscription} />
            <Grid container item xs={12} className={classes.grid}>
                <Typography className={classes.title} variant="h1">
                    List of services
            </Typography>
                <ColoredLine color="#22333B" />
                <ToolTip title="About us!" aria-label="add">
                    <Fab className={classes.aboutFab} aria-label="add" onClick={handleAboutOpen}>
                        <HelpOutlineIcon fontSize="large" />
                    </Fab>
                </ToolTip>
                <ToolTip title="Add a new Service!" aria-label="add">
                    <Fab className={classes.fab} aria-label="add" onClick={handleAddOpen}>
                        <AddIcon />
                    </Fab>
                </ToolTip>
                <Grid item xs={10} className={classes.grid}>
                    <ButlerCard
                        open={openSubscribe}
                        handleClose={handleClose}
                        handleSubscribe={handleSubscribe}
                        listOfSubscribedServices={listOfSubscribedServices}
                        setListOfSubscribedServices={setListOfSubscribedServices}
                        allServices={allServices}
                        handleOpen={handleOpen}
                        rating={allServices}
                    />
                </Grid>
                {renderAddServiceMenu}
                {renderAboutDialog}
            </Grid>
        </div>
    );
}
export default StartPage;
