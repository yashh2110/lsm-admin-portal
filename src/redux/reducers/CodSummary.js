import {ActionTypes} from '../actionTypes/ActionTypes';

const initial = {codSummary: [], codDate: ''};

const CodReducer = (state = initial, {type, payload}) => {
  switch (type) {
    case ActionTypes.GET_COD_SUMMARY:
      return {...state, codSummary: payload};
    case ActionTypes.SET_COD_DATE:
      return {...state, codDate: payload};
    default:
      return state;
  }
};
export default CodReducer;
