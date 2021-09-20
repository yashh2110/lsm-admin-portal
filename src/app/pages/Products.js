import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getProducts} from '../../redux/actions/Products';
import {getPurchaseOrders} from '../../redux/actions/PurchaseOrders';
import PurchaseOrderCreateForm from '../components/purchaseorders/PurchaseOrderCreateForm';
import PurchaseOrderTable from '../components/purchaseorders/PurchaseOrderTable';
import PurchaseOrderUpdateForm from '../components/purchaseorders/PurchaseOrderUpdateForm';
import '../css/pages/vendor.css';

function Products({setActiveTab}) {
  const orders = useSelector(state => state.products);
  const dispatch = useDispatch();
  //   const [updateopen, setUpdateopen] = useState(false);
  //   const [createopen, setCreateopen] = useState(false);
  //   const [rowData, setRowData] = useState(false);
  //   const handleUpdateClose = () => {
  //     setUpdateopen(false);
  //     setRowData(null);
  //   };
  //   const handleCreateClose = () => {
  //     setCreateopen(false);
  //     setRowData(null);
  //   };
  useEffect(() => {
    dispatch(getProducts());
    setActiveTab(3);
  }, []);
  console.log(orders);
  const columns = [
    {title: 'Id', field: 'id'},
    {title: 'Vendor Id', field: 'vendorId'},
    {title: 'Warehouse Id', field: 'warehouseId'},
    {title: 'Order Amount', field: 'orderAmount'},
    {title: 'Purchase State', field: 'purchaseState'},
    {title: 'Payment State', field: 'paymentState'},
    {
      title: 'Comments',
      field: 'comments',
    },
  ];
  return (
    <div className="vendor">
      <PurchaseOrderTable
        columns={columns}
        data={orders}
        // setUpdateopen={setUpdateopen}
        // updateopen={updateopen}
        // setCreateopen={setCreateopen}
        // createopen={createopen}
        // setRowData={setRowData}
      />
      {/* {rowData ? (
        <PurchaseOrderUpdateForm
          open={updateopen}
          handleClose={handleUpdateClose}
          data={rowData}
        />
      ) : null}
      {/* <Dtable /> */}
      {/* <PurchaseOrderCreateForm
        open={createopen}
        handleClose={handleCreateClose}
      />  */}
    </div>
  );
}

export default Products;
