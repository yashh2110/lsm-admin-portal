import {ActionTypes} from '../actionTypes/ActionTypes';
import axios from 'axios';
const BASE_URL = process.env.REACT_APP_API + 'inventory/api/1/warehouses';

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
        dispatch(setWarehouses(res.data));
      })
      .catch(err => {
        console.log(err);
      });
  };
};
