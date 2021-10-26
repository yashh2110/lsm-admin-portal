import {ActionTypes} from '../actionTypes/ActionTypes';

const initial = {customers: [], customerfilter: ''};
const CustomersReducer = (state = initial, {type, payload}) => {
  switch (type) {
    case ActionTypes.GET_ALL_CUSTOMERS:
      return {...state, customers: payload};
    case ActionTypes.ADD_CUSTOMERS:
      return {...state, customers: [...state.customers, ...payload]};
    case ActionTypes.CUSTOMER_FILTER:
      return {...state, customerfilter: payload};
    default:
      return state;
  }
};

export default CustomersReducer;
