import axios from 'axios';

const BASE_URL = process.env.REACT_APP_API + 'inventory/api/1/customers';

export const getTransactionService = async ({id, page}) => {
  let URL = BASE_URL + `/${id}/credits/transactions/list`;
  URL = URL + '?size';
  //   URL = URL + '&page=' + page;
  return await axios.get(URL);
};

export const getCustomerById = async id => {
  let URL = BASE_URL + `/${id}`;
  return await axios.get(URL);
};

export const addCreditService = async (id, form) => {
  return await axios.post(BASE_URL + `/${id}/credits/add`, form);
};

export const blockStatusService = async (id, form) => {
  return await axios.post(BASE_URL + `/${id}/block_status/update`, form);
};

export const codStatusService = async (id, form) => {
  return await axios.post(BASE_URL + `/${id}/disable_cod/update`, form);
};
