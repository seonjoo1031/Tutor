import { AsyncStorage } from 'react-native';
import { Actions } from 'react-native-router-flux';
import {
  EMAIL_CHANGED,
  PASSWORD_CHANGED,
  // PASSWORD_CONFIRM_CHANGED,
  // NAME_CHANGED,
  // FIRST_NAME_CHANGED,
  // PHONE_NUMBER_CHANGED,
  LOGIN_USER,
  // PROMOCODE_CHANGED,
  // PROMOCODE_UPDATED,
  // FETCH_RINGLE_EMAIL_CHECKERS,
  // UPDATE_AND_FETCH_RINGLE_EMAIL_CHECKERS,
  // JOB_CHANGED,
  // REFERRAL_CHANGED,
  OTHER_LOGIN_USER,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL,
  OTHER_LOGIN_USER_SIGN_UP
} from './types';

import {
  ringle_auth_signInWithEmailAndPassword,
  // ringle_email_toggle,
  urlForFBAndGGLogin,
  // urlRingleEmailFetch
} from '../components/common/ApiUrl';

export const loginUser = (email, password, loginType) => {
  console.log(email);
  console.log(password);
  AsyncStorage.multiSet([['login_channel', 'email'], ['signin', 'on'], ['email', email], ['password', password]]);
  return (dispatch) => {
    dispatch({ type: LOGIN_USER });
    ringle_auth_signInWithEmailAndPassword(email, password)
      .then((response) => response.json())
      .then(json => handleResponse(dispatch, json.response, loginType))
      .catch((error) => {
        alert('정보가 잘못되었거나 인터넷이 불안정합니다. 다시 로그인 해주세요.');
        console.log(error);
        //그다음 state를 항상 다시 꺼야 함..
        //LOGIN_USER_FAIL
        dispatch({ type: LOGIN_USER_FAIL });
        Actions.auth();
      });
  };
};

//auth_token도 보내야하지 않나.
export const otherLoginUser = (email, loginType) => {
  console.log(email);
  return (dispatch) => {
    dispatch({ type: OTHER_LOGIN_USER });
    urlForFBAndGGLogin(email)
      .then((response) => response.json())
      .then(json => handleResponse(dispatch, json.response, loginType, email))
      .catch((error) => {
        console.log(error);
      });
  };
};

const otherLoginUserSignUp = (dispatch, email) => {
  dispatch({ type: OTHER_LOGIN_USER_SIGN_UP });
  alert('Ringle에 오신 것을 환영합니다. 추가 정보를 입력해 주세요!');
  Actions.signup({ existing_email: email });
  // AsyncStorage.setItem('signin', 'off');
  // AsyncStorage.multiRemove(['login_channel', 'email', 'password', 'signin']);
};

const handleResponse = (dispatch, response, loginType, email) => {
  console.log(response);
  if (response.application_response_code.substr(0, 1) === '1') {
      loginUserSuccess(dispatch, response, loginType);
  } else {
    if (loginType === 'google' || loginType === 'facebook') {
      console.log(loginType);
      otherLoginUserSignUp(dispatch, email);
    } else {
      console.log('--------------------------------------------!!!!!!');
      console.log(loginType);
      loginUserFail(dispatch);
    }
  }
};

const loginUserFail = (dispatch) => {
  dispatch({ type: LOGIN_USER_FAIL });
  AsyncStorage.setItem('signin', 'off');
  AsyncStorage.multiRemove(['login_channel', 'email', 'password', 'signin']);
};

const loginUserSuccess = (dispatch, response, loginType) => {
  user = response.user;
  ringleEmails = response.ringleEmails;
  ringleEmailCheckers = response.ringleEmailCheckers;
  dispatch({
    type: LOGIN_USER_SUCCESS,
    payload: user,
    ringleEmails: ringleEmails,
    ringleEmailCheckers: ringleEmailCheckers
  });
  console.log(user);
  console.log(loginType);
  if (loginType === 'facebook') {
    AsyncStorage.multiSet([['login_channel', 'facebook'], ['signin', 'on'], ['email', user.email]]);
  } else if (loginType === 'google') {
    AsyncStorage.multiSet([['login_channel', 'google'], ['signin', 'on'], ['email', user.email]]);
  }
  console.log(AsyncStorage.getAllKeys());
  Actions.main();
};

export const emailChanged = (text) => {
  return {
    type: EMAIL_CHANGED,
    payload: text
  };
};

export const passwordChanged = (text) => {
  return {
    type: PASSWORD_CHANGED,
    payload: text
  };
};
