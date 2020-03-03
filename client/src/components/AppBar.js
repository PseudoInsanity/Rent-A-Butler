import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import {
  AppBar, IconButton, Toolbar, Typography,
} from '@material-ui/core';
import { AccountCircle, Brightness4 } from '@material-ui/icons/';

const useStyles = makeStyles((theme) => ({

  title: {
    textalign: 'left',
    flexGrow: 1,
  },
  appbarColor: {
    color: theme.palette.secondary.main,
  },
}));

export default function Header({ flipTheme }) {
  const classes = useStyles();
  return (
    <AppBar className={classes.appbarColor} position="static">
      <Toolbar>
        <Typography className={classes.title} variant="h5">
          rent A butler
        </Typography>
        <IconButton
          onClick={flipTheme}
          edge="end"
          aria-label="switch between dark and light theme"
          color="inherit"
        >
          <Brightness4 />
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
  );
}

Header.propTypes = {
  flipTheme: PropTypes.oneOfType([PropTypes.func]).isRequired,
};
