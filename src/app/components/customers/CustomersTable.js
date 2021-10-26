import MaterialTable from 'material-table';
import React from 'react';

import {useHistory} from 'react-router-dom';
import CustomerToolbar from './CustomersToolbar';
function CustomersTable({columns, data, setPage}) {
  const history = useHistory();

  const viewOrder = e => {
    history.push({pathname: `/customers/${e.id}`, state: {customer: e}});
    console.log('clicked');
  };
  return (
    <div style={{maxWidth: '100%'}}>
      <div className="p-2">
        <CustomerToolbar setPage={setPage} />
      </div>
      <MaterialTable
        style={{padding: '0 8px', boxShadow: 'none'}}
        options={{
          paging: false,
          padding: 'dense',
          actionsColumnIndex: -1,
          toolbar: false,
          minBodyHeight: 'calc(100vh - (92px + 67px + 16px))',
          maxBodyHeight: 'calc(100vh - (92px + 67px + 16px))',
          rowStyle: {
            fontSize: '15px',
          },
        }}
        onRowClick={(event, e) => viewOrder(e)}
        columns={columns}
        data={data}
        title="Customers"
      />
    </div>
  );
}

export default CustomersTable;
