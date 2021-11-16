import {ActionTypes} from '../actionTypes/ActionTypes';

const initialState = {returnsandrefunds: [], date: '', denyStatus: ''};

const ReturnsAndRefundsReducer = (state = initialState, {type, payload}) => {
  switch (type) {
    case ActionTypes.GET_RETURNS_AND_REFUNDS:
      return {...state, returnsandrefunds: payload};
    case ActionTypes.ADD_RETURNS_AND_REFUNDS:
      return {
        ...state,
        returnsandrefunds: [...state.returnsandrefunds, ...payload],
      };
    case ActionTypes.SET_REFUND_DATE:
      return {...state, date: payload};
    case ActionTypes.SET_DENY_STATE:
      return {...state, denyStatus: payload};
    default:
      return state;
  }
};

export default ReturnsAndRefundsReducer;
