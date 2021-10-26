import {ActionTypes} from '../actionTypes/ActionTypes';

const initial = [];
const ZoneReducer = (state = initial, {type, payload}) => {
  switch (type) {
    case ActionTypes.GET_ALL_ZONES:
      return payload;
    default:
      return state;
  }
};

export default ZoneReducer;
