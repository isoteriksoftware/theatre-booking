import { AppBar, Button, makeStyles, Toolbar, Typography } from "@material-ui/core";
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

const Header = () => {
  const classes = useStyles();

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

          <Button variant="contained" className={classes.loginBtn}>Login</Button>
          <Button variant="contained" color="secondary">Register</Button>
        </Toolbar>
      </AppBar>

      <div className={classes.toolbarOffset}/>
    </div>
  );
};

export default Header;