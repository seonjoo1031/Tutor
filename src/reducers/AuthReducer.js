import {
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL,
  LOGIN_USER,
  OTHER_LOGIN_USER,
  OTHER_LOGIN_USER_SIGN_UP,

  EMAIL_CHANGED,
  PASSWORD_CHANGED,
  PASSWORD_CONFIRM_CHANGED,
  FIRST_NAME_CHANGED,
  REFERRAL_CHANGED,
  SCHOOL_CHANGED,
  DEPARTMENT_CHANGED,

  REFERRAL_EMAIL_CHECK,
  GET_REFERRAL_MESSAGE
} from '../actions/types';

const INITIAL_STATE = {
  email: '',
  password: '',
  passwordConfirm: '',
  name: '',
  firstName: '',
  user: null,
  error: '',
  loading: false,
  referral: null,
  school: '',
  department: '',
  referralLoading: false,

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
      return { ...state, error: 'Authentication Failed', password: '', loading: false };

    case EMAIL_CHANGED:
      return { ...state, email: action.payload };
    case PASSWORD_CHANGED:
      return { ...state, password: action.payload };
    case PASSWORD_CONFIRM_CHANGED:
      return { ...state, passwordConfirm: action.payload };
    case FIRST_NAME_CHANGED:
      return { ...state, firstName: action.payload };
    case REFERRAL_CHANGED:
      return { ...state, referral: action.payload };
    case SCHOOL_CHANGED:
      return { ...state, school: action.payload };
    case DEPARTMENT_CHANGED:
      return { ...state, department: action.payload };
      
    case REFERRAL_EMAIL_CHECK:
     return { ...state, referralLoading: true };
    case GET_REFERRAL_MESSAGE:
      return { ...state, referralLoading: false };
    default:
      return state;
  }
};
