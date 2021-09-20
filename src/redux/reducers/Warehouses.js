import {ActionTypes} from '../actionTypes/ActionTypes';

const initial = [];
const WarehouseReduser = (state = initial, {type, payload}) => {
  switch (type) {
    case ActionTypes.GET_ALL_WAREHOUSES:
      return payload;
    default:
      return state;
  }
};

export default WarehouseReduser;
