import MaterialTable from 'material-table';
import React, {useEffect} from 'react';
import {useState} from 'react';
import {Waypoint} from 'react-waypoint';
import {getTransactionService} from './CustomerService';

function CustomerTransactionTable({id}) {
  const [page, setPage] = useState(1);
  const [data, setData] = useState([]);
  useEffect(() => {
    getTransactionService({id})
      .then(res => {
        setData(res.data.creditTransactions);
      })
      .catch(err => console.log(err));
  }, []);
  const addTransactions = page => {
    getTransactionService({id, page})
      .then(res => {
        setData(e => [...e, ...res.data.creditTransactions]);
      })
      .catch(err => console.log(err));
  };
  console.log(data);
  const column = [
    {
      title: 'Id',
      field: 'id',
      render: rowdata => {
        return (
          <>
            <Waypoint
              onEnter={() => {
                console.log(rowdata.tableData.id);
                if (rowdata.tableData.id === data.length - 2) {
                  addTransactions(page);
                  setPage(i => i + 1);
                }
              }}></Waypoint>
            {rowdata.id}
          </>
        );
      },
    },
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
      {data ? (
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
          title="Transactions"
        />
      ) : (
        <p>no Transactional data</p>
      )}
    </div>
  );
}

export default CustomerTransactionTable;
