import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Waypoint} from 'react-waypoint';
import {
  getPurchaseOrders,
  getPurchaseOrdersByPage,
} from '../../redux/actions/PurchaseOrders';
import {getVendors} from '../../redux/actions/Vendors';
import PurchaseOrderTable from '../components/purchaseorders/PurchaseOrderTable';

import '../css/pages/vendor.css';

function PurchaseOrders({setActiveTab}) {
  const {orders, vendorid} = useSelector(state => state.purchaseorders);
  const dispatch = useDispatch();
  const [page, setPage] = useState(0);

  useEffect(() => {
    dispatch(getPurchaseOrders());
    dispatch(getVendors());
    setActiveTab(3);
  }, []);
  const columns = [
    {
      title: 'Id',
      field: 'id',
      width: '10%',
      render: rowdata => {
        return (
          <>
            <Waypoint
              onEnter={() => {
                if (rowdata.tableData.id === orders.length - 2) {
                  dispatch(
                    getPurchaseOrdersByPage({
                      id: vendorid,
                      page: page + 1,
                    }),
                  );
                  setPage(i => i + 1);
                }
              }}></Waypoint>
            {rowdata.id}
          </>
        );
      },
    },
    {title: 'Vendor Name', field: 'vendorName'},
    {title: 'Warehouse Name', field: 'warehouseName'},
    {title: 'Order Amount', field: 'orderAmount'},
    {title: 'Purchase State', field: 'purchaseState'},
    {title: 'Payment State', field: 'paymentState'},
    {
      title: 'Comments',
      field: 'comments',
    },
    {
      title: 'Created At',
      field: 'createdAt',
      render: row => {
        const date = new Date(row.createdAt);
        return (
          <p style={{fontSize: '0.8rem', margin: 0}}>
            {/* {date.toLocaleString('en-US', {hour: 'numeric', hour12: true})},{' '} */}
            {date.toDateString()}
          </p>
        );
      },
    },
  ];
  return (
    <div className="vendor">
      <PurchaseOrderTable columns={columns} data={orders} setPage={setPage} />
    </div>
  );
}

export default PurchaseOrders;
