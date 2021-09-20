import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getWarehouses} from '../../redux/actions/Warehouses';
import WarehouseCreateForm from '../components/warehouse/WarehouseCreateForm';
import WarehouseTable from '../components/warehouse/WarehouseTable';
import WarehouseUpdateForm from '../components/warehouse/WarehouseUpdateForm';
import '../css/pages/vendor.css';

function Warehouses({setActiveTab}) {
  const vendors = useSelector(state => state.warehouses);
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
    dispatch(getWarehouses());
    setActiveTab(2);
  }, []);
  console.log(vendors);
  const columns = [
    {title: 'Id', field: 'id'},
    {title: 'Warehouse Name', field: 'name'},
    {title: 'Contact person', field: 'contactPerson'},
    {title: 'Contact phone', field: 'contactPhoneNumber'},
    {title: 'Address', field: 'address'},
    {title: 'Lat-Lon', field: 'latlon'},
    {
      title: 'Status',
      field: 'isActive',
      render: row => (row.isActive ? 'Active' : 'InActive'),
    },
  ];
  return (
    <div className="vendor">
      <WarehouseTable
        columns={columns}
        data={vendors}
        setUpdateopen={setUpdateopen}
        updateopen={updateopen}
        setCreateopen={setCreateopen}
        createopen={createopen}
        setRowData={setRowData}
      />
      {rowData ? (
        <WarehouseUpdateForm
          open={updateopen}
          handleClose={handleUpdateClose}
          data={rowData}
        />
      ) : null}
      {/* <Dtable /> */}
      <WarehouseCreateForm open={createopen} handleClose={handleCreateClose} />
    </div>
  );
}

export default Warehouses;
