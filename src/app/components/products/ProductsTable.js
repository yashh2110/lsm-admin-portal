// import MUIDataTable from 'mui-datatables';
import MaterialTable from 'material-table';
import React from 'react';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import ProductToolbar from './ProductToolbar';
import {useSelector} from 'react-redux';
// import {useDispatch} from 'react-redux';
// import {toast} from 'react-toastify';

function ProductsTable({
  columns,
  setCreateopen,
  setUpdateopen,
  setRowData,
  setPage,
}) {
  // const dispatch = useDispatch();
  const products = useSelector(state => state.products.products);
  console.log(products);
  return (
    <div style={{maxWidth: '100%'}}>
      <div className="p-2">
        {/* <MTableToolbar {...props} /> */}
        <ProductToolbar setPage={setPage} />
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
            fontSize: '13px',
          },

          draggable: false,
        }}
        // components={{
        //   Toolbar: props => (

        //   ),
        // }}
        actions={[
          {
            icon: () => <EditOutlinedIcon />,
            tooltip: 'Edit',
            onClick: (event, rowData) => {
              setUpdateopen(true);
              setRowData(rowData);
            },
          },

          // {
          //   icon: () => (
          //     <div
          //       className="btn"
          //       style={{
          //         backgroundColor: 'rgb(223, 223, 223)',
          //         fontWeight: '500',
          //       }}>
          //       Create
          //     </div>
          //   ),
          //   tooltip: 'Deactivate',
          //   isFreeAction: true,
          //   onClick: event => {
          //     setCreateopen(true);
          //   },
          // },
        ]}
        columns={columns}
        data={products}
        title="Products"
      />
    </div>
  );
}

export default ProductsTable;
