import axios from 'axios';
import {ActionTypes} from '../actionTypes/ActionTypes';
const BASE_URL = process.env.REACT_APP_API + 'admin/v2/cod-summary';
export const setCodSummary = payload => {
  return {
    type: ActionTypes.GET_COD_SUMMARY,
    payload,
  };
};
export const setCodDate = payload => {
  return {
    type: ActionTypes.SET_COD_DATE,
    payload,
  };
};
export const getCodSummary = date => {
  return async dispatch => {
    let start, end;
    if (date) {
      start = new Date(date);
      end = new Date(date);
    } else {
      start = new Date();
      end = new Date();
    }
    start.setHours(0, 0, 0, 0);
    end.setHours(23, 59, 59, 999);
    await axios
      .get(
        BASE_URL + `?startEpoch=${start.getTime()}&endEpoch=${end.getTime()}`,
      )
      .then(res => {
        dispatch(setCodSummary(res.data.summaries));
      })
      .catch(err => {
        console.log(err);
      });
  };
};
