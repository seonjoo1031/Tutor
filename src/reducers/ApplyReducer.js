import {
  UPDATE_APPLY,
  APPLY_SUCCESS
} from '../actions/types';

const INITIAL_STATE = { updatedApply: [], loading: false };

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {

    case UPDATE_APPLY:
      return { ...state, loading: true };
    case APPLY_SUCCESS:
      return { ...state, updatedApply: action.updatedApply, loading: false };
    default:
      return state;
  }
};
