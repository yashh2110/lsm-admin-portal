import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Waypoint} from 'react-waypoint';
import {
  addReturnsAndRefunds,
  getReturnsAndRefunds,
  setDenyState,
  setReturnDate,
} from '../../redux/actions/ReturnsAndRefunds';
import ReturnsTable from '../components/ReturnsAndRefunds/ReturnsTable';

function ReturnsAndRefunds({setActiveTab}) {
  const {returnsandrefunds, date, denyStatus} = useSelector(
    state => state.returnsandrefunds,
  );
  const dispatch = useDispatch();
  const [page, setPage] = useState(0);
  useEffect(() => {
    const now = new Date();
    const day = ('0' + now.getDate()).slice(-2);
    const month = ('0' + (now.getMonth() + 1)).slice(-2);
    const today = now.getFullYear() + '-' + month + '-' + day;
    dispatch(getReturnsAndRefunds());
    dispatch(setReturnDate(today));
    dispatch(setDenyState('PARTIALLY_RETURNED'));
    setActiveTab(10);
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
                if (rowdata.tableData.id === returnsandrefunds.length - 2) {
                  dispatch(
                    addReturnsAndRefunds({
                      page: page + 1,
                      date: date,
                      denyState: denyStatus,
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
    {title: 'Order Id', field: 'orderId'},
    {title: 'Order Item Id', field: 'orderItemId'},
    {
      title: 'Customer Id',
      field: 'customerId',
    },
    {
      title: 'Refund Id',
      field: 'refundId',
      render: e => (e.refundId ? e.refundId : 'Null'),
    },
    {
      title: 'Order Deny For',
      field: 'orderDenyFor',
    },
    {title: 'Quantity', field: 'quantity'},

    {
      title: 'Amount',
      field: 'amount',
    },
    {
      title: 'State',
      field: 'state',
      render: e =>
        e.accountStatus === 'VERIFIED' ? 'Verified' : 'Not Verified',
    },
    {
      title: 'Payment Method',
      field: 'paymentMethod',
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
      <ReturnsTable
        columns={columns}
        setPage={setPage}
        data={returnsandrefunds}
      />
    </div>
  );
}

export default ReturnsAndRefunds;
