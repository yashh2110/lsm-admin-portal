import MaterialTable from 'material-table';
import React from 'react';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import ProductToolbar from './ProductToolbar';
import {useSelector} from 'react-redux';

function ProductsTable({
  columns,
  setCreateopen,
  setUpdateopen,
  setRowData,
  setViewProduct,
  setPage,
}) {
  const products = useSelector(state => state.products.products);
  return (
    <div style={{maxWidth: '100%'}}>
      <div className="p-2">
        <ProductToolbar setPage={setPage} setCreateopen={setCreateopen} />
      </div>
      <MaterialTable
        style={{padding: '0 8px', boxShadow: 'none'}}
        // onRowClick={(event, rowData) => {
        //   setRowData(rowData);
        //   setViewProduct(true);
        // }}
        options={{
          paging: false,
          padding: 'dense',
          sorting: false,
          actions: false,
          toolbar: false,
          minBodyHeight: 'calc(100vh - (92px + 67px + 16px))',
          maxBodyHeight: 'calc(100vh - (92px + 67px + 16px))',
          rowStyle: {
            fontSize: '13px',
          },

          draggable: false,
        }}
        // actions={[
        //   {
        //     icon: () => <EditOutlinedIcon />,
        //     tooltip: 'Edit',
        //     onClick: (event, rowData) => {
        //       setUpdateopen(true);
        //       setRowData(rowData);
        //     },
        //   },
        // ]}
        columns={columns}
        data={products}
        title="Products"
      />
    </div>
  );
}

export default ProductsTable;
