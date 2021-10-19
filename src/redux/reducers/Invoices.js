import {ActionTypes} from '../actionTypes/ActionTypes';

const initial = [];
const InvoiceReducer = (state = initial, {type, payload}) => {
  switch (type) {
    case ActionTypes.SET_INVOICES:
      return payload;
    default:
      return state;
  }
};

export default InvoiceReducer;
