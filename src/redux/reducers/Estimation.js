import {ActionTypes} from '../actionTypes/ActionTypes';

const initial = {
  estimations: [],
  category: '',
  startDate: '',
  endDate: '',
  slotId: '',
};

const EstimationReducer = (state = initial, {type, payload}) => {
  switch (type) {
    case ActionTypes.GET_ESTIMATIONS:
      return {...state, estimations: payload};
    case ActionTypes.SET_ESTIMATION_CATEGORY:
      return {...state, category: payload};
    case ActionTypes.SET_ESTIMATION_START_DATE:
      return {...state, startDate: payload};
    case ActionTypes.SET_ESTIMATION_END_DATE:
      return {...state, endDate: payload};
    case ActionTypes.SET_ESTIMATION_SLOT:
      return {...state, slotId: payload};
    default:
      return state;
  }
};
export default EstimationReducer;
