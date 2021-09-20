// import MUIDataTable from 'mui-datatables';
import MaterialTable, {MTableToolbar} from 'material-table';
import React from 'react';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import {useDispatch} from 'react-redux';
import {toast} from 'react-toastify';

function ProductsTable({
  columns,
  data,
  setCreateopen,
  setUpdateopen,
  setRowData,
}) {
  const dispatch = useDispatch();

  return (
    <div style={{maxWidth: '100%'}}>
      <MaterialTable
        style={{padding: '0 8px', boxShadow: 'none'}}
        options={{
          paging: false,
          padding: 'dense',
          actionsColumnIndex: -1,
        }}
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
              setUpdateopen(true);
              setRowData(rowData);
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
              setCreateopen(true);
            },
          },
        ]}
        columns={columns}
        data={data}
        title="Vendors"
      />
    </div>
  );
}

export default ProductsTable;
