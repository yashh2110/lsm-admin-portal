import {ActionTypes} from '../actionTypes/ActionTypes';
import axios from 'axios';
const BASE_URL = process.env.REACT_APP_API + 'inventory/api/1/vendors';
export const allVendors = payload => {
  return {
    type: ActionTypes.GET_ALL_VENDOR,
    payload,
  };
};

export const getVendors = () => {
  return async dispatch => {
    await axios
      .get(BASE_URL)
      .then(res => {
        dispatch(allVendors(res.data));
      })
      .catch(err => {
        console.log(err);
      });
  };
};
