import {
  UPDATE_APPLY,
  APPLY_SUCCESS
} from './types';

export const updateApply = (appliedArray, token) => {
  return (dispatch) => {
    dispatch({ type: UPDATE_APPLY });
    console.log(appliedArray);
    console.log(token);
  };
};

export const applySuccess = (dispatch, response) => {
  dispatch({
    type: APPLY_SUCCESS,
    updatedApply: response.array
  });
};
