import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getActiveDes} from '../../redux/actions/Assignments';
import {getAllOrders} from '../../redux/actions/Orders';
import OrdersFilter from '../components/orders/OrdersFilter';
import OrdersTable from '../components/orders/OrdersTable';
import OrdersToolbar from '../components/orders/OrdersToolbar';
import '../css/pages/orders.css';
function Orders({setActiveTab}) {
  const {
    assignedTo,
    customerId,
    // deliveredBy,
    deliveryDate,
    deliveryState,
    orderId,
    slotId,
  } = useSelector(state => state.orders);
  const dispatch = useDispatch();
  useEffect(() => {
    setActiveTab(12);
    dispatch(getActiveDes());
    dispatch(
      getAllOrders({
        assignedTo,
        customerId,
        // deliveredBy,
        deliveryDate,
        deliveryState,
        orderId,
        slotId,
      }),
    );
  }, []);
  return (
    <div className="vendor">
      <OrdersToolbar title="Orders" />
      <OrdersFilter />
      <OrdersTable />
    </div>
  );
}

export default Orders;
