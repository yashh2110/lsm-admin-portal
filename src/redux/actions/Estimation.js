import {ActionTypes} from '../actionTypes/ActionTypes';
import axios from 'axios';
const BASE_URL = process.env.REACT_APP_API + 'admin/v2/estimations';

export const setEstimations = payload => {
  return {
    type: ActionTypes.GET_ESTIMATIONS,
    payload,
  };
};
export const setEstimationCategory = payload => {
  return {
    type: ActionTypes.SET_ESTIMATION_CATEGORY,
    payload,
  };
};
export const setEstimationStartDate = payload => {
  return {
    type: ActionTypes.SET_ESTIMATION_START_DATE,
    payload,
  };
};
export const setEstimationEndDate = payload => {
  return {
    type: ActionTypes.SET_ESTIMATION_END_DATE,
    payload,
  };
};
export const setEstimationSlot = payload => {
  return {
    type: ActionTypes.SET_ESTIMATION_SLOT,
    payload,
  };
};
export const getEstimations = ({category, startDate, endDate, slotId}) => {
  let URL = BASE_URL + `/list?`;
  if (category) URL = URL + `category=${category}&`;
  if (startDate) URL = URL + `deliveryStartDate=${startDate}&`;
  if (endDate) URL = URL + `deliveryEndDate=${endDate}&`;
  if (slotId) URL = URL + `slotIds=${slotId}`;

  return async dispatch => {
    await axios
      .get(URL)
      .then(res => {
        dispatch(setEstimations(res.data));
      })
      .catch(err => {
        console.log(err);
      });
  };
};
