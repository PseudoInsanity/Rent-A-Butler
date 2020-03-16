import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/Appbar';
import IconButton from '@material-ui/core/IconButton';
import Toolbar from '@material-ui/core/Toolbar'; 
import Typography from '@material-ui/core/Typography';
import AccountCircle from '@material-ui/icons/AccountCircle';

const useStyles = makeStyles((theme) => ({

  title: {
    textalign: 'left',
    flexGrow: 1,
  },
  appbarColor: {
    backgroundColor: theme.palette.background.light,
    color: theme.palette.secondary.light,
  },
}));

export default function Appbar() {
  const classes = useStyles();
  return (
    <AppBar className={classes.appbarColor} position="static">
      <Toolbar>
        <Typography className={classes.title} variant="h5">
          rent A butler
        </Typography>
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
  );
}
