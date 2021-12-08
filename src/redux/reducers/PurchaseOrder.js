import {ActionTypes} from '../actionTypes/ActionTypes';

const initial = {
  orders: [],
  vendorId: '',
  purchaseState: '',
  paymentState: '',
  poStartDate: '',
  poEndDate: '',
};
const PurchaseReduser = (state = initial, {type, payload}) => {
  switch (type) {
    case ActionTypes.GET_ALL_PURCHASEORDERS:
      return {...state, orders: payload};
    case ActionTypes.ADD_PURCHASEORDERS:
      return {...state, orders: [...state.orders, ...payload]};
    case ActionTypes.PO_VENDORID_FILTER:
      return {...state, vendorId: payload};
    case ActionTypes.PO_PURCHASESTATE_FILTER:
      return {...state, purchaseState: payload};
    case ActionTypes.PO_PAYMENTSTATE_FILTER:
      return {...state, paymentState: payload};
    case ActionTypes.PO_STARTDATE_FILTER:
      return {...state, poStartDate: payload};
    case ActionTypes.PO_ENDDATE_FILTER:
      return {...state, poEndDate: payload};
    default:
      return state;
  }
};

export default PurchaseReduser;
