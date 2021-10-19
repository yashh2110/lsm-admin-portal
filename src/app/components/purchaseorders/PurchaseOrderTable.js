import MaterialTable from 'material-table';
import React from 'react';

import {useHistory} from 'react-router-dom';
import PurchaseOrderToolbar from './PurchaseOrdersToolbar';
function PurchaseOrderTable({columns, data, setPage}) {
  const history = useHistory();

  const viewOrder = e => {
    history.push({pathname: `/purchaseorders/${e.id}`, state: {orderId: e.id}});
  };
  return (
    <div style={{maxWidth: '100%'}}>
      <div className="p-2">
        <PurchaseOrderToolbar setPage={setPage} />
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
        actions={[
          // {
          //   icon: () => <EditOutlinedIcon />,
          //   tooltip: 'Edit',
          //   onClick: (event, rowData) => {
          //     history.push({
          //       pathname: '/purchaseorders/update',
          //       state: {item: rowData},
          //     });
          //   },
          // },

          {
            icon: () => (
              <div
                className="btn"
                style={{
                  backgroundColor: 'rgb(223, 223, 223)',
                  fontWeight: '500',
                }}>
                Create
              </div>
            ),
            tooltip: 'Deactivate',
            isFreeAction: true,
            onClick: event => {
              history.push('/purchaseorders/new');
            },
          },
        ]}
        columns={columns}
        data={data}
        title="Purchase Orders"
      />
    </div>
  );
}

export default PurchaseOrderTable;
