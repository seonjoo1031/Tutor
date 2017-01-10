import {
  UPCOMING_LESSONS_GET_SUCCESS,
  UPCOMING_LESSONS_FETCH,
  UPDATE_CONFIRM_SUCCESS,
  UPDATE_CONFIRM,
  UNASSIGNED_LESSONS_FETCH,
  UNASSIGNED_LESSONS_GET_SUCCESS
} from '../actions/types';

const INITIAL_STATE = { upcomingLessons: [], unassignedLessons: [], timeNow: '', loading: false };

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UPCOMING_LESSONS_GET_SUCCESS:
      console.log('upcomingLessons get success');
      return { ...state, upcomingLessons: action.upcomingLessons, timeNow: action.timeNow, loading: false };
    case UPCOMING_LESSONS_FETCH:
      return { ...state, loading: true };
    case UPDATE_CONFIRM:
      return { ...state, loading: true };
    case UPDATE_CONFIRM_SUCCESS:
      console.log(action.upcomingLessons);
      return { ...state, upcomingLessons: action.upcomingLessons, unassignedLessons: action.unassignedLessons, loading: false };
    case UNASSIGNED_LESSONS_FETCH:
      return { ...state, loading: true };
    case UNASSIGNED_LESSONS_GET_SUCCESS:
      return { ...state, unassignedLessons: action.unassignedLessons, loading: false };
    default:
      return state;
  }
};
