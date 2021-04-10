import { makeStyles } from '@material-ui/core';
import { Link, useLocation } from 'react-router-dom';

const useStyles = makeStyles({
  root: {
    textDecoration: 'none !important',
  },
});

const Component =  ({ href, children, className = '', label = 'Untitled' }) => {
  const classes = useStyles();
  const location = useLocation();

  var styles = `${classes.root} ${className}`;
  if (location.pathname === href)
    styles += ' active';
  
  return <Link to={href} className={styles}>{children || label}</Link>
};

export default Component;