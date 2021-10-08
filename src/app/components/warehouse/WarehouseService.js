import axios from 'axios';
const URL_BASE = 'https://api.zasket.in/inventory/api/1/warehouses';

export const createWareHouseService = async form => {
  return await axios.post(URL_BASE, form);
};

export const updateWarehouseService = async form => {
  return await axios.put(URL_BASE + `/${form.id}`, form);
};

export const deactivateWarehouseService = async id => {
  return await axios.delete(URL_BASE + `/${id}`);
};
