import { Button, Dialog, DialogContent, DialogTitle, Grid, makeStyles, Typography } from "@material-ui/core";
import { Form, Formik } from "formik";
import { useState } from "react";
import Header from "../components/Header";
import SlideTransition from "../components/SlideTransition";
import * as yup from "yup";
import FormikField from "../components/FormikField";

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
  form: {
    marginTop: '3rem',

    '& .header': {
      fontWeight: 600,
      marginBottom: '3rem',
      [theme.breakpoints.only('xs')]: {
        fontSize: '1.5rem',
      },
      [theme.breakpoints.only('md')]: {
        fontSize: '2rem',
      },
    },
    '& .sub-header': {
      fontWeight: 400,
      marginBottom: '2rem',
      [theme.breakpoints.only('xs')]: {
        fontSize: '1.2rem',
      },
    },
    '& .field': {
      marginBottom: '1.2rem',
      borderRadius: '5px',
    },
    '& .field .inner': {
      padding: '.2rem'
    },
    '& .submit-btn': {
      padding: '.7rem 2.5rem',
      textTransform: 'capitalize',
      fontWeight: 500,
      fontSize: '1.2rem',
      borderRadius: '1rem',
      marginTop: '2rem',
      boxShadow: 'none',
      [theme.breakpoints.only('xs')]: {
        fontSize: '1.2rem',
      },
    },
  },
}));

const Admin = () => {
  const classes = useStyles();
  const [showDialog, setShowDialog] = useState(false);

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

      <Button variant="contained" color="secondary" onClick={() => setShowDialog(true)}>Add New Show</Button>

      <div className={classes.showsContainer}>
        <Typography variant="h5" className={classes.showsHeader}>Available Performances</Typography>

        <div className={classes.showContainer}>
          <Grid container alignItems="center" spacing={3}>
            <ShowCard/> <ShowCard/> <ShowCard/> <ShowCard/>
          </Grid>
        </div>
      </div>

      <Dialog
        fullWidth
        maxWidth="sm"
        open={showDialog}
        onClose={() => setShowDialog(false)}
        TransitionComponent={SlideTransition}
        >
          <DialogTitle>Add A Show</DialogTitle>
          <DialogContent>
            <Formik
              initialValues={{
                username: '',
                name: '',
                password: '',
              }}

              validationSchema={yup.object({
                username: yup.string()
                  .max(12, 'Username should not be greater than 12 characters')
                  .required('Please enter your username'),
                name: yup.string()
                  .max(12, 'Name should not be greater than 30 characters')
                  .required('Please enter your name'),
                password: yup.string()
                  .required('Please enter your password'),
              })}

              //onSubmit={doLogin}
              >
              <Form className={classes.form}>
                <FormikField
                  name="name"
                  variant="outlined"
                  label="Name"
                  color="primary"
                  className="field"
                  InputProps={{ className: "inner" }}
                />
                <FormikField
                  name="description"
                  variant="outlined"
                  label="Description"
                  color="primary"
                  className="field"
                  multiline
                  rows={6}
                  InputProps={{ className: "inner" }}
                />
                
                <Button
                  fullWidth
                  type="submit" 
                  variant="contained" 
                  color="primary" 
                  size="large"
                  className="submit-btn"
                  >
                    Register
                  </Button>
              </Form>
            </Formik>
          </DialogContent>
        </Dialog>
    </div>
  );
};

export default Admin;