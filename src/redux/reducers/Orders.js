import {ActionTypes} from '../actionTypes/ActionTypes';

const initial = {
  orders: [],
  assignedTo: '',
  customerId: '',
  deliveredBy: '',
  deliveryDate: '',
  deliveryState: '',
  orderId: '',
  slotId: '',
};

const OrdersReducer = (state = initial, {type, payload}) => {
  switch (type) {
    case ActionTypes.GET_ALL_ORDERS:
      return {...state, orders: payload};
    case ActionTypes.ADD_ALL_ORDERS:
      return {...state, orders: [...state.orders, ...payload]};
    case ActionTypes.SET_ASSIGNED_TO:
      return {...state, assignedTo: payload};
    case ActionTypes.SET_CUSTOMER_ID:
      return {...state, customerId: payload};
    case ActionTypes.SET_DELIVERY_BY:
      return {...state, deliveredBy: payload};
    case ActionTypes.SET_DELEVERY_STATE:
      return {...state, deliveryState: payload};
    case ActionTypes.SET_DELEVERY_DATE:
      return {...state, deliveryDate: payload};
    case ActionTypes.SET_ORDER_ID:
      return {...state, orderId: payload};
    case ActionTypes.SET_SLOT_ID:
      return {...state, slotId: payload};
    default:
      return state;
  }
};
export default OrdersReducer;
