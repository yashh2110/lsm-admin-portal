import MaterialTable from 'material-table';
import React from 'react';
import {Link} from 'react-router-dom';
import {Popover, Whisper} from 'rsuite';

function CustomerOrdersTable({data}) {
  const column = [
    {
      title: 'Order Id',
      render: rowData => (
        <Link to={`/orders/${rowData.id}`} style={{color: 'blue'}}>
          {rowData.id}
        </Link>
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
