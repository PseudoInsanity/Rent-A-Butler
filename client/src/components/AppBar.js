import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/Appbar";
import IconButton from "@material-ui/core/IconButton";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import FormatListBulletedIcon from "@material-ui/icons/FormatListBulleted";
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Menu from "@material-ui/core/Menu";
import { userService } from '../services/user.service';
import { useHistory } from "react-router-dom";



const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    height: 400,
    maxWidth: 300,
    backgroundColor: theme.palette.background.paper
  },
  listSection: {
    backgroundColor: "inherit"
  },
  ul: {
    backgroundColor: "inherit",
    padding: 0
  },
  title: {
    textalign: "left",
    flexGrow: 1
  },
  appbarColor: {
    backgroundColor: theme.palette.background.light,
    color: theme.palette.secondary.light
  },
  paper: {
    width: "100px",
    height: "300px"
  },
  listTitle: {
    display: "flex",
    padding: "8px",
    justifyContent: "center"
  },
  menu: {
    padding: 10,
    minHeigth: 400,
    minWidth: 300
  },
  username: {
    display: "flex",
    justifyContent: "center",
    color: theme.palette.secondary.light
  }
}));

function Appbar({ listOfSubscribedServices, allServices }) {
  const userFromLocalStorage = JSON.parse(localStorage.getItem('user'));
  const classes = useStyles();
  const history = useHistory();

  const [anchorEl, setAnchorEl] = useState(null);
  const isMenuOpen = Boolean(anchorEl);


  const handleList = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleSignOut = () => {
     userService.logout();
     history.push('/');
  }

  useEffect(() => { }, [listOfSubscribedServices, allServices]);

  const ColoredLine = ({ color, width }) => (
    <hr
      style={{
        color: color,
        backgroundColor: color,
        height: 2,
        width: width
      }}
    />
  );

  const renderList = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
      className={classes.menu}
    >
      <Typography className={classes.listTitle} variant="h5">
        Here are your subscriptions!
      </Typography>
      <Divider />
      <List>
        {listOfSubscribedServices.length > 0
          ? listOfSubscribedServices.map((item, index) => <ListItem key={index} divider> <ListItemText /> <Typography className={classes.username} variant="body1">{`${item.serviceName} by ${item.userName}`}</Typography> </ListItem>)
          : <Typography className={classes.listTitle} variant="h6">No service has been selected yet</Typography>}
      </List>

      <ColoredLine width="100%" color="#94D1CA" />
      <Typography className={classes.listTitle} variant="h5">
        Here are your services!
      </Typography>
      <Divider />
      <List>
        {allServices.length > 0
          ? allServices.filter(item => item.userId === userFromLocalStorage[0]._id).map((item, index) => <ListItem key={index} divider> <ListItemText /> <Typography className={classes.username} >{`${item.serviceName} by ${item.userName}`}</Typography> </ListItem>)
          : <Typography className={classes.listTitle} variant="h6">You don't provide any services yet!</Typography>}
      </List>
    </Menu >
  );

  return (
    <div>
      <AppBar className={classes.appbarColor} position="static">
        <Toolbar>
          <Typography className={classes.title} variant="h5">
            Rent A Butler
          </Typography>
          <IconButton
            edge="end"
            aria-label="services button"
            color="inherit"
            onClick={handleList}
          >
            <FormatListBulletedIcon />
          </IconButton>
          <IconButton
            edge="end"
            aria-label="account button"
            aria-haspopup="true"
            color="inherit"
            onClick={handleSignOut}
          >
            <ExitToAppIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      {renderList}
    </div>
  );
}

export default Appbar;