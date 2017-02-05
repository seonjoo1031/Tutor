import {
  COMPENSATION_FETCH,
  GET_COMPENSATION_SUCCESS
} from '../actions/types';

const INITIAL_STATE = { compensation: [], compensationListings: [], loading: false };

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_COMPENSATION_SUCCESS:
      return { ...state, compensation: action.payload, compensationListings: action.compensationListings, loading: false };
    case COMPENSATION_FETCH:
      return { ...state, loading: true };
    default:
      return state;
  }
};
