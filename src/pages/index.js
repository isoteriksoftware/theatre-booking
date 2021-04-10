import { Button, Grid, makeStyles, Typography } from "@material-ui/core";
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
  },
  showsContainer: {
    padding: '2rem 5rem',
    marginTop: '2rem',
  },
  showsHeader: {
    fontWeight: 'bold',
  },
  showContainer: {
    padding: '2rem 5rem',
    marginTop: '2rem',
  },
  showCard: {
    background: 'white',
    boxShadow: '0px 2px 20px rgba(0, 0, 0, 0.05)',
    borderRadius: '2rem',
    padding: '1rem'
  },
  showImg: {
    width: '100%',
    height: 'auto',
    borderRadius: '1rem',
  },
  showTitle: {
    fontWeight: 'bold',
    marginBottom: '1rem',
    color: theme.palette.secondary.main,
  },
  showContent: {
    lineHeight: '30px',
    fontSize: '.9rem',
  },
  showDate: {
    textAlign: "right",
    paddingTop: '.5rem',
  },
  bookShowBtn: {
    marginTop: '1rem',
    textTransform: 'capitalize',
    borderRadius: '4rem'
  },
}));

const Index = () => {
  const classes = useStyles();

  useEffect(() => {
    scrollToTop();
  }, []);

  const ShowCard = ({ show = { image: "images/card 10.jpg", name: "The Avengers",
    description: "" } }) => {
    return (
      <Grid item xs={12} md={6}>
        <div className={classes.showCard}>
          <Grid container spacing={3}>
            <Grid item xs={4}><img src={show.image} alt="Cover" className={classes.showImg}/></Grid>
            <Grid item xs={8}>
              <Typography variant="h6" className={classes.showTitle}>{show.name}</Typography>
              <Typography variant="body1" className={classes.showContent}>
                "We got a guy with things comin’ out of his hands, we got another guy who freezes stuff, 
                and then there’s a man, who as far as I can tell, is made out of electricity. I mean, how did he disappear like that? What is goin’ on here? 
                WHO IS THIS GUY?"
                {show.description}
              </Typography>
              <div className={classes.showDate}>
                <Typography variant="caption" color="textSecondary">2020-01-05 12:12:00</Typography>
              </div>
              <Button fullWidth variant="outlined" color="secondary" className={classes.bookShowBtn}>Book A Seat</Button>
            </Grid>
          </Grid>
        </div>
      </Grid>
    );
  };

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

      <div className={classes.showsContainer}>
        <Typography variant="h5" className={classes.showsHeader}>Scheduled Performances</Typography>

        <div className={classes.showContainer}>
          <Grid container alignItems="center" spacing={3}>
            <ShowCard/> <ShowCard/> <ShowCard/> <ShowCard/>
          </Grid>
        </div>
      </div>
    </div>
  );
};

export default Index;