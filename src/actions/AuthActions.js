import { AsyncStorage, Alert } from 'react-native';
import { Actions } from 'react-native-router-flux';
import {
  EMAIL_CHANGED,
  PASSWORD_CHANGED,
  PASSWORD_CONFIRM_CHANGED,
  FIRST_NAME_CHANGED,
  LOGIN_USER,
  // FETCH_RINGLE_EMAIL_CHECKERS,
  // UPDATE_AND_FETCH_RINGLE_EMAIL_CHECKERS,
  REFERRAL_CHANGED,
  SCHOOL_CHANGED,
  DEPARTMENT_CHANGED,
  OTHER_LOGIN_USER,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL,
  OTHER_LOGIN_USER_SIGN_UP,

  REFERRAL_EMAIL_CHECK,
  GET_REFERRAL_MESSAGE
} from './types';

import {
  ringle_auth_signInWithEmailAndPassword,
  push_toggle,
  email_toggle,
  urlForFBAndGGLogin,
  urlForReferralEmailCheck
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
        alert('Your information is incorrent or internet communicaton is unstable. Please login again. ');
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
  Alert.alert(
    'Welcome!', 'Please enter more information.',
    [
      { text: 'OK', onPress: () => { console.log('more info'); } },
    ]
  );

  
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

export const passwordConfirmChanged = (text) => {
  return {
    type: PASSWORD_CONFIRM_CHANGED,
    payload: text
  };
};

export const firstNameChanged = (text) => {
  return {
    type: FIRST_NAME_CHANGED,
    payload: text
  };
};

export const referralChanged = (text) => {
  return {
    type: REFERRAL_CHANGED,
    payload: text
  };
};

export const schoolChanged = (text) => {
  return {
    type: SCHOOL_CHANGED,
    payload: text
  };
};

export const departmentChanged = (text) => {
  return {
    type: DEPARTMENT_CHANGED,
    payload: text
  };
};

export const pushToggle = (boolean, token) => {
  return (dispatch) => {
    //여기서 누른 것을 일단 들어가서 고쳐주는게 맞고, 그다음 리스판스...
    fetch(push_toggle(), {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        boolean: boolean,
        token: token,
      })
    })
    .then(response => response.json())
    .then(json => console.log(json.response))
    .catch(error => console.log(error))
    .done();
  };
};

export const emailToggle = (boolean, token) => {
  return (dispatch) => {
    //여기서 누른 것을 일단 들어가서 고쳐주는게 맞고, 그다음 리스판스...
    fetch(email_toggle(), {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        boolean: boolean,
        token: token,
      })
    })
    .then(response => response.json())
    .then(json => console.log(json.response))
    .catch(error => console.log(error))
    .done();
  };
};

export const referralEmailCheck = (referral) => {
  return (dispatch) => {
    dispatch({ type: REFERRAL_EMAIL_CHECK });
    urlForReferralEmailCheck(referral)
      .then((response) => response.json())
      .then(json => handleReferralMessage(dispatch, json.response))
      .catch((error) => {
        console.log(error);
      });
  };
};

const handleReferralMessage = (dispatch, response) => {
  dispatch({ type: GET_REFERRAL_MESSAGE });
  Alert.alert(
    'Message', response.message,
    [
      { text: 'OK', onPress: () => { console.log(response.message); } },
    ]
  );
};
