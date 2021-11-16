import {ActionTypes} from '../actionTypes/ActionTypes';
import axios from 'axios';
const BASE_URL = process.env.REACT_APP_API + 'admin/v2/';

export const setPartners = payload => {
  return {
    type: ActionTypes.GET_PARTNERS,
    payload,
  };
};
export const newPartners = payload => {
  return {
    type: ActionTypes.ADD_PARTNERS,
    payload,
  };
};
export const getPartners = () => {
  let URL = BASE_URL + 'partners/list';
  URL = URL + '?count=' + 20 + '&';
  URL = URL + 'page=' + 0;
  return async dispatch => {
    await axios
      .get(URL)
      .then(res => {
        dispatch(setPartners(res.data));
      })
      .catch(err => {
        console.log(err);
      });
  };
};

export const addParnters = ({page}) => {
  let URL = BASE_URL + 'partners/list';

  URL = URL + '?count=' + 20 + '&';
  URL = URL + 'page=' + page;

  return async dispatch => {
    await axios
      .get(URL)
      .then(res => {
        dispatch(newPartners(res.data));
      })
      .catch(err => {
        console.log(err);
      });
  };
};
