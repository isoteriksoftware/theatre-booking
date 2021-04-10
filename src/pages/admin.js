import { Button, Grid, makeStyles, Typography } from "@material-ui/core";
import Header from "../components/Header";

const useStyles = makeStyles(theme => ({
  root: {
    padding: '3rem',
  },
  showsContainer: {
    padding: '2rem 0rem',
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
}));

const Admin = () => {
  const classes = useStyles();

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
            </Grid>
          </Grid>
        </div>
      </Grid>
    );
  };

  return (
    <div className={classes.root}>
      <Header/>

      <Button variant="contained" color="secondary">Add New Show</Button>

      <div className={classes.showsContainer}>
        <Typography variant="h5" className={classes.showsHeader}>Available Performances</Typography>

        <div className={classes.showContainer}>
          <Grid container alignItems="center" spacing={3}>
            <ShowCard/> <ShowCard/> <ShowCard/> <ShowCard/>
          </Grid>
        </div>
      </div>
    </div>
  );
};

export default Admin;