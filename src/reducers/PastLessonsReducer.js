import {
  PAST_LESSONS_GET_SUCCESS,
  PAST_LESSONS_FETCH
} from '../actions/types';

const INITIAL_STATE = { pastLessons: [], pastLessonsListings: [], loading: false };

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case PAST_LESSONS_GET_SUCCESS:
      console.log('pastLessons get success');
      return { ...state, pastLessons: action.payload, pastLessonsListings: action.pastLessonsListings, loading: false };
    case PAST_LESSONS_FETCH:
      return { ...state, loading: true };
    default:
      return state;
  }
};
