import { Button, makeStyles, Typography } from "@material-ui/core";
import { Form, Formik } from "formik";
import { useEffect } from "react";
import Header from "../components/Header";
import { axiosInstance, ReactSwal, scrollToTop, showError, showLoading, showNetworkError } from "../components/utils";
import * as yup from "yup";
import FormikField from "../components/FormikField";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import * as creators from '../redux/actions/creators';

const useStyles = makeStyles(theme => ({
  root: {
    padding: '5rem 10rem',
    [theme.breakpoints.down('sm')]: {
      padding: '3rem 1rem',
    }
  },
  container: {
    background: 'white',
    boxShadow: '0px 2px 20px rgba(0, 0, 0, 0.05)',
    padding: '2rem',
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

const AdminLogin = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    scrollToTop();
  }, []);

  const doLogin = values => {
    showLoading('Please wait...');

    axiosInstance.post('admin/session', {}, {
      auth: {
        username: values.username,
        password: values.password,
      },
    })
    .then(res => {
      ReactSwal.close();

      if (res.status === 200) {
        // Store persistent data
        const data = {
        };

        dispatch(creators.user.authenticate(true, data, '/logout', true));
        history.push('/admin');
      }
      else if (res.status === 401) {
        showError('Oops!', 'Invalid username or password');
      }
      else {
        showNetworkError();
      }
    })
    .catch(() => showNetworkError())
  };

  return (
    <div className={classes.root}>
      <Header/>

      <div className={classes.container}>
        <Typography variant="h5">Admin Login</Typography>

        <Formik
          initialValues={{
            username: '',
            password: '',
          }}

          validationSchema={yup.object({
            username: yup.string()
              .max(12, 'Username should not be greater than 12 characters')
              .required('Please enter your username'),
            password: yup.string()
              .required('Please enter your password'),
          })}

          onSubmit={doLogin}
          >
          <Form className={classes.form}>
            <FormikField
              name="username"
              variant="outlined"
              label="Username"
              color="primary"
              className="field"
              InputProps={{ className: "inner" }}
            />

            <FormikField
              name="password"
              variant="outlined"
              label="Password"
              color="primary"
              type="password"
              className="field"
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
                Login
              </Button>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default AdminLogin;