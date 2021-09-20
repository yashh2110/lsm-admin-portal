import {ActionTypes} from '../actionTypes/ActionTypes';

const initial = [];
const PurchaseReduser = (state = initial, {type, payload}) => {
  switch (type) {
    case ActionTypes.GET_ALL_PURCHASEORDERS:
      return payload;
    default:
      return state;
  }
};

export default PurchaseReduser;
