import MaterialTable from 'material-table';
import React from 'react';
import {useSelector} from 'react-redux';
import LsProductToolbar from './LsProductToolbar';

function LsProductTable({columns, setRowData, setViewProduct, setPage}) {
  const lsproducts = useSelector(state => state.products.lsproducts);
  return (
    <div style={{maxWidth: '100%'}}>
      <div className="p-2">
        <LsProductToolbar setPage={setPage} />
      </div>
      <MaterialTable
        style={{padding: '0 8px', boxShadow: 'none'}}
        onRowClick={(event, rowData) => {
          setRowData(rowData);
          setViewProduct(true);
        }}
        options={{
          paging: false,
          padding: 'dense',
          actionsColumnIndex: -1,
          toolbar: false,
          minBodyHeight: 'calc(100vh - (92px + 67px + 16px))',
          maxBodyHeight: 'calc(100vh - (92px + 67px + 16px))',
          rowStyle: {
            fontSize: '13px',
          },

          draggable: false,
        }}
        columns={columns}
        data={lsproducts}
        title="Products"
      />
    </div>
  );
}

export default LsProductTable;
