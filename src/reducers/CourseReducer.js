import {
  COURSES_GET_WO_SUMMARY_SUCCESS, COURSES_FETCH
} from '../actions/types';

const INITIAL_STATE = { courses: [], loading: false };

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case COURSES_GET_WO_SUMMARY_SUCCESS:
      console.log('courses get wo summary sucess');
      return { ...state, courses: action.payload, loading: false };
    case COURSES_FETCH:
      return { ...state, loading: true };
    default:
      return state;
  }
};
