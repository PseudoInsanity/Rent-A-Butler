import React, { useEffect, useState } from "react";
import Appbar from "./Appbar";
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
    const [openSubscribe, setOpenSubsribe] = useState(false);
    const [subscribedService, setSubscribedService] = useState({});
    

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setOpenSubsribe(false);
    };

    const [addedService, setAddedService] = useState({
        serviceName: '',
        serviceDescription: '',
        servicePrice: ''
    });


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
        }
    };

    useEffect(() => {}, [subscribedService, allServices, listOfSubscribedServices, addedService]);

    const handleChange = prop => event => {
        setAddedService({ ...addedService, [prop]: event.target.value });
    };


    const handleAddService = () => {
        const userFromLocalStorage = JSON.parse(localStorage.getItem('user'));
        const img_url = userFromLocalStorage[0].user.img_url;
        const { serviceName, serviceDescription, servicePrice } = addedService;

        if (!(serviceName && serviceDescription && servicePrice)) {
            return;
        }

        setListOfAddedServices([
            ...listOfAddedServices,
            serviceName, serviceDescription, userFromLocalStorage[0].user.userName, userFromLocalStorage[0].user._id, img_url
        ]);



        userService.addServiceToDatabase(serviceName, serviceDescription, servicePrice, userFromLocalStorage[0].user.userName, userFromLocalStorage[0].user._id, img_url);
        setOpen(false);
    }


    const renderAddServiceMenu = (
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Add service</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Here you can add a service that you will provide to other users! Write the name, price and a short description of what the service is.
          </DialogContentText>
                <TextField value={addedService.serviceName} onChange={handleChange('serviceName')} id="standard-basic" label="Name of service" />
                <TextField value={addedService.servicePrice} onChange={handleChange('servicePrice')} id="standard-basic" label="Price" />
                <TextField multiline value={addedService.serviceDescription} onChange={handleChange('serviceDescription')} id="standard-basic" label="Description" />
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
            <Appbar allServices={allServices} listOfSubscribedServices={listOfSubscribedServices} />
            <Grid container item xs={12} className={classes.grid}>
                <Typography className={classes.title} variant="h1">
                    List of services
            </Typography>
                <ColoredLine color="#22333B" />
                <ToolTip title="Add a new Service!" aria-label="add">
                    <Fab className={classes.fab} aria-label="add" onClick={handleClickOpen}>
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
            </Grid>
        </div>
    );
}
export default StartPage;
