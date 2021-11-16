const URL_BASE = process.env.REACT_APP_API + 'admin/v2/estimations';
export const downloadEstimationService = ({
  category,
  startDate,
  endDate,
  slotId,
}) => {
  window.open(
    URL_BASE +
      `/download?category=${category}&startDate=${startDate}&endDate=${endDate}&slotId=${slotId}`,
  );
};
