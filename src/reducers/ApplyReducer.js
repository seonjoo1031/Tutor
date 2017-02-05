import {
  UPDATE_APPLY,
  UPDATE_APPLY_SUCCESS,
  APPLY_FETCH,
  GET_APPLY_SUCCESS
} from '../actions/types';

const INITIAL_STATE = { weekPanel: [], updatedApply: [], loading: false };

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_APPLY_SUCCESS:
      console.log('apply action', action.weekPanel);
      return { ...state, weekPanel: action.weekPanel, loading: false };

    case UPDATE_APPLY_SUCCESS:
      return { ...state, weekPanel: action.weekPanel, loading: false };

    case UPDATE_APPLY:
      return { ...state, loading: true };

    case APPLY_FETCH:
      return { ...state, loading: true };

    default:
      return state;
  }
};
