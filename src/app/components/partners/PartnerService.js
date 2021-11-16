import axios from 'axios';

const BASE_URL = process.env.REACT_APP_API + 'admin/v2/';

export const deactivatePartner = async id => {
  return await axios.post(BASE_URL + `partner/deactivate?partner_id=${id}`);
};
export const ActivatePartner = async (id, type) => {
  return await axios.post(
    BASE_URL + `partner/activate?partner_id=${id}&partnership_type=${type}`,
  );
};
