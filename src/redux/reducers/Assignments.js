import {ActionTypes} from '../actionTypes/ActionTypes';

const initial = {
  activeDes: [],
  orders: [],
  assignedOrders: [],
  zones: [],
  orderStateSummary: [],
  selectedOrders: [],
};
const AssignemenReducer = (state = initial, {type, payload}) => {
  switch (type) {
    case ActionTypes.GET_ACTIVE_DE:
      return {...state, activeDes: payload};
    case ActionTypes.GET_ZONES:
      return {...state, zones: payload};
    case ActionTypes.GET_ASSIGNED_ORDERS:
      return {...state, assignedOrders: payload};
    case ActionTypes.GET_ORDERS:
      return {...state, orders: payload};
    case ActionTypes.SET_SELECTED_ORDERS:
      return {...state, selectedOrders: [...state.selectedOrders, payload]};
    case ActionTypes.REPLACE_SELECTED_ORDERS:
      return {...state, selectedOrders: payload};
    case ActionTypes.GET_ORDER_STATE_SUMMARY:
      return {...state, orderStateSummary: payload};
    default:
      return state;
  }
};

export default AssignemenReducer;
