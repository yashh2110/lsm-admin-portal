import {ActionTypes} from '../actionTypes/ActionTypes';
import axios from 'axios';
const BASE_URL = process.env.REACT_APP_API + 'inventory/api/1/purchase-order';

export const setInvoices = payload => {
  return {
    type: ActionTypes.SET_INVOICES,
    payload,
  };
};
export const getInvoices = id => {
  return async dispatch => {
    await axios
      .get(BASE_URL + `/${id}/invoices`)
      .then(res => {
        dispatch(setPurchaseOrders(res.data));
      })
      .catch(err => {
        console.log(err);
      });
  };
};
