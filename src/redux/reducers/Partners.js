import {ActionTypes} from '../actionTypes/ActionTypes';

const initialState = [];

const PartnerReducer = (state = initialState, {type, payload}) => {
  switch (type) {
    case ActionTypes.GET_PARTNERS:
      return payload;
    case ActionTypes.ADD_PARTNERS:
      return [...state, ...payload];
    default:
      return state;
  }
};

export default PartnerReducer;
