import { Button, makeStyles, Typography } from "@material-ui/core";
import { Form, Formik } from "formik";
import { useEffect } from "react";
import Header from "../components/Header";
import { scrollToTop } from "../components/utils";
import * as yup from "yup";
import FormikField from "../components/FormikField";

const useStyles = makeStyles(theme => ({
  root: {
    padding: '5rem 10rem',
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

const Register = () => {
  const classes = useStyles();

  useEffect(() => {
    scrollToTop();
  }, []);

  return (
    <div className={classes.root}>
      <Header/>

      <div className={classes.container}>
        <Typography variant="h5">Sign Up</Typography>

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
              name="username"
              variant="outlined"
              label="Username"
              color="secondary"
              className="field"
              InputProps={{ className: "inner" }}
            />

            <FormikField
              name="name"
              variant="outlined"
              label="Full Name"
              color="secondary"
              className="field"
              InputProps={{ className: "inner" }}
            />

            <FormikField
              name="password"
              variant="outlined"
              label="Password"
              color="secondary"
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
                Register
              </Button>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default Register;