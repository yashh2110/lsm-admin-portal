import axios from 'axios';
const URL_BASE = process.env.REACT_APP_API + 'admin/v2/zones';
export const createZoneService = async form => {
  return await axios.post(URL_BASE + '/add', form);
};

export const deactivateZone = async id => {
  return await axios.post(URL_BASE + `/deactivate?zone_id=${id}`);
};

export const updateSlotCapacity = async form => {
  return await axios.post(URL_BASE + `/slot/capacity/update`, form);
};

export const getZoneById = async id => {
  return await axios.get(URL_BASE + `/info?zone_id=${id}`);
};
