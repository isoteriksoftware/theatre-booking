import { Button, Grid, makeStyles, Typography } from "@material-ui/core";
import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import Header from "../components/Header";
import { axiosInstance, scrollToTop, showInfo } from "../components/utils";
import Skeleton from '@material-ui/lab/Skeleton';
import { useDispatch } from "react-redux";
import * as creators from '../redux/actions/creators';

const useStyles = makeStyles(theme => ({
  showCaseContainer: {
    padding: '2rem 5rem',
    [theme.breakpoints.down('sm')]: {
      padding: '1rem .5rem',
    }
  },
  showCase: {
    backgroundImage: 'url(images/showcase-bg.png)',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    width: '100%',
    borderRadius: '2rem',
    backgroundPosition: 'center',
  },
  showCaseInner: {
    borderRadius: '2rem',
    background: 'rgba(0, 0, 0, .3)',
    padding: '5rem 10rem 1rem 10rem',
    textAlign: 'center',
    color: 'white',
    [theme.breakpoints.down('sm')]: {
      padding: '4rem 3rem 2rem 2rem',
    }
  },
  showCaseTitle: {
    fontWeight: 700,
    marginBottom: '2rem',
    [theme.breakpoints.down('sm')]: {
      fontSize: '1.7rem',
    }
  },
  showCaseBtn: {
    marginTop: '7rem',
    textTransform: 'capitalize',
    fontSize: '1.5rem',
    borderRadius: '4rem',
    [theme.breakpoints.down('sm')]: {
      marginTop: '4rem',
    }
  },
  showsContainer: {
    padding: '2rem 5rem',
    marginTop: '1rem',
    [theme.breakpoints.down('sm')]: {
      padding: '1rem',
      marginTop: '3rem',
    }
  },
  showsHeader: {
    fontWeight: 'bold',
  },
  showContainer: {
    padding: '2rem 5rem',
    marginTop: '2rem',
    [theme.breakpoints.down('sm')]: {
      padding: '0rem 1rem',
      marginTop: '1rem',
    }
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
  const history = useHistory();
  const dispatch = useDispatch();

  const [shows, setShows] = useState(null);

  useEffect(() => {
    scrollToTop();
  }, []);

  useEffect(() => {
    axiosInstance.get('shows')
    .then(res => {
      if (res.status === 200) {
        const data = res.data;
        setShows(data);
      }
      else if (res.status === 404)
        showInfo('Oops!', 'No scheduled performances at this time.');
      else if (res.status === 401)
        dispatch(creators.user.logout());
    })
    .catch(() => {});
  }, [dispatch]);

  const addToCart = show => dispatch(creators.user.addToCart(show));

  const goTo = where => history.push(where);

  const ShowCard = ({ show }) => {
    return (
      <Grid item xs={12} md={6}>
        <div className={classes.showCard}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={4}><img src={show.image_url} alt="Cover" className={classes.showImg}/></Grid>
            <Grid item xs={12} md={8}>
              <Typography variant="h6" className={classes.showTitle}>{show.name}</Typography>
              <Typography variant="body1" className={classes.showContent}>
                {show.description}
              </Typography>
              <div className={classes.showDate}>
                <Typography variant="caption" color="textSecondary">{show.start_date}</Typography>
              </div>
              <Button fullWidth variant="outlined" color="secondary" className={classes.bookShowBtn} onClick={() => addToCart(show)}>Book A Seat</Button>
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
            <Button fullWidth variant="contained" color="secondary" className={classes.showCaseBtn} onClick={() => goTo('/register')}>Create Account</Button>
          </div>
        </div>
      </div>

      <div className={classes.showsContainer}>
        <Typography variant="h5" className={classes.showsHeader}>Scheduled Performances</Typography>

        <div className={classes.showContainer}>
          <Grid container alignItems="center" spacing={3}>
            {shows ? (
              shows.map((show, index) => <ShowCard key={index} show={show}/>)
            ) :
            <Skeleton variant="rect" width="100%" height={300}/>}
          </Grid>
        </div>
      </div>
    </div>
  );
};

export default Index;