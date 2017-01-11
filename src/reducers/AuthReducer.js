import {
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL,
  LOGIN_USER,
  OTHER_LOGIN_USER,
  OTHER_LOGIN_USER_SIGN_UP,

  EMAIL_CHANGED,
  PASSWORD_CHANGED
} from '../actions/types';

const INITIAL_STATE = {
  email: '',
  password: '',
  passwordConfirm: '',
  name: '',
  firstName: '',
  phoneNumber: '',
  user: null,
  error: '',
  loading: false,
  couponNumber: 0,
  promoCode: '',
  referral: null,
  job: null,
  ringleEmails: null,
  ringleEmailCheckers: null,
};


export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case OTHER_LOGIN_USER:
      return { ...state, loading: true, error: '' };
    case OTHER_LOGIN_USER_SIGN_UP:
      return { ...state, loading: false, error: '' };
    case LOGIN_USER:
      return { ...state, loading: true, error: '' };
    case LOGIN_USER_SUCCESS:
      return { ...state, ...INITIAL_STATE, user: action.payload, ringleEmails: action.ringleEmails, ringleEmailCheckers: action.ringleEmailCheckers };
    case LOGIN_USER_FAIL:
      return { ...state, error: 'Authentication Failed..', password: '', loading: false };

    case EMAIL_CHANGED:
      return { ...state, email: action.payload };
    case PASSWORD_CHANGED:
      return { ...state, password: action.payload };
    default:
      return state;
  }
};
