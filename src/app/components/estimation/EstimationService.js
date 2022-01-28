const URL_BASE = process.env.REACT_APP_API + 'admin/v2/estimations';
export const downloadEstimationService = ({
  category,
  startDate,
  endDate,
  slotId,
}) => {
  let URL = URL_BASE + `/download?`;
  if (category) URL = URL + `category=${category}&`;
  if (slotId) URL = URL + `slotId=${slotId}&`;
  if (endDate) URL = URL + `deliveryEndDate=${endDate}&`;
  if (startDate) URL = URL + `deliveryStartDate=${startDate}`;
  window.open(URL);
};
