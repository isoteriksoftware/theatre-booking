import { Button, makeStyles, Typography } from "@material-ui/core";
import { useEffect } from "react";
import Header from "../components/Header";
import { scrollToTop } from "../components/utils";

const useStyles = makeStyles(theme => ({
  showCaseContainer: {
    padding: '2rem 5rem',
  },
  showCase: {
    backgroundImage: 'url(images/showcase-bg.png)',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    width: '100%',
    borderRadius: '2rem',
  },
  showCaseInner: {
    borderRadius: '2rem',
    background: 'rgba(0, 0, 0, .3)',
    padding: '5rem 10rem 1rem 10rem',
    textAlign: 'center',
    color: 'white',
  },
  showCaseTitle: {
    fontWeight: 700,
    marginBottom: '2rem',
  },
  showCaseBtn: {
    marginTop: '7rem',
    textTransform: 'capitalize',
    fontSize: '1.5rem',
    borderRadius: '4rem'
  }
}));

const Index = () => {
  const classes = useStyles();

  useEffect(() => {
    scrollToTop();
  }, []);

  return (
    <div>
      <Header/>

      <div className={classes.showCaseContainer}>
        <div className={classes.showCase}>
          <div className={classes.showCaseInner}>
            <Typography variant="h3" className={classes.showCaseTitle}>MORTAL KOMBAT</Typography>
            <Typography variant="body1">
              "We got a guy with things comin’ out of his hands, we got another guy who freezes stuff, 
              and then there’s a man, who as far as I can tell, is made out of electricity. I mean, how did he disappear like that? What is goin’ on here? 
              WHO IS THIS GUY?"
            </Typography>
            <Button fullWidth variant="contained" color="secondary" className={classes.showCaseBtn}>Create Account</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;