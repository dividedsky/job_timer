/* eslint-disable no-unused-vars */
import React from 'react';
/* eslint-enable no-unused-vars */
import { NavLink } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Link from '@material-ui/core/Link';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import styled from 'styled-components';

// const MyNav = styled.div`
//   background-color: #394b83;
//   text-decoration: none;
//   display: flex;
//   justify-content: center;
//   width: 50%;
//   margin: 10px auto;
//   border-radius: 8px;

//   a {
//     text-decoration: none;
//     padding: 10px 100px;
//     font-weight: bold;
//     color: #78788e;
//     font-size: 26px;

//     &.active {
//       color: #65c343;
//     }
//   }
// `;

const styles = theme => ({
  navTab: {
    textDecoration: 'none',
    padding: '0 10px',
    fontWeight: 'bold',
    color: 'white',
    '&:selected': {
      color: 'red',
    },
  },
  navBar: {
    backgroundColor: theme.palette.primary.main,
    display: 'flex',
    justifyContent: 'center',
  },
  navLink: {
    textDecoration: 'none',
    '&.active': {
      color: 'orange',
    },
  },
  active: {
    color: 'green',
  },
});

const Navbar = props => {
  const { classes } = props;

  return (
    <>
      <AppBar>
        <Toolbar className={classes.navBar}>
          <NavLink to="/" exact className={classes.navLink}>
            <Tab className={classes.navTab} label="Current Job">
              Current Job
            </Tab>
          </NavLink>
          <NavLink to="history" className={classes.navLink}>
            <Tab
              className={classes.navTab}
              label="Completed Jobs"
              to="/history"
            >
              Completed Jobs
            </Tab>
          </NavLink>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default withStyles(styles)(Navbar);
