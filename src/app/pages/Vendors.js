import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getVendors} from '../../redux/actions/Vendors';
import '../css/pages/vendor.css';
import VendorUpdateForm from '../components/vendor/VendorUpdateForm';
import VendorCreateForm from '../components/vendor/VendorCreateForm';
import VendorTable from '../components/vendor/VendorTable';
function Vendors({setActiveTab}) {
  const vendors = useSelector(state => state.vendors);
  const dispatch = useDispatch();
  const [updateopen, setUpdateopen] = useState(false);
  const [createopen, setCreateopen] = useState(false);
  const [rowData, setRowData] = useState(false);

  const handleUpdateClose = () => {
    setUpdateopen(false);
    setRowData(null);
  };
  const handleCreateClose = () => {
    setCreateopen(false);
    setRowData(null);
  };
  useEffect(() => {
    dispatch(getVendors());

    setActiveTab(1);
  }, []);
  const columns = [
    {title: 'Id', field: 'id'},
    {title: 'Vendor', field: 'name'},
    {title: 'Phone', field: 'phoneNumber'},
    {title: 'Email', field: 'email'},
    {title: 'Address', field: 'address'},
    {title: 'Primary Contact Name', field: 'primaryContactName'},
    {
      title: 'Status',
      field: 'isActive',
      render: row => (row.isActive ? 'Active' : 'InActive'),
    },
  ];
  return (
    <div className="vendor">
      <VendorTable
        columns={columns}
        data={vendors}
        setUpdateopen={setUpdateopen}
        updateopen={updateopen}
        setCreateopen={setCreateopen}
        createopen={createopen}
        setRowData={setRowData}
      />
      {rowData ? (
        <VendorUpdateForm
          open={updateopen}
          handleClose={handleUpdateClose}
          data={rowData}
        />
      ) : null}
      <VendorCreateForm open={createopen} handleClose={handleCreateClose} />
      {/* <Dtable /> */}
    </div>
  );
}

export default Vendors;
