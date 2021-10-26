import {ActionTypes} from '../actionTypes/ActionTypes';
import axios from 'axios';

const BASE_URL = process.env.REACT_APP_API + 'inventory/api/1/purchase-order';

export const setPurchaseOrders = payload => {
  return {
    type: ActionTypes.GET_ALL_PURCHASEORDERS,
    payload,
  };
};
export const addPurchaseOrders = payload => {
  return {
    type: ActionTypes.ADD_PURCHASEORDERS,
    payload,
  };
};
export const setVendorFilter = payload => {
  return {
    type: ActionTypes.PO_VENDORID_FILTER,
    payload,
  };
};
export const getPurchaseOrders = id => {
  let URL = BASE_URL;
  URL = URL + '?size=' + 25 + '&';
  URL = URL + 'page=' + 0 + '&';
  if (id) URL = URL + 'vendorId=' + id + '&';
  return async dispatch => {
    await axios
      .get(URL)
      .then(res => {
        dispatch(setPurchaseOrders(res.data));
      })
      .catch(err => {
        console.log(err);
      });
  };
};

export const getPurchaseOrdersByPage = ({id, page}) => {
  let URL = BASE_URL;
  URL = URL + '?size=' + 25 + '&';
  URL = URL + 'page=' + page + '&';
  if (id) URL = URL + 'vendorId=' + id + '&';
  return async dispatch => {
    await axios
      .get(URL)
      .then(res => {
        dispatch(addPurchaseOrders(res.data));
      })
      .catch(err => {
        console.log(err);
      });
  };
};
