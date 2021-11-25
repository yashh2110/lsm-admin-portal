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
    URL_BASE +
    `/low-stock/download?page=0&size=1000&categoryId=${cat}&isActive=${active}`;
  window.open(url);
};
