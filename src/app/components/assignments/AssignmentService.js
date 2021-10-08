import axios from 'axios';
const URL_BASE = 'https://api.zasket.in/inventory/api/1/assignment/';

export const deleteAssignmentService = async rowData => {
  return await axios.delete(URL_BASE + `orders?order_id_csv=${rowData.orders}`);
};

export const downloadInvoicesService = async (event, rowData) => {
  window.open(
    URL_BASE +
      `invoices/download?deId=${rowData.id}&orderIdCsv=${rowData.orders}`,
  );
};

export const downloadEstimationService = async (event, rowData) => {
  let arr = [];
  const orderArray = rowData.map(i => {
    return i.orders;
  });
  for (let row of orderArray) for (let e of row) arr.push(e);
  const orderStr = arr.join(',');
  window.open(URL_BASE + `orders/estimation?orderIdCsv=${orderStr}`);
};

export const makeTransitService = async rowData => {
  const params = {
    deliveryBoyId: rowData.id,
    orderIdCsv: rowData.orders.join(','),
    deliveryState: 'IN_TRANSIT',
  };
  return await axios.put(URL_BASE + `orders/state`, params);
};
