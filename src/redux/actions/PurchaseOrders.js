import {ActionTypes} from '../actionTypes/ActionTypes';
import axios from 'axios';

const BASE_URL = process.env.REACT_APP_API + 'inventory/api/1/purchase-order?';

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
export const setPurchaseStateFilter = payload => {
  return {
    type: ActionTypes.PO_PURCHASESTATE_FILTER,
    payload,
  };
};
export const setPaymentStateFilter = payload => {
  return {
    type: ActionTypes.PO_PAYMENTSTATE_FILTER,
    payload,
  };
};
export const setPoStartDateFilter = payload => {
  return {
    type: ActionTypes.PO_STARTDATE_FILTER,
    payload,
  };
};
export const setPoEndDateFilter = payload => {
  return {
    type: ActionTypes.PO_ENDDATE_FILTER,
    payload,
  };
};
export const getPurchaseOrders = ({
  vendorId,
  purchaseState,
  paymentState,
  poStartDate,
  poEndDate,
}) => {
  let URL = BASE_URL;
  URL = URL + 'size=' + 25 + '&';
  URL = URL + 'page=' + 0 + '&';
  if (vendorId) URL = URL + 'vendorId=' + vendorId + '&';
  if (purchaseState) URL = URL + 'purchaseState=' + purchaseState + '&';
  if (paymentState) URL = URL + 'paymentState=' + paymentState + '&';
  if (poStartDate) URL = URL + 'poStartDate=' + poStartDate + '&';
  if (poEndDate) URL = URL + 'poEndDate=' + poEndDate;
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

export const getPurchaseOrdersByPage = ({
  page,
  vendorId,
  purchaseState,
  paymentState,
  poStartDate,
  poEndDate,
}) => {
  let URL = BASE_URL;
  URL = URL + 'size=' + 25 + '&';
  URL = URL + 'page=' + page + '&';
  if (vendorId) URL = URL + 'vendorId=' + vendorId + '&';
  if (purchaseState) URL = URL + 'purchaseState=' + purchaseState + '&';
  if (paymentState) URL = URL + 'paymentState=' + paymentState + '&';
  if (poStartDate) URL = URL + 'poStartDate=' + poStartDate + '&';
  if (poEndDate) URL = URL + 'poEndDate=' + poEndDate;
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
