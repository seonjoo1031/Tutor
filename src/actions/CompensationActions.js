import {
  COMPENSATION_FETCH,
  GET_COMPENSATION_SUCCESS
} from './types';

import { urlForCompensation } from '../components/common/ApiUrl';

// export const compensationFetch = (token, year, week) => {
//   return (dispatch) => {
//     dispatch({ type: COMPENSATION_FETCH });
//     urlForCompensation(token, year, week)
//     .then(console.log('done'))
//     .catch((error) => {
//       console.log(error);
//     });
//   };
// };

export const compensationFirstFetch = (token) => {
  return (dispatch) => {
    dispatch({ type: COMPENSATION_FETCH });
    urlForCompensation(token)
    .then((response) => response.json())
    .then(json => {
      console.log(json.response);

      urlForCompensation(token, json.response.current_year, json.response.current_week)
      .then((response) => response.json())
      .then(json => {
        console.log(json.response);
        getCompensationSuccess(dispatch, json.response);
      })
    })
    .catch((error) => {
      console.log(error);
    });
  };
};

export const compensationFetch = (token, year, week) => {
  return (dispatch) => {
    dispatch({ type: COMPENSATION_FETCH });
    urlForCompensation(token, year, week)
    .then((response) => response.json())
    .then(json => {
      getCompensationSuccess(dispatch, json.response);
    })
    .catch((error) => {
      console.log(error);
    });
  };
};

export const getCompensationSuccess = (dispatch, response) => {
  dispatch({
    type: GET_COMPENSATION_SUCCESS,
    payload: response,
    compensationListings: response.lessons
  });
};
