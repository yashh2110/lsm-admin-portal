// import MUIDataTable from 'mui-datatables';
import MaterialTable, {MTableToolbar} from 'material-table';
import React from 'react';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
// import RemoveCircleOutlineOutlinedIcon from '@mui/icons-material/RemoveCircleOutlineOutlined';
// import {getVendors} from '../../../redux/actions/Vendors';
// import {useDispatch} from 'react-redux';
// import {toast} from 'react-toastify';
// import {deactivateVendorService} from './VendorService';
function BannerTable({
  columns,
  data,
  setCreateopen,
  setUpdateopen,
  setRowData,
}) {
  //   const dispatch = useDispatch();

  //   const deactivate = async id => {
  //     deactivateVendorService(id)
  //       .then(res => {
  //         toast.success('Vendor deactivated', {
  //           position: 'top-right',
  //           autoClose: 2000,
  //         });
  //         dispatch(getVendors());
  //       })
  //       .catch(err => {
  //         console.log(err);
  //         toast.error('Something went wrong', {
  //           position: 'top-right',
  //           autoClose: 2000,
  //         });
  //       });
  //   };
  return (
    <div style={{maxWidth: '100%'}}>
      <MaterialTable
        style={{padding: '0 8px', boxShadow: 'none'}}
        options={{
          paging: false,
          padding: 'dense',
          actionsColumnIndex: -1,
          debounceInterval: 1000,
          minBodyHeight: 'calc(100vh - (92px + 67px + 16px))',
          maxBodyHeight: 'calc(100vh - (92px + 67px + 16px))',
          rowStyle: {
            fontSize: '15px',
          },
        }}
        localization={{
          toolbar: {},
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
            tooltip: 'create',
            isFreeAction: true,
            onClick: event => {
              setCreateopen(true);
            },
          },
        ]}
        columns={columns}
        data={data}
        title="Offer Management"
      />
    </div>
  );
}

export default BannerTable;
