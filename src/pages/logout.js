import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import * as creators from '../redux/actions/creators';

const Logout = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    sessionStorage.removeItem('auth');
    dispatch(creators.user.logout());
    history.push('/');
  }, [dispatch, history]);

  return null;
};

export default Logout;