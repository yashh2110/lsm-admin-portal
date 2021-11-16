import {ActionTypes} from '../actionTypes/ActionTypes';
import axios from 'axios';
const BASE_URL = process.env.REACT_APP_API + 'admin/v2/zones';

export const setZones = payload => {
  return {
    type: ActionTypes.GET_ALL_ZONES,
    payload,
  };
};

export const getZones = () => {
  return async dispatch => {
    await axios
      .get(BASE_URL + '/activeList?city_id=1')
      .then(res => {
        dispatch(setZones(res.data));
      })
      .catch(err => {
        console.log(err);
      });
  };
};
