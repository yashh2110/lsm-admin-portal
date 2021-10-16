import axios from 'axios';

const URL_BASE = 'https://api.zasket.in/inventory/api/1/banners';

export const uploadBannerService = async file => {
  return await axios.post(URL_BASE + '/images/upload', file, {
    headers: {'inventory-user-id': 1, 'session-id': 1},
  });
};
export const createBannerService = async form => {
  return await axios.post(URL_BASE + '/add', form, {
    headers: {'inventory-user-id': 1, 'session-id': 1},
  });
};
export const updateBannerService = async form => {
  return await axios.post(URL_BASE + `/${form.id}/update`, form, {
    headers: {'inventory-user-id': 1, 'session-id': 1},
  });
};
