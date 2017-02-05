import {
  UPDATE_APPLY,
  UPDATE_APPLY_SUCCESS,
  APPLY_FETCH,
  GET_APPLY_SUCCESS
} from './types';

import { urlForUpdateApply, urlForApply } from '../components/common/ApiUrl';

export const applyFetch = (email) => {
  return (dispatch) => {
    dispatch({ type: APPLY_FETCH });
    urlForApply(email)
    .then((response) => response.json())
    .then(json => getApplySuccess(dispatch, json.response))
    .catch((error) => {
      console.log(error);
    });
  };
};

export const getApplySuccess = (dispatch, response) => {
  dispatch({
    type: GET_APPLY_SUCCESS,
    weekPanel: response.week_panel
  });
};

export const updateApply = (applyObj, token) => {
  return (dispatch) => {
    dispatch({ type: UPDATE_APPLY });
    console.log(applyObj);
    console.log(token);
    fetch(urlForUpdateApply(), {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        token: token,
        apply_objs: applyObj
      })
    })
    .then((response) => response.json())
    .then(json => updateApplySuccess(dispatch, json.response))
    .catch((error) => {
      console.log(error);
    });
  };
};

export const updateApplySuccess = (dispatch, response) => {
  // console.log('update apply', response);
  dispatch({
    type: UPDATE_APPLY_SUCCESS,
    weekPanel: response.week_panel
  });
};
