import { AppBar, makeStyles, Toolbar, Typography } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  logo: {
    fontWeight: '600',
  }
}));

const Header = () => {
  const classes = useStyles();

  return (
    <div>
      <AppBar
        position="fixed"
      >
        <Toolbar>
          <Typography variant="h6" className={classes.logo}>Theatre Booking</Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Header;