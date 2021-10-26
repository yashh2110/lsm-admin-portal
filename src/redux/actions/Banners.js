import axios from 'axios';
import {ActionTypes} from '../actionTypes/ActionTypes';
const URL_BASE = process.env.REACT_APP_API + 'inventory/api/1/banners';
export const setBanners = payload => {
  return {
    type: ActionTypes.GET_BANNERS,
    payload,
  };
};

export const getBanners = () => {
  return async dispatch => {
    await axios
      .get(URL_BASE + '/list?size=1000', {
        headers: {
          'inventory-user-id': 1,
          'session-id': 1,
        },
      })
      .then(res => {
        console.log(res.data);
        dispatch(setBanners(res.data.banners));
      })
      .catch(err => {
        console.log(err);
      });
  };
};
