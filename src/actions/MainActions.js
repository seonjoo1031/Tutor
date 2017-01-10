import { COURSES_GET_WO_SUMMARY_SUCCESS, COURSES_FETCH } from './types';
import { get_courses_wo_summary } from '../components/common/ApiUrl';

export const coursesFetch = (email) => {
  return (dispatch) => {
    dispatch({ type: COURSES_FETCH });
    get_courses_wo_summary(email)
    .then((response) => response.json())
    .then(json => getCoursesWoSummarySuccess(dispatch, json.response.courses))
    .catch((error) => {
      console.log(error);
    });
  };
};

export const getCoursesWoSummarySuccess = (dispatch, courses) => {
  dispatch({
    type: COURSES_GET_WO_SUMMARY_SUCCESS,
    payload: courses
  });
};
