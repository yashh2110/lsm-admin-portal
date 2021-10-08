import axios from 'axios';
const URL_BASE = 'https://api.zasket.in/inventory/api/1/vendors';

export const createVendorService = async form => {
  return await axios.post(URL_BASE, form);
};

export const updateVendorService = async (id, form) => {
  return await axios.put(URL_BASE + `/${id}`, form);
};

export const deactivateVendorService = async id => {
  return await axios.delete(URL_BASE + `/${id}`);
};
