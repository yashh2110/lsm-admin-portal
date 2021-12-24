import axios from 'axios';

const BASE_URL = process.env.REACT_APP_API;
const BASE_URL_V2 = process.env.REACT_APP_API + 'admin/v2';
export const downloadOrderInvoice = id => {
  window.open(`${BASE_URL}orders/download-invoice?order-id=${id}`);
};
export const downloadOrderInvoices = ({date, slot}) => {
  window.open(
    `${BASE_URL}orders/download-invoice-all?date_str=${date}${
      slot ? 'slot=' + slot : ''
    }`,
  );
};

export const canclearOrder = async id => {
  return await axios.post(`${BASE_URL_V2}/orders/cancel?orderId=${id}`);
};

export const rescheduleOrderService = async ({
  daysFromCurrentDay,
  deliverySlot,
  orderId,
}) => {
  return await axios.post(
    `${BASE_URL_V2}/orders/order/reschedule?orderId=${orderId}&daysFromCurrentDay=${daysFromCurrentDay}&deliverySlotId=${deliverySlot}`,
  );
};

export const getOrderDetails = async orderId => {
  return await axios.get(`${BASE_URL_V2}/order-items/list?order-id=${orderId}`);
};

export const getOrdersByCustomer = async id => {
  return await axios.get(`${BASE_URL_V2}/orders/list?customerId=${id}`);
};

export const getSlotsForNextNDays = async orderId => {
  return await axios.get(
    `${BASE_URL_V2}/orders/reschedule/slots/list?orderId=${orderId}`,
  );
};

export const getRefundsAndReturnsByOrderId = async orderId => {
  return await axios.get(`${BASE_URL_V2}/refund-returns/${orderId}/list`);
};

export const partialRefund = async ({orderId, amount, orderItemId}) => {
  return await axios.post(
    `${BASE_URL_V2}/refunds/partial-refund?orderId=${orderId}&amount=${amount}&orderItemId=${orderItemId}`,
  );
};
export const refundToSource = async id => {
  return await axios.post(
    `${BASE_URL_V2}/refunds/refund-to-source?orderDenyAuditId=${id}`,
  );
};
