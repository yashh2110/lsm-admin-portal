import axios from 'axios';
import {ActionTypes} from '../actionTypes/ActionTypes';
const BASE_URL = process.env.REACT_APP_API + 'inventory/api/1/customers';
export const setCustomers = payload => {
  return {
    type: ActionTypes.GET_ALL_CUSTOMERS,
    payload,
  };
};
export const addCustomers = payload => {
  return {
    type: ActionTypes.ADD_CUSTOMERS,
    payload,
  };
};
export const setCustomerFilter = payload => {
  return {
    type: ActionTypes.CUSTOMER_FILTER,
    payload,
  };
};
export const getCustomers = name => {
  let URL = BASE_URL + '/list';
  URL = URL + '?size=' + 25 + '&';
  URL = URL + 'page=' + 0 + '&';
  if (name) URL = URL + 'customersLike=' + name;
  return async dispatch => {
    await axios
      .get(URL, {
        headers: {'inventory-user-id': 1, 'session-id': 1},
      })
      .then(res => {
        dispatch(setCustomers(res.data.customers));
      })
      .catch(err => {
        console.log(err);
      });
  };
};

export const getCustomersByPage = ({name, page}) => {
  let URL = BASE_URL + '/list';
  URL = URL + '?size=' + 25 + '&';
  URL = URL + 'page=' + page + '&';
  if (name) URL = URL + 'customersLike=' + name;
  return async dispatch => {
    await axios
      .get(URL, {
        headers: {'inventory-user-id': 1, 'session-id': 1},
      })
      .then(res => {
        dispatch(addCustomers(res.data.customers));
      })
      .catch(err => {
        console.log(err);
      });
  };
};
