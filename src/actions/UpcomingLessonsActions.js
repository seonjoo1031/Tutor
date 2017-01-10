import {
  UPCOMING_LESSONS_GET_SUCCESS, UPCOMING_LESSONS_FETCH,
  UPDATE_CONFIRM, UPDATE_CONFIRM_SUCCESS,
  UNASSIGNED_LESSONS_FETCH, UNASSIGNED_LESSONS_GET_SUCCESS
} from './types';
import { urlForPreStudy, urlForUpdateConfirm, urlForUnassignedLessons } from '../components/common/ApiUrl';

export const unAssignedLessonsFetch = (email) => {
  console.log('unassigned lessons fetch...');
  return (dispatch) => {
    dispatch({ type: UNASSIGNED_LESSONS_FETCH });
    urlForUnassignedLessons(email)
    .then((response) => response.json())
    .then(json => getUnassignedLessonsSuccess(dispatch, json.response))
    .catch((error) => {
      console.log(error);
    });
  };
};

export const getUnassignedLessonsSuccess = (dispatch, response) => {
  console.log('getUnassignedLessonsSuccess');
  dispatch({
    type: UNASSIGNED_LESSONS_GET_SUCCESS,
    unassignedLessons: response.unassigned_lessons_listings
  });
};

export const upcomingLessonsFetch = (email) => {
  console.log('upcomingLessonsFetch..working');
  return (dispatch) => {
    dispatch({ type: UPCOMING_LESSONS_FETCH });
    urlForPreStudy(email)
    .then((response) => response.json())
    .then(json => getUpcomingLessonsSuccess(dispatch, json.response))
    .catch((error) => {
      console.log(error);
    });
  };
};

export const getUpcomingLessonsSuccess = (dispatch, response) => {
  console.log(response);
  dispatch({
    type: UPCOMING_LESSONS_GET_SUCCESS,
    upcomingLessons: response.listings,
    timeNow: response.time_now_short_formatted
  });
};

export const updateConfirm = (lesson_id, tutor_id, tutor_confirmed) => {
  return (dispatch) => {
    dispatch({ type: UPDATE_CONFIRM });
    fetch(urlForUpdateConfirm(), {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        lesson_id: lesson_id,
        tutor_id: tutor_id,
        tutor_confirmed: tutor_confirmed
      })
    })
    .then((response) => response.json())
    .then(json => updateSuccess(dispatch, json.response))
    .catch((error) => {
      console.log(error);
    });
  };
};

export const updateSuccess = (dispatch, response) => {
  console.log('update confirm');
  console.log(response.listings);
  dispatch({
    type: UPDATE_CONFIRM_SUCCESS,
    upcomingLessons: response.listings,
    unassignedLessons: response.unassigned_lessons_listings
  });
};
