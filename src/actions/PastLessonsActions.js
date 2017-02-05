import { PAST_LESSONS_GET_SUCCESS, PAST_LESSONS_FETCH } from './types';
import { urlForPostStudy } from '../components/common/ApiUrl';

export const pastLessonsFetch = (token, page) => {
  console.log('pastLessonsFetch..working');
  return (dispatch) => {
    dispatch({ type: PAST_LESSONS_FETCH });
    urlForPostStudy(token, page)
    .then((response) => response.json())
    .then(json => { console.log(json.response); getPastLessonsSuccess(dispatch, json.response); })
    .catch((error) => {
      console.log(error);
    });
  };
};

export const getPastLessonsSuccess = (dispatch, pastLessons) => {
  dispatch({
    type: PAST_LESSONS_GET_SUCCESS,
    payload: pastLessons,
    pastLessonsListings: pastLessons.listings
  });
};
