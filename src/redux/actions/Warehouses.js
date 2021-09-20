import {ActionTypes} from '../actionTypes/ActionTypes';
import axios from 'axios';
const BASE_URL = 'https://test-api.zasket.in/customer/warehouses';

export const setWarehouses = payload => {
  return {
    type: ActionTypes.GET_ALL_WAREHOUSES,
    payload,
  };
};

export const getWarehouses = () => {
  return async dispatch => {
    await axios
      .get(BASE_URL)
      .then(res => {
        console.log(res);
        dispatch(setWarehouses(res.data));
      })
      .catch(err => {
        console.log(err);
      });
  };
};
