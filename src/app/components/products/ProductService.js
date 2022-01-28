import axios from 'axios';
const URL_BASE = process.env.REACT_APP_API + 'inventory/api/1/products';
export const createProduct = async form => {
  return await axios.post(URL_BASE + `/add`, form);
};

export const updateProduct = async (id, form) => {
  return await axios.post(URL_BASE + `/${id}/update`, form);
};

export const uploadProductImgService = async file => {
  return await axios.post(URL_BASE + '/images/upload', file);
};

export const updateProductImgService = async (id, file) => {
  return await axios.post(URL_BASE + `/${id}/images/update`, file);
};

export const downloadLowStock = async ({cat, active}) => {
  let url =
    URL_BASE + `/low-stock/download?categoryId=${cat}&isActive=${active}`;
  window.open(url);
};

export const addStock = async ({product_id, quantity}) => {
  let url = URL_BASE + `/${product_id}/add-stock?quantity=${quantity}`;
  return await axios.get(url);
};

export const getCommitedStock = async ({product_id}) => {
  let url = URL_BASE + `/${product_id}/get-committed-stock`;
  return await axios.get(url);
};

export const adjustStockOpen = async ({product_id, quantity_adjusted}) => {
  let url =
    URL_BASE +
    `/${product_id}/adjust-stock?quantity_adjusted=${quantity_adjusted}`;
  return await axios.get(url);
};
