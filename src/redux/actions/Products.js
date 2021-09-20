import {ActionTypes} from '../actionTypes/ActionTypes';
import axios from 'axios';
export const allProducts = payload => {
  return {
    type: ActionTypes.GET_ALL_VENDOR,
    payload,
  };
};

export const getProducts = () => {
  return async dispatch => {
    await axios
      .get('https://test-api.zasket.in/items')
      .then(res => {
        dispatch(allProducts(res.data));
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });
  };
};
