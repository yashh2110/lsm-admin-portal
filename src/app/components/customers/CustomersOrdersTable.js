import MaterialTable from 'material-table';
import React, {useState} from 'react';
import {useEffect} from 'react';
import {Link} from 'react-router-dom';
import {Waypoint} from 'react-waypoint';
import {Popover, Whisper} from 'rsuite';
import {getOrdersByCustomer} from '../orders/OrdersServices';

function CustomerOrdersTable({id}) {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const addOrders = page => {
    getOrdersByCustomer(id, page)
      .then(res => {
        setData(e => [...e, ...res.data]);
      })
      .catch(err => console.log(err));
  };
  useEffect(() => {
    getOrdersByCustomer(id)
      .then(res => {
        setData(res.data);
      })
      .catch(err => console.log(err));
  }, []);
  const column = [
    {
      title: 'Order Id',
      render: rowData => (
        <>
          <Waypoint
            onEnter={() => {
              console.log(rowData.tableData.id);
              if (rowData.tableData.id === data.length - 2) {
                addOrders(page);
                setPage(i => i + 1);
              }
            }}></Waypoint>
          <Link to={`/orders/${rowData.id}`} style={{color: 'blue'}}>
            {rowData.id}
          </Link>
        </>
      ),
    },
    {
      title: 'Slot',
      field: 'orderId',
      render: rowData => (
        <Whisper
          placement="right"
          trigger="hover"
          controlId="control-id-hover-enterable"
          speaker={
            <Popover title="Delivery Slot">
              <p style={{maxWidth: '250px'}}>
                {rowData.deliverySlot.description}
              </p>
            </Popover>
          }
          enterable>
          <span style={{fontSize: '0.8rem', margin: 0, cursor: 'pointer'}}>
            {rowData.deliverySlot.id}
          </span>
        </Whisper>
      ),
    },
    {title: 'Payment Method', field: 'paymentMethod'},
    {
      title: 'Billing Address',
      render: rowData => (
        <Whisper
          placement="right"
          trigger="hover"
          controlId="control-id-hover-enterable"
          speaker={
            <Popover title={rowData.billingAddress.recipientName}>
              <p style={{maxWidth: '250px'}}>
                {rowData.billingAddress.addressLine_1}
              </p>
              <p>{rowData.billingAddress.pinCode}</p>
              <p>
                <a
                  href={`tel:${rowData.billingAddress.recipientMobileNumber}`}
                  rel="noopener noreferrer">
                  {rowData.billingAddress.recipientMobileNumber}
                </a>
              </p>
            </Popover>
          }
          enterable>
          <span style={{fontSize: '0.8rem', margin: 0, cursor: 'pointer'}}>
            {rowData.billingAddress.id}
          </span>
        </Whisper>
      ),
    },
    {
      title: 'Assigned To',
      render: rowData => (
        <p>{rowData.assignedTo ? rowData.assignedTo.name : 'N/A'}</p>
      ),
    },
    {
      title: 'Delivered By',
      render: rowData => (
        <p>{rowData.deliveredBy ? rowData.deliveredBy.name : 'N/A'}</p>
      ),
    },
    {
      title: 'Delivered At',
      render: row => {
        let date;
        if (row.deliveredAt) {
          date = new Date(row.deliveredAt);
        }
        return (
          <p style={{fontSize: '0.8rem', margin: 0}}>
            {/* {date.toLocaleString('en-US', {hour: 'numeric', hour12: true})},{' '} */}
            {row.deliveredAt ? date.toDateString() : 'N/A'}
          </p>
        );
      },
    },
    {title: 'Delivered state', field: 'state'},
    {
      title: 'Ordered At',
      render: row => {
        const date = new Date(row.orderedAt);
        return (
          <p style={{fontSize: '0.8rem', margin: 0}}>
            {/* {date.toLocaleString('en-US', {hour: 'numeric', hour12: true})},{' '} */}
            {date.toDateString()}
          </p>
        );
      },
    },
    {title: 'Offer Price', field: 'offerPrice'},
    {title: 'Final Price', field: 'finalPrice'},
    {title: 'Refunded Amount', field: 'refundedAmount'},
    {title: 'Credit Used', field: 'creditUsed'},
    {title: 'Offer Code', field: 'offerCode'},
  ];
  return (
    <div style={{maxWidth: '100%'}}>
      <MaterialTable
        style={{padding: '0 8px', boxShadow: 'none'}}
        options={{
          paging: false,
          padding: 'dense',
          actionsColumnIndex: -1,
          search: false,
          toolbar: false,
          rowStyle: {
            fontSize: '13px',
          },
          minBodyHeight: '500px',
          maxBodyHeight: '500px',
          draggable: false,
        }}
        columns={column}
        data={data}
        title="Orders"
      />
    </div>
  );
}

export default CustomerOrdersTable;
