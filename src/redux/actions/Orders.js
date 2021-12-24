import axios from 'axios';
import {ActionTypes} from '../actionTypes/ActionTypes';
const BASE_URL = process.env.REACT_APP_API + 'admin/v2';
export const setOrders = payload => {
  return {
    type: ActionTypes.GET_ALL_ORDERS,
    payload,
  };
};
export const addOrders = payload => {
  return {
    type: ActionTypes.ADD_ALL_ORDERS,
    payload,
  };
};
export const setAssignedTo = payload => {
  return {
    type: ActionTypes.SET_ASSIGNED_TO,
    payload,
  };
};
export const setDeliveryDate = payload => {
  return {
    type: ActionTypes.SET_DELEVERY_DATE,
    payload,
  };
};
export const setCustomerId = payload => {
  return {
    type: ActionTypes.SET_CUSTOMER_ID,
    payload,
  };
};
export const setDeliveryBy = payload => {
  return {
    type: ActionTypes.SET_DELIVERY_BY,
    payload,
  };
};
export const setDeliveryState = payload => {
  return {
    type: ActionTypes.SET_DELEVERY_STATE,
    payload,
  };
};
export const setOrderId = payload => {
  return {
    type: ActionTypes.SET_ORDER_ID,
    payload,
  };
};
export const setSlotId = payload => {
  return {
    type: ActionTypes.SET_SLOT_ID,
    payload,
  };
};
export const getAllOrders = ({
  assignedTo,
  customerId,
  deliveredBy,
  deliveryDate,
  deliveryState,
  orderId,
  slotId,
}) => {
  let URL = BASE_URL + '/orders/list?';
  URL += `page=0&`;
  URL += `size=15&`;
  if (assignedTo) URL += `assignedTo=${assignedTo}&`;
  if (customerId) URL += `customerId=${customerId}&`;
  if (deliveredBy) URL += `deliveredBy=${deliveredBy}&`;
  if (deliveryDate) URL += `deliveryDate=${deliveryDate}&`;
  if (deliveryState) URL += `deliveryState=${deliveryState}&`;
  if (slotId) URL += `slotId=${slotId}&`;
  if (orderId) URL += `orderId=${orderId}`;

  return async dispatch => {
    await axios
      .get(URL)
      .then(res => {
        dispatch(setOrders(res.data));
        console.log(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  };
};
export const getOrdersByPage = ({
  assignedTo,
  customerId,
  deliveredBy,
  deliveryDate,
  deliveryState,
  orderId,
  slotId,
  page,
}) => {
  let URL = BASE_URL + '/orders/list?';
  URL += `page=${page}&`;
  URL += `size=15&`;
  if (assignedTo) URL += `assignedTo=${assignedTo}&`;
  if (customerId) URL += `customerId=${customerId}&`;
  if (deliveredBy) URL += `deliveredBy=${deliveredBy}&`;
  if (deliveryDate) URL += `deliveryDate=${deliveryDate}&`;
  if (deliveryState) URL += `deliveryState=${deliveryState}&`;
  if (slotId) URL += `slotId=${slotId}&`;
  if (orderId) URL += `orderId=${orderId}`;

  return async dispatch => {
    await axios
      .get(URL)
      .then(res => {
        dispatch(addOrders(res.data));
        console.log(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  };
};
