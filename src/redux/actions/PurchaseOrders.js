import {ActionTypes} from '../actionTypes/ActionTypes';
import axios from 'axios';
const BASE_URL = 'https://test-api.zasket.in/inventory/api/1/purchase-order';

export const setPurchaseOrders = payload => {
  return {
    type: ActionTypes.GET_ALL_PURCHASEORDERS,
    payload,
  };
};

export const getPurchaseOrders = () => {
  return async dispatch => {
    await axios
      .get(BASE_URL)
      .then(res => {
        dispatch(setPurchaseOrders(res.data));
      })
      .catch(err => {
        console.log(err);
      });
  };
};
