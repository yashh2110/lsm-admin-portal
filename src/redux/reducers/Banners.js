import {ActionTypes} from '../actionTypes/ActionTypes';

const initial = [];

const BannerReducer = (state = initial, {type, payload}) => {
  switch (type) {
    case ActionTypes.GET_BANNERS:
      return payload;
    default:
      return state;
  }
};
export default BannerReducer;
