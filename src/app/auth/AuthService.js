import axios from 'axios';
const URL_BASE = process.env.REACT_APP_API + 'admin/v2/';
export const signinService = async ({email, password}) => {
  return await axios.post(
    URL_BASE + `sign-in?emailId=${email}&password=${password}`,
  );
};
export const signoutService = async () => {
  return await axios.post(URL_BASE + 'sign-out');
};
