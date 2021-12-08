import React, {useEffect, useState} from 'react';
import {getOrderDetails} from '../components/orders/OrdersServices';
import OrdersToolbar from '../components/orders/OrdersToolbar';
import OrderItemsTable from '../components/orders/OrderItemsTable';
function OrderDetails({orderId}) {
  const [data, setData] = useState();
  useEffect(() => {
    getOrderDetails(orderId)
      .then(res => {
        setData(res.data);
      })
      .catch(err => console.log(err));
  }, []);
  return (
    <div className="vendor">
      <OrdersToolbar title="Order Details" back />
      <OrderItemsTable data={data} />
    </div>
  );
}

export default OrderDetails;
