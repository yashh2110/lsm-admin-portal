import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getActiveDes} from '../../redux/actions/Assignments';
import {
  getAllOrders,
  // setDeliveryDate,
  // setDeliveryState,
  // setSlotId,
} from '../../redux/actions/Orders';
import OrdersFilter from '../components/orders/OrdersFilter';
import OrdersTable from '../components/orders/OrdersTable';
import OrdersToolbar from '../components/orders/OrdersToolbar';
import '../css/pages/orders.css';
function Orders({
  setActiveTab,
  slotIdParam,
  deliveryDateParam,
  deliveryStateparam,
}) {
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
  // useEffect(() => {
  //   if (deliveryDateParam) {
  //     dispatch(setDeliveryDate(deliveryDateParam));
  //   } else dispatch(setDeliveryDate(null));
  //   if (slotIdParam) {
  //     dispatch(setSlotId(slotIdParam));
  //   } else dispatch(setSlotId(null));
  //   if (deliveryStateparam) {
  //     dispatch(setDeliveryState(deliveryStateparam));
  //   } else dispatch(setDeliveryState(null));
  // }, []);
  useEffect(() => {
    setActiveTab(12);
    dispatch(getActiveDes());
    dispatch(
      getAllOrders({
        assignedTo,
        customerId,
        // deliveredBy,
        deliveryDate: deliveryDateParam || deliveryDate,
        deliveryState: deliveryStateparam || deliveryState,
        orderId,
        slotId: slotIdParam || slotId,
      }),
    );
  }, []);
  return (
    <div className="vendor">
      <OrdersToolbar title="Orders" />
      <OrdersFilter
        slotIdParam={slotIdParam}
        deliveryDateParam={deliveryDateParam}
        deliveryStateparam={deliveryStateparam}
      />
      <OrdersTable
        slotIdParam={slotIdParam}
        deliveryDateParam={deliveryDateParam}
        deliveryStateparam={deliveryStateparam}
      />
    </div>
  );
}

export default Orders;
