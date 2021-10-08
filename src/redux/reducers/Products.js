import {ActionTypes} from '../actionTypes/ActionTypes';

const initialState = {
  catogories: [],
  products: [],
  filters: {name: '', category: '', active: ''},
  lsproducts: [],
};

const ProductReducer = (state = initialState, {type, payload}) => {
  switch (type) {
    case ActionTypes.GET_ALL_PRODUCTS:
      return {...state, products: payload};
    case ActionTypes.ADD_PRODUCTS:
      return {...state, products: [...state.products, ...payload]};
    case ActionTypes.GET_ALL_CATEGORIES:
      return {...state, catogories: payload};
    case ActionTypes.GET_LOW_STOCK:
      return {...state, lsproducts: [...state.lsproducts, ...payload]};
    case ActionTypes.GET_ALL_LOW_STOCK:
      return {...state, lsproducts: payload};
    case ActionTypes.PRODUCT_NAME_FILTER:
      return {...state, filters: {...state.filters, name: payload}};
    case ActionTypes.PRODUCT_CATEGORY_FILTER:
      return {...state, filters: {...state.filters, category: payload}};
    case ActionTypes.PRODUCT_ACTIVE_FILTER:
      return {...state, filters: {...state.filters, active: payload}};
    default:
      return state;
  }
};
export default ProductReducer;
