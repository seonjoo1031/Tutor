import {
  DETAIL_COURSE_GET_SUCCESS,
  DETAIL_COURSE_FETCH
} from '../actions/types';

const INITIAL_STATE = { detailCourse: [], loading: false };

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case DETAIL_COURSE_GET_SUCCESS:
      console.log('detail course get success');
      return { ...state, detailCourse: action.payload, loading: false };
    case DETAIL_COURSE_FETCH:
      return { ...state, loading: true };
    default:
      return state;
  }
};
