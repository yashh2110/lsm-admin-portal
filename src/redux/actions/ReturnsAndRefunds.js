import axios from 'axios';
import {ActionTypes} from '../actionTypes/ActionTypes';
const BASE_URL = process.env.REACT_APP_API + 'admin/v2';
export const setRefundsAndReturns = payload => {
  return {
    type: ActionTypes.GET_RETURNS_AND_REFUNDS,
    payload,
  };
};
export const addRefundsAndReturns = payload => {
  return {
    type: ActionTypes.ADD_RETURNS_AND_REFUNDS,
    payload,
  };
};
export const setReturnDate = payload => {
  return {
    type: ActionTypes.SET_REFUND_DATE,
    payload,
  };
};
export const setDenyState = payload => {
  return {
    type: ActionTypes.SET_DENY_STATE,
    payload,
  };
};

export const getReturnsAndRefunds = () => {
  let start = new Date();
  start.setHours(0, 0, 0, 0);
  let URL = BASE_URL + '/refund-returns/list';
  URL = URL + '?size=' + 20 + '&';
  URL =
    URL +
    'page=' +
    0 +
    '&refundDate=' +
    start.getTime() +
    '&denyState=' +
    'PARTIALLY_RETURNED';
  return async dispatch => {
    await axios
      .get(URL)
      .then(res => {
        dispatch(setRefundsAndReturns(res.data.details));
      })
      .catch(err => {
        console.log(err);
      });
  };
};
export const getFilterReturnsAndRefunds = ({date, denyState}) => {
  let start = new Date(date);
  start.setHours(0, 0, 0, 0);
  let URL = BASE_URL + '/refund-returns/list';
  URL = URL + '?size=' + 20 + '&';
  URL =
    URL +
    'page=' +
    0 +
    '&refundDate=' +
    start.getTime() +
    '&denyState=' +
    denyState;
  return async dispatch => {
    await axios
      .get(URL)
      .then(res => {
        dispatch(setRefundsAndReturns(res.data.details));
      })
      .catch(err => {
        console.log(err);
      });
  };
};
export const addReturnsAndRefunds = ({page, date, denyState}) => {
  let start = new Date(date);
  start.setHours(0, 0, 0, 0);
  let URL = BASE_URL + '/refund-returns/list';
  URL = URL + '?size=' + 20 + '&';
  URL =
    URL +
    'page=' +
    page +
    '&refundDate=' +
    start.getTime() +
    '&denyState=' +
    denyState;
  return async dispatch => {
    await axios
      .get(URL)
      .then(res => {
        dispatch(addRefundsAndReturns(res.data.details));
      })
      .catch(err => {
        console.log(err);
      });
  };
};
