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
export const allLsProducts = payload => {
  return {
    type: ActionTypes.GET_ALL_LOW_STOCK,
    payload,
  };
};
export const setLsProducts = payload => {
  return {
    type: ActionTypes.GET_LOW_STOCK,
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
  let URL = 'https://api.zasket.in/inventory/api/1/products';
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
      })
      .catch(err => {
        console.log(err);
      });
  };
};
export const getLowStockProducts = () => {
  let URL = 'https://api.zasket.in/inventory/api/1/products/low-stock';
  URL = URL + '?size=' + 1000 + '&';
  URL = URL + 'page=' + 0 + '&';
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
      })
      .catch(err => {
        console.log(err);
      });
  };
};
export const addProducts = ({name, category, active, page}) => {
  let URL = 'https://api.zasket.in/inventory/api/1/products';
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
      })
      .catch(err => {
        console.log(err);
      });
  };
};
export const addLsProducts = ({name, category, active, page}) => {
  let URL = 'https://api.zasket.in/inventory/api/1/products/low-stock';
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
        dispatch(setLsProducts(res.data.products));
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
        'https://api.zasket.in/inventory/api/1/categories/list?isActive=true',
        {
          headers: {
            'inventory-user-id': 1,
            'session-id': 1,
          },
        },
      )
      .then(res => {
        dispatch(allCategories(res.data.categories));
      })
      .catch(err => {
        console.log(err);
      });
  };
};
export const getProductsWithFilter = ({name, category, active}) => {
  let URL = 'https://api.zasket.in/inventory/api/1/products';
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
      })
      .catch(err => {
        console.log(err);
      });
  };
};
export const getLsProductsWithFilter = ({category, active}) => {
  let URL = 'https://api.zasket.in/inventory/api/1/products/low-stock';
  URL = URL + '?categoryId=' + category + '&';
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
        dispatch(allLsProducts(res.data.products));
      })
      .catch(err => {
        console.log(err);
      });
  };
};
