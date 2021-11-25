import {ActionTypes} from '../actionTypes/ActionTypes';

const initial = {isLogged: false};
const UserReducer = (state = initial, {type, payload}) => {
  switch (type) {
    case ActionTypes.GET_USER_DETAILS:
      return payload;
    default:
      return state;
  }
};
export default UserReducer;
