import { Button, Dialog, DialogContent, DialogTitle, Grid, makeStyles, Typography } from "@material-ui/core";
import { Form, Formik } from "formik";
import { useEffect, useState } from "react";
import Header from "../components/Header";
import SlideTransition from "../components/SlideTransition";
import * as yup from "yup";
import FormikField from "../components/FormikField";
import { connect } from "react-redux";
import { useHistory } from "react-router";
import { axiosInstance, generateErrorsMarkup, showError, showInfo, showLoading, showNetworkError, showSuccess } from "../components/utils";
import Skeleton from '@material-ui/lab/Skeleton';
import MomentUtils from '@date-io/moment';
import moment from 'moment';
import {
    KeyboardDatePicker ,
    MuiPickersUtilsProvider,
} from '@material-ui/pickers';

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
      width: '100%',
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

const Admin = connect(state => ({
  auth: {...state.userReducer.auth},
}))(({ auth }) => {
  const classes = useStyles();
  const [showDialog, setShowDialog] = useState(false);
  const [shows, setShows] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const history = useHistory();

  const ShowCard = ({ show }) => {
    return (
      <Grid item xs={12} md={6}>
        <div className={classes.showCard}>
          <Grid container spacing={3}>
            <Grid item xs={4}><img src={show.image_url} alt="Cover" className={classes.showImg}/></Grid>
            <Grid item xs={8}>
              <Typography variant="h6" className={classes.showTitle}>{show.name}</Typography>
              <Typography variant="body1" className={classes.showContent}>
                {show.description}
              </Typography>
              <div className={classes.showDate}>
                <Typography variant="caption" color="textSecondary">{show.start_date}</Typography>
              </div>
            </Grid>
          </Grid>
        </div>
      </Grid>
    );
  };

  useEffect(() => {
    if (!auth.authenticated || !auth.isAdmin)
      history.push('/logout');
  }, [auth, history]);

  useEffect(() => {
    axiosInstance.get('admin/show')
    .then(res => {
      if (res.status === 200) {
        const data = res.data;
        setShows(data);
      }
      else if (res.status === 404)
        showInfo('Oops!', 'No scheduled performances at this time.');
      else if (res.status === 401)
        history.push('/logout');
    })
    .catch(() => {});
  }, [history]);

  const reloadShows = () => {
    setShows(null);

    axiosInstance.get('admin/show')
    .then(res => {
      if (res.status === 200) {
        const data = res.data;
        setShows(data);
      }
      else if (res.status === 404)
        showInfo('Oops!', 'No scheduled performances at this time.');
      else if (res.status === 401)
        history.push('/logout');
    })
    .catch(() => {});
  };

  const handleFileChanged = e => {
    setImageFile(e.target.files[0]);
  };

  const doAddShow = (values) => {
    showLoading();

    const formData = new FormData();
    formData.append('description', values.description);
    formData.append('name', values.name);
    formData.append('start_date', moment(startDate).format('yyyy-MM-DD'));
    formData.append('end_date', moment(endDate).format('yyyy-MM-DD'));
    formData.append('image', imageFile);

    axiosInstance.post('admin/show', formData, {
      headers: {
          'content-type': 'multipart/form-data'
      }
    })
    .then(res => {
      if (res.status === 201) {
        showSuccess('Show Added!');
        reloadShows();
      }
      else if (res.status === 400) {
        console.log(res.data);
        const body = generateErrorsMarkup(res.data.messages.error);
        showError('Oops!', body);
      }
      else if (res.status === 401)
        history.push('/logout');
      else
        showNetworkError();
    })
    .catch(() => showNetworkError());
  };

  return (
    <div className={classes.root}>
      <Header/>

      <Button variant="contained" color="secondary" onClick={() => setShowDialog(true)}>Add New Show</Button>

      <div className={classes.showsContainer}>
        <Typography variant="h5" className={classes.showsHeader}>Available Performances</Typography>

        <div className={classes.showContainer}>
          <Grid container alignItems="center" spacing={3}>
            {shows ? (
              shows.map((show, index) => <ShowCard key={index} show={show}/>)
            ) :
            <Skeleton variant="rect" width="100%" height={300}/>}
          </Grid>
        </div>
      </div>

      <Dialog
        fullWidth
        maxWidth="sm"
        scroll="body"
        open={showDialog}
        onClose={() => setShowDialog(false)}
        TransitionComponent={SlideTransition}
        >
          <DialogTitle>Add A Show</DialogTitle>
          <DialogContent>
            <Formik
              initialValues={{
                description: '',
                name: '',
              }}

              validationSchema={yup.object({
                description: yup.string()
                  .max(1000, 'Description should not be greater than 1000 characters')
                  .required('Please enter the description'),
                name: yup.string()
                  .max(30, 'Name should not be greater than 30 characters')
                  .required('Please enter your name'),
              })}

              onSubmit={doAddShow}
              >
                <MuiPickersUtilsProvider utils={MomentUtils}>
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
                    <KeyboardDatePicker
                      margin="normal"
                      label="Start Date"
                      format="yyyy-MM-DD"
                      value={startDate}
                      onChange={date => setStartDate(date)}
                      KeyboardButtonProps={{
                          'aria-label': 'change date',
                      }}
                      className="field"
                    />
                    <KeyboardDatePicker
                      margin="normal"
                      label="End Date"
                      format="yyyy-MM-DD"
                      value={endDate}
                      onChange={date => setEndDate(date)}
                      KeyboardButtonProps={{
                          'aria-label': 'change date',
                      }}
                      className="field"
                    />
                    <Typography variant="caption" color="textSecondary">Choose Cover Image:</Typography>
                    <FormikField
                      color="primary"
                      name="file"
                      label=""
                      type="file"
                      required
                      variant="outlined"
                      className="field"
                      fullWidth
                      inputProps={{accept: 'image/*'}}
                      onChange={handleFileChanged}
                    />
                    
                    <Button
                      fullWidth
                      type="submit" 
                      variant="contained" 
                      color="primary" 
                      size="large"
                      className="submit-btn"
                      >
                        Add Show
                      </Button>
                  </Form>
                </MuiPickersUtilsProvider>
            </Formik>
          </DialogContent>
        </Dialog>
    </div>
  );
});

export default Admin;