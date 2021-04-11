import { AppBar, Button, makeStyles, Toolbar, Typography } from "@material-ui/core";
import { connect } from "react-redux";
import { useHistory } from "react-router";
import Link from "./Link";

const useStyles = makeStyles(theme => ({
  logo: {
    fontWeight: '600',
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

}));

const Header = connect(state => ({
  auth: {...state.userReducer.auth},
}))(({ auth }) => {
  const classes = useStyles();
  const history = useHistory();

  const goTo = where => history.push(where);

  return (
    <div>
      <AppBar
        position="fixed"
      >
        <Toolbar>
          <Link href="/" className={classes.link}>
            <Typography variant="h6" className={classes.logo}>Theatre Booking</Typography>
          </Link>

          <Button variant="text" className={classes.checkoutLink}>Chekout Now</Button>

          <div className={classes.flexGrow}/>

          {auth.authenticated ?
          <>
            <Button variant="contained" color="secondary" onClick={() => goTo(auth.logout)}>Logout</Button>
          </> :
          <>
            <Button variant="contained" className={classes.loginBtn} onClick={() => goTo('/login')}>Login</Button>
            <Button variant="contained" color="secondary" onClick={() => goTo('/register')}>Register</Button>
          </>}
        </Toolbar>
      </AppBar>

      <div className={classes.toolbarOffset}/>
    </div>
  );
});

export default Header;