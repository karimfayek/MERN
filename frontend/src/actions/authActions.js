import axios from 'axios';
import {
  userLoaded,
  registerSuccess,
  loginSuccess,
  authError,
  logout,
} from '../reducers/authReducer';
import setAuthToken from '../utils/setAuthToken';

export const loadUser = () => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  try {
    const res = await axios.get('http://localhost:4000/api/auth/user');
    dispatch(userLoaded(res.data));
  } catch (err) {
    dispatch(authError());
  }
};

export const register = (formData) => async (dispatch) => {
  try {
    const res = await axios.post('http://localhost:4000/api/auth/register', formData);
    dispatch(registerSuccess(res.data));
    dispatch(loadUser());
  } catch (err) {
    dispatch(authError());
  }
};

export const login = (formData) => async (dispatch) => {
  try {
    const res = await axios.post('http://localhost:4000/api/auth/login', formData);
    dispatch(loginSuccess(res.data));
    dispatch(loadUser());
  } catch (err) {
    dispatch(authError());
  }
};

export const logoutUser = () => (dispatch) => {
  dispatch(logout());
};
