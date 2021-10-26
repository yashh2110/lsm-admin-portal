import MaterialTable from 'material-table';
import React from 'react';

function CustomerTransactionTable({data}) {
  const column = [
    {title: 'Id', field: 'id'},
    {title: 'Orders', field: 'orderId'},
    {title: 'Transaction Amount', field: 'transactionAmount'},
    {title: 'Transaction Type', field: 'transactionType'},
    {title: 'Transaction Purpose', field: 'transactionPurpose'},
    {
      title: 'Created At',
      field: 'createdAt',
      render: row => {
        const date = new Date(row.createdAt);
        return (
          <p style={{fontSize: '0.8rem', margin: 0}}>
            {date.toLocaleString('en-US', {hour: 'numeric', hour12: true})},{' '}
            {date.toDateString()}
          </p>
        );
      },
    },
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
          rowStyle: {
            fontSize: '13px',
          },

          draggable: false,
        }}
        columns={column}
        data={data}
        title="Transactions"
      />
    </div>
  );
}

export default CustomerTransactionTable;
