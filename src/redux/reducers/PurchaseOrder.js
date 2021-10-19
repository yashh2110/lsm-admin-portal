import {ActionTypes} from '../actionTypes/ActionTypes';

const initial = {orders: [], vendorid: ''};
const PurchaseReduser = (state = initial, {type, payload}) => {
  switch (type) {
    case ActionTypes.GET_ALL_PURCHASEORDERS:
      return {...state, orders: payload};
    case ActionTypes.ADD_PURCHASEORDERS:
      return {...state, orders: [...state.orders, ...payload]};
    case ActionTypes.PO_VENDORID_FILTER:
      return {...state, vendorid: payload};
    default:
      return state;
  }
};

export default PurchaseReduser;
