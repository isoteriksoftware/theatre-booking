import { AppBar, Badge, Button, Hidden, IconButton, makeStyles, Menu, MenuItem, Toolbar, Typography } from "@material-ui/core";
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { useState } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router";
import Link from "./Link";

const useStyles = makeStyles(theme => ({
  logo: {
    fontWeight: '600',
    [theme.breakpoints.down('sm')]: {
      fontSize: '1rem',
    }
  },
  link: {
    color: 'white',
  },
  checkoutLink: {
    color: 'white',
    fontWeight: '600',
    marginLeft: '6rem'
  },
  flexGrow: {
    flexGrow: 1,
  },
  loginBtn: {
    marginRight: '1rem',
  },
  toolbarOffset: theme.mixins.toolbar,
  menuIcon: {
    color: 'white',
  },
}));

const Header = connect(state => ({
  auth: {...state.userReducer.auth},
  cart: [...state.userReducer.cart],
}))(({ auth, cart }) => {
  const classes = useStyles();
  const history = useHistory();

  const [anchorEl, setAnchorEl] = useState(null);

  const goTo = where => history.push(where);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = (link) => {
    setAnchorEl(null);

    if (link !== null)
      history.push(link);
  };

  return (
    <div>
      <AppBar
        position="fixed"
      >
        <Toolbar>
          <Link href="/" className={classes.link}>
            <Typography variant="h6" className={classes.logo}>Theatre Booking</Typography>
          </Link>

          <Hidden smDown>
            <Badge badgeContent={cart.length} color="secondary">
              <Button variant="text" className={classes.checkoutLink}>Chekout Now</Button>
            </Badge>

            <div className={classes.flexGrow}/>

            {auth.authenticated ?
            <>
              <Button variant="contained" color="secondary" onClick={() => goTo(auth.logout)}>Logout</Button>
            </> :
            <>
              <Button variant="contained" className={classes.loginBtn} onClick={() => goTo('/login')}>Login</Button>
              <Button variant="contained" color="secondary" onClick={() => goTo('/register')}>Register</Button>
            </>}
          </Hidden>

          <Hidden mdUp>
            <div className={classes.flexGrow}/>

            <IconButton className={classes.menuIcon} edge="start" size="medium" aria-label="icon" onClick={handleMenuClick}>
              <MoreVertIcon fontSize="large"/>
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={() => handleMenuClose(null)}
              className={classes.menu}
            >
              <MenuItem onClick={() => handleMenuClose(null)}>
                <Badge badgeContent={cart.length} color="secondary">
                  Chekout Now
                </Badge>
              </MenuItem>
              {auth.authenticated ?
              <>
                <MenuItem onClick={() => handleMenuClose('/logout')}>Logout</MenuItem>
              </> :
              <>
                <MenuItem onClick={() => handleMenuClose('/login')}>Login</MenuItem>
                <MenuItem onClick={() => handleMenuClose('/register')}>Register</MenuItem>
              </>}
            </Menu>
          </Hidden>
        </Toolbar>
      </AppBar>

      <div className={classes.toolbarOffset}/>
    </div>
  );
});

export default Header;