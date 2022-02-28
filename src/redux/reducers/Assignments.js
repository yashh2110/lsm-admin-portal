import {ActionTypes} from '../actionTypes/ActionTypes';

const initial = {
  activeDes: [],
  orders: [],
  assignedOrders: [],
  zones: [],
  orderStateSummary: [],
  selectedOrders: [],
  markerInfo: null,
  dateandslot: {
    date: '',
    slots: [1, 2, 3, 4],
    all: true,
    slotstr: '',
    ordered_after: '0',
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
      if (state.selectedOrders?.some(i => i === payload)) {
        return state;
      }
      return {...state, selectedOrders: [payload, ...state.selectedOrders]};
    case ActionTypes.REPLACE_SELECTED_ORDERS:
      return {...state, selectedOrders: payload};
    case ActionTypes.GET_ORDER_STATE_SUMMARY:
      return {...state, orderStateSummary: payload};
    case ActionTypes.SET_ASSIGNMENT_DATE:
      return {...state, dateandslot: {...state.dateandslot, date: payload}};
    case ActionTypes.SET_ASSINGMENT_SLOT:
      return {...state, dateandslot: {...state.dateandslot, slots: payload}};
    case ActionTypes.SET_ORDERED_AFTER:
      return {
        ...state,
        dateandslot: {...state.dateandslot, ordered_after: payload},
      };
    case ActionTypes.SET_MARKER_INFO:
      return {...state, markerInfo: payload};
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
