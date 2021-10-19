import axios from 'axios';
const URL_BASE = 'https://api.zasket.in/inventory/api/1/';

export const productSearchService = async query => {
  return await axios.get(URL_BASE + `products?productsNameLike=${query}`, {
    headers: {
      'inventory-user-id': 1,
      'session-id': 1,
    },
  });
};

export const createPurchaseOrderService = async form => {
  return await axios.post(URL_BASE + 'purchase-order', form);
};

export const getPurchaseOrder = async id => {
  return await axios.get(URL_BASE + `purchase-order/${id}`);
};
export const getInvoices = async id => {
  return await axios.get(URL_BASE + `purchase-order/${id}/invoices`);
};
export const deleteInvoice = async (purchaseId, id) => {
  return await axios.delete(
    URL_BASE + `purchase-order/${purchaseId}/invoices/${id}`,
  );
};
export const deleteInvoices = async purchaseId => {
  return await axios.delete(
    URL_BASE + `purchase-order/${purchaseId}/invoices/`,
  );
};
export const updatePurchaseOrderService = async (id, form) => {
  const params = {
    vendorId: form.vendorId,
    warehouseId: form.warehouseId,
    purchaseOrderItemsRequests: form.purchaseOrderItems,
    po_purchaseState: form.purchaseState,
    po_paymentState: form.paymentState,
    orderAmount: form.orderAmount,
    comments: form.comments,
  };
  await axios.put(URL_BASE + `purchase-order/${id}`, params);
};

export const uploadInvoices = async file => {
  return await axios.post(
    URL_BASE + 'purchase-order/invoices/file/upload',
    file,
  );
};

export const createInvoices = async (id, form) => {
  return await axios.post(URL_BASE + `purchase-order/${id}/invoices`, form);
};
