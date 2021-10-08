import MaterialTable, {MTableToolbar} from 'material-table';
import React from 'react';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';

import {useHistory} from 'react-router-dom';
function PurchaseOrderTable({columns, data}) {
  const history = useHistory();

  const viewOrder = e => {
    history.push({pathname: `/purchaseorders/${e.id}`, state: {orderId: e.id}});
  };
  return (
    <div style={{maxWidth: '100%'}}>
      <MaterialTable
        style={{padding: '0 8px', boxShadow: 'none'}}
        options={{
          paging: false,
          padding: 'dense',
          actionsColumnIndex: -1,
        }}
        onRowClick={(event, e) => viewOrder(e)}
        components={{
          Toolbar: props => (
            <div className="p-2">
              <MTableToolbar {...props} />
            </div>
          ),
        }}
        actions={[
          {
            icon: () => <EditOutlinedIcon />,
            tooltip: 'Edit',
            onClick: (event, rowData) => {
              history.push({
                pathname: '/purchaseorders/update',
                state: {item: rowData},
              });
            },
          },

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
