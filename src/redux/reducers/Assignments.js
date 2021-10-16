import {ActionTypes} from '../actionTypes/ActionTypes';

const initial = {
  activeDes: [],
  orders: [],
  assignedOrders: [],
  zones: [],
  orderStateSummary: [],
  selectedOrders: [],
  dateandslot: {
    date: '',
    slots: {
      1: false,
      2: false,
      3: false,
      4: false,
    },
    all: true,
    slotstr: '',
  },
  isfetching: false,
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
    case ActionTypes.SET_ASSIGNMENT_DATE:
      return {...state, dateandslot: {...state.dateandslot, date: payload}};
    case ActionTypes.SET_ASSINGMENT_SLOT:
      return {...state, dateandslot: {...state.dateandslot, slots: payload}};
    case ActionTypes.SET_ALL_SLOTS:
      return {...state, dateandslot: {...state.dateandslot, all: payload}};
    case ActionTypes.SET_ASSIGNMENT_SLOT_STR:
      return {...state, dateandslot: {...state.dateandslot, slotstr: payload}};
    case ActionTypes.IS_FETCHING_ASSIGNMENT:
      return {...state, isfetching: payload};
    default:
      return state;
  }
};

export default AssignemenReducer;
