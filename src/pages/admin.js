import { makeStyles } from "@material-ui/core";
import Header from "../components/Header";

const useStyles = makeStyles(theme => ({
  root: {
    padding: '5rem 10rem',
  },
}));

const Admin = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Header/>

      
    </div>
  );
};

export default Admin;