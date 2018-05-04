import { AsyncStorage } from 'react-native';
import { AUTH_SET_TOKEN } from './types';
import startMainTabs from '../../screens/main-tabs/startMainTabs';

const API_KEY = 'AIzaSyDFTvgQdH9osK-5jURgMX7DqoddB-1Ze7M';

export const authAttempt = (authMode, { email, password }) => dispatch => {
  let requestUrl = null;

  if (authMode === 'login') {
    requestUrl = `https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=${API_KEY}`;
  } else {
    requestUrl = `https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=${API_KEY}`;
  }
  
  fetch(requestUrl, {
    method: 'POST',
    body: JSON.stringify({ email, password, returnSecureToken: true }),
    headers: { 'Content-Type': 'application/json' }
  })
  .then(res => res.json())
  .then(data => {
    if (data.error || !data.idToken) {
      alert('Authentication failed, please try again');
    } else {
      dispatch(saveToken(data.idToken, data.expiresIn));
      startMainTabs();
    }
    console.log(data);
  })
  .catch(err => console.log(err));
};

export const autoSignIn = () => async dispatch => {
  console.log('Trying to auto sign in');
  const token = await dispatch(getToken());
  if (!token) {
    return console.log('Auto sign in failed');
  }
  startMainTabs();
};

export const saveToken = (token, expiresIn) => dispatch => {
  const now = new Date();
  const expiryDate = now.getTime() + expiresIn * 1000;

  dispatch(setToken(token));

  try {
    AsyncStorage.setItem('ap:auth:token', token);
    AsyncStorage.setItem('ap:auth:expiryDate', expiryDate.toString());
  } catch (err) {
    console.log(err);
  }
};

export const setToken = token => ({
  type: AUTH_SET_TOKEN,
  token
});

export const getToken = () => (dispatch, getState) => new Promise(async (resolve, reject) => {
  let token = getState().auth.token;
  let expiryDate = null;
  
  // Extract token-related data from the async storage
  try {
    if (!token) token = await AsyncStorage.getItem('ap:auth:token');
    expiryDate = await AsyncStorage.getItem('ap:auth:expiryDate');
  } catch (err) {
    reject();
  }
  
  if (token && (parseInt(expiryDate) > Date.now())) {
    resolve(token);
  } else {
    cleanAuthStorage();
    reject();
  }
});

export const cleanAuthStorage = () => {
  AsyncStorage.removeItem('ap:auth:expiryDate');
  AsyncStorage.removeItem('ap:auth:token');
};
