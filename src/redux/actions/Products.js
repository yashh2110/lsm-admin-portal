import {ActionTypes} from '../actionTypes/ActionTypes';
import axios from 'axios';

export const allProducts = payload => {
  return {
    type: ActionTypes.GET_ALL_PRODUCTS,
    payload,
  };
};
export const allCategories = payload => {
  return {
    type: ActionTypes.GET_ALL_CATEGORIES,
    payload,
  };
};
export const newProducts = payload => {
  return {
    type: ActionTypes.ADD_PRODUCTS,
    payload,
  };
};
export const productNameFilter = payload => {
  return {
    type: ActionTypes.PRODUCT_NAME_FILTER,
    payload,
  };
};
export const productCatergoryFilter = payload => {
  return {
    type: ActionTypes.PRODUCT_CATEGORY_FILTER,
    payload,
  };
};
export const productActiveFilter = payload => {
  return {
    type: ActionTypes.PRODUCT_ACTIVE_FILTER,
    payload,
  };
};
export const getProducts = ({name, category, active}) => {
  let URL = 'https://test-api.zasket.in/api/v1/inventory/products/list';
  URL = URL + '?productsNameLike=' + name + '&';
  URL = URL + 'size=' + 15 + '&';
  URL = URL + 'page=' + 0 + '&';
  URL = URL + 'categoryId=' + category + '&';
  if (active) URL = URL + 'isActive=' + active;
  return async dispatch => {
    await axios
      .get(URL, {
        headers: {
          'inventory-user-id': 1,
          'session-id': 1,
        },
      })
      .then(res => {
        dispatch(allProducts(res.data.products));
        console.log(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  };
};
export const addProducts = ({name, category, active, page}) => {
  let URL = 'https://test-api.zasket.in/api/v1/inventory/products/list';
  URL = URL + '?productsNameLike=' + name + '&';
  URL = URL + 'size=' + 15 + '&';
  URL = URL + 'page=' + page + '&';
  URL = URL + 'categoryId=' + category + '&';
  if (active) URL = URL + 'isActive=' + active;
  return async dispatch => {
    await axios
      .get(URL, {
        headers: {
          'inventory-user-id': 1,
          'session-id': 1,
        },
      })
      .then(res => {
        dispatch(newProducts(res.data.products));
        console.log(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  };
};
export const getProductCategory = () => {
  return async dispatch => {
    await axios
      .get(
        'https://test-api.zasket.in/api/v1/inventory/categories/list?isActive=true',
        {
          headers: {
            'inventory-user-id': 1,
            'session-id': 1,
          },
        },
      )
      .then(res => {
        dispatch(allCategories(res.data.categories));
        console.log(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  };
};
export const getProductsWithFilter = ({name, category, active}) => {
  let URL = 'https://test-api.zasket.in/api/v1/inventory/products/list';
  URL = URL + '?productsNameLike=' + name + '&';
  URL = URL + 'categoryId=' + category + '&';
  if (active) URL = URL + 'isActive=' + active;
  return async dispatch => {
    await axios
      .get(URL, {
        headers: {
          'inventory-user-id': 1,
          'session-id': 1,
        },
      })
      .then(res => {
        dispatch(allProducts(res.data.products));
        console.log(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  };
};
