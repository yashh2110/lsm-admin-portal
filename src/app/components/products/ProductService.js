import axios from 'axios';
const URL_BASE = 'https://api.zasket.in/inventory/api/1/products';
export const createProduct = async form => {
  return await axios.post(URL_BASE + `/add`, form, {
    headers: {'inventory-user-id': 1, 'session-id': 1},
  });
};

export const updateProduct = async (id, form) => {
  return await axios.post(URL_BASE + `${id}/update`, form, {
    headers: {'inventory-user-id': 1, 'session-id': 1},
  });
};
