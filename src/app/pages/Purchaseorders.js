import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getPurchaseOrders} from '../../redux/actions/PurchaseOrders';
import PurchaseOrderTable from '../components/purchaseorders/PurchaseOrderTable';

import '../css/pages/vendor.css';

function PurchaseOrders({setActiveTab}) {
  const orders = useSelector(state => state.purchaseorders);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getPurchaseOrders());
    setActiveTab(3);
  }, []);
  const columns = [
    {title: 'Id', field: 'id', width: '10%'},
    {title: 'Vendor Name', field: 'vendorName'},
    {title: 'Warehouse Name', field: 'warehouseName'},
    {title: 'Order Amount', field: 'orderAmount'},
    {title: 'Purchase State', field: 'purchaseState'},
    {title: 'Payment State', field: 'paymentState'},
    {
      title: 'Comments',
      field: 'comments',
    },
  ];
  return (
    <div className="vendor">
      <PurchaseOrderTable columns={columns} data={orders} />
    </div>
  );
}

export default PurchaseOrders;
