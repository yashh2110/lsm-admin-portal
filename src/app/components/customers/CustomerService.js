import axios from 'axios';

const BASE_URL = process.env.REACT_APP_API + 'inventory/api/1/customers';

export const getTransactionService = async ({id, page}) => {
  let URL = BASE_URL + `/${id}/credits/transactions/list`;
  URL = URL + '?size';
  //   URL = URL + '&page=' + page;
  return await axios.get(URL, {
    headers: {
      'inventory-user-id': 1,
      'session-id': 1,
    },
  });
};

export const getCustomerById = async id => {
  let URL = BASE_URL + `/${id}`;
  return await axios.get(URL, {
    headers: {
      'inventory-user-id': 1,
      'session-id': 1,
    },
  });
};

export const addCreditService = async (id, form) => {
  return await axios.post(BASE_URL + `/${id}/credits/add`, form, {
    headers: {
      'inventory-user-id': 1,
      'session-id': 1,
    },
  });
};

export const blockStatusService = async (id, form) => {
  return await axios.post(BASE_URL + `/${id}/block_status/update`, form, {
    headers: {
      'inventory-user-id': 1,
      'session-id': 1,
    },
  });
};
