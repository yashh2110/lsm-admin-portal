import React, {useEffect, useState} from 'react';
import {
  getOrderDetails,
  getRefundsAndReturnsByOrderId,
} from '../components/orders/OrdersServices';
import OrdersToolbar from '../components/orders/OrdersToolbar';
import OrderItemsTable from '../components/orders/OrderItemsTable';
import ReturnsAndRefundsTable from '../components/orders/ReturnsAndRefundsTable';
function OrderDetails({orderId}) {
  console.log(orderId);
  const [data, setData] = useState();
  const [refundsData, setRefundsData] = useState();
  const getrefunds = () => {
    getRefundsAndReturnsByOrderId(orderId)
      .then(res => {
        setRefundsData(res.data.details);
      })
      .catch(err => console.log(err));
  };
  const getOrders = () => {
    getOrderDetails(orderId)
      .then(res => {
        setData(res.data);
      })
      .catch(err => console.log(err));
  };
  useEffect(() => {
    getOrders();
    getrefunds();
  }, []);
  return (
    <div className="vendor">
      <OrdersToolbar title="Order Details" back />
      <OrderItemsTable data={data} orderId={orderId} getrefunds={getrefunds} />
      <ReturnsAndRefundsTable
        data={refundsData}
        orderId={orderId}
        getrefunds={getrefunds}
      />
    </div>
  );
}

export default OrderDetails;
