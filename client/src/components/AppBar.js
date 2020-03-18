import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/Appbar";
import IconButton from "@material-ui/core/IconButton";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import AccountCircle from "@material-ui/icons/AccountCircle";
import FormatListBulletedIcon from "@material-ui/icons/FormatListBulleted";
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Menu from "@material-ui/core/Menu";

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

export default function Appbar({ listOfSubscribedServices }) {
  const classes = useStyles();
  const [auth, setAuth] = useState(true);
  const [anchorEl, setAnchorEl] = useState(null);
  const isMenuOpen = Boolean(anchorEl);

  const handleChange = event => {
    setAuth(event.target.checked);
  };

  const handleList = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => { }, [listOfSubscribedServices]);

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
      <Divider component="li" />
      <List>
        {listOfSubscribedServices.length > 0
          ? listOfSubscribedServices.map(item => <ListItem divider> <ListItemText/> <Typography className={classes.username} variant="body1">{`${item.name} by ${item.username}`}</Typography> </ListItem>)
          : <Typography className={classes.listTitle} variant="h6">No service has been selected yet</Typography>}
      </List>
    </Menu>
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
          >
            <AccountCircle />
          </IconButton>
        </Toolbar>
      </AppBar>
      {renderList}
    </div>
  );
}
