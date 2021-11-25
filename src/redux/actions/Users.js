import {ActionTypes} from '../actionTypes/ActionTypes';

export const setUser = payload => {
  return {
    type: ActionTypes.GET_USER_DETAILS,
    payload,
  };
};
