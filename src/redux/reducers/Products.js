import {ActionTypes} from '../actionTypes/ActionTypes';

const initialState = [];

const ProductReducer = (state = initialState, {type, payload}) => {
  switch (type) {
    case ActionTypes.GET_ALL_PRODUCTS:
      return payload;
    default:
      return state;
  }
};
export default ProductReducer;
