import axios from 'axios';
const URL_BASE = process.env.REACT_APP_API + 'inventory/api/1/products';
export const createProduct = async form => {
  return await axios.post(URL_BASE + `/add`, form, {
    headers: {'inventory-user-id': 1, 'session-id': 1},
  });
};

export const updateProduct = async (id, form) => {
  return await axios.post(URL_BASE + `/${id}/update`, form, {
    headers: {'inventory-user-id': 1, 'session-id': 1},
  });
};

export const uploadProductImgService = async file => {
  return await axios.post(URL_BASE + '/images/upload', file, {
    headers: {'inventory-user-id': 1, 'session-id': 1},
  });
};

export const updateProductImgService = async (id, file) => {
  return await axios.post(URL_BASE + `/${id}/images/update`, file, {
    headers: {'inventory-user-id': 1, 'session-id': 1},
  });
};
