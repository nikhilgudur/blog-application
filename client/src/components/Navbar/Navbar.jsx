import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";

import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    marginLeft: 10,
  },
}));

const Nav = () => {
  const classes = useStyles();

  return (
    <AppBar color="primary" position="static">
      <Toolbar>
        <Typography variant="h5" className={classes.title}>
          <Link to="/">Home</Link>
        </Typography>
        <Link to="/login">
          <Button color="inherit">Login</Button>
        </Link>
        <Link to="/register">
          <Button color="inherit">Register</Button>
        </Link>
      </Toolbar>
    </AppBar>
  );
};

export default Nav;
