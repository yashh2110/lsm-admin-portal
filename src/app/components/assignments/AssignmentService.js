import axios from 'axios';
const URL_BASE = process.env.REACT_APP_API + 'inventory/api/1/assignment/';

export const deleteAssignmentService = async rowData => {
  return await axios.delete(URL_BASE + `orders?order_id_csv=${rowData.orders}`);
};

export const downloadInvoicesService = async rowData => {
  window.open(
    URL_BASE +
      `invoices/download?deId=${rowData.id}&orderIdCsv=${rowData.orders}`,
  );
};

export const downloadEstimationService = async checkedKeys => {
  const orderStr = checkedKeys.join(',');
  console.log(checkedKeys);
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

export const assignOrderService = async (de, selectedOrders) => {
  const params = {
    deliveryBoyId: de.id,
    orderIdCsv: selectedOrders.map(i => i.id).join(','),
  };
  return await axios.post(URL_BASE + `orders`, params);
};
export const getOrders = async (date, slot, ordered_after) => {
  if (date) {
    const start = new Date(date);
    start.setHours(0, 0, 0, 0);
    const end = new Date(date);
    end.setHours(23, 59, 59, 999);
    let URL =
      URL_BASE +
      `orders?start-time=${start.getTime()}&end-time=${end.getTime()}&slot-id-list=${slot}`;
    if (ordered_after) URL = URL + `&ordered_after=${ordered_after}`;
    return await axios.get(URL);
  }
};
export const getAssignedOrders = async (date, slot, ordered_after) => {
  if (date) {
    const start = new Date(date);
    start.setHours(0, 0, 0, 0);
    const end = new Date(date);
    end.setHours(23, 59, 59, 999);
    // try {
    let URL =
      URL_BASE +
      `delivery-executives/orders?start_time=${start.getTime()}&end_time=${end.getTime()}&slot-id-list=${slot}`;
    if (ordered_after) URL = URL + `&ordered_after=${ordered_after}`;
    console.log(URL);
    return await axios.get(URL);
    //   const data = Object.keys(res.data).map(i => {
    //     const item = {
    //       id: i.split(':')[0],
    //       de: i.split(':')[1],
    //       orders: res.data[i],
    //     };
    //     return item;
    //   });
    //   dispatch(setAssignedOrders(data));
    // } catch (err) {
    //   console.log(err);
    // }
  }
};
export const getOrderStateSummary = async (date, ordered_after) => {
  if (date) {
    const newDate = new Date(date);
    const formattedDate =
      newDate.getMonth() +
      1 +
      '/' +
      newDate.getDate() +
      '/' +
      newDate.getFullYear();
    let URL = URL_BASE + `orders/summary?orderDate=${formattedDate}`;
    if (ordered_after) URL = URL + `&ordered_after=${ordered_after}`;
    return await axios.get(URL);
  }
};

export const getAllService = async (date, slot, ordered_after) => {
  return await axios.all([
    getOrders(date, slot, ordered_after),
    getAssignedOrders(date, slot, ordered_after),
    getOrderStateSummary(date, ordered_after),
  ]);
};

export const getActiveOrderByDate = async (
  date,
  deliveryBoy,
  ordered_after,
) => {
  let URL =
    process.env.REACT_APP_API +
    `admin/v2/orders/active-orders/cards?deliveryDate=${date}`;
  if (deliveryBoy) URL = URL + `&deliveryBoy=${deliveryBoy}`;
  if (ordered_after) URL = URL + `&ordered_after=${ordered_after}`;

  return await axios.get(URL);
};
