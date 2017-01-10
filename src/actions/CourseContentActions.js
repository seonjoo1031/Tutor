import { DETAIL_COURSE_GET_SUCCESS, DETAIL_COURSE_FETCH } from './types';
import { urlForCourseDetail } from '../components/common/ApiUrl';

export const detailCourseFetch = (course_id) => {
  return (dispatch) => {
    dispatch({ type: DETAIL_COURSE_FETCH });
    urlForCourseDetail(course_id)
    .then((response) => response.json())
    .then(json => getDetailCoursesSuccess(dispatch, json.response))
    .catch((error) => {
      console.log(error);
    });
  };
};

export const getDetailCoursesSuccess = (dispatch, detailCourse) => {
  dispatch({
    type: DETAIL_COURSE_GET_SUCCESS,
    payload: detailCourse
  });
};
