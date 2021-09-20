// import MUIDataTable from 'mui-datatables';
import MaterialTable, {MTableToolbar} from 'material-table';
import React, {useRef, useState} from 'react';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import RemoveCircleOutlineOutlinedIcon from '@mui/icons-material/RemoveCircleOutlineOutlined';
import {getVendors} from '../../../redux/actions/Vendors';
import {useDispatch} from 'react-redux';
import {toast} from 'react-toastify';
import axios from 'axios';
function VendorTable({
  columns,
  data,
  setCreateopen,
  setUpdateopen,
  setRowData,
}) {
  const dispatch = useDispatch();
  const tableRef = useRef();
  const [search, setSearch] = useState('yash');
  console.log(search);
  const deactivate = async id => {
    await axios
      .delete(`https://test-api.zasket.in/customer/vendors/${id}`)
      .then(res => {
        console.log(res);
        toast.success('Vendor deactivated', {
          position: 'top-right',
          autoClose: 2000,
        });
        dispatch(getVendors());
      })
      .catch(err => {
        console.log(err);
        toast.error('Something went wrong', {
          position: 'top-right',
          autoClose: 2000,
        });
      });
  };
  return (
    <div style={{maxWidth: '100%'}}>
      <MaterialTable
        style={{padding: '0 8px', boxShadow: 'none'}}
        onSearchChange={e => {
          setSearch(e);
        }}
        ref={tableRef}
        options={{
          paging: false,
          padding: 'dense',
          actionsColumnIndex: -1,
          debounceInterval: 1000,
          searchText: search,
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
            icon: () => <RemoveCircleOutlineOutlinedIcon />,
            tooltip: 'Deactivate',
            onClick: (event, rowData) => {
              deactivate(rowData.id);
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

export default VendorTable;
