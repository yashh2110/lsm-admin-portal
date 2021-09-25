import React, {Fragment, useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  addProducts,
  getProductCategory,
  getProducts,
} from '../../redux/actions/Products';
import ProductsTable from '../components/products/ProductsTable';
import {Waypoint} from 'react-waypoint';
import '../css/pages/vendor.css';

function Products({setActiveTab}) {
  const products = useSelector(state => state.products.products);
  const filters = useSelector(state => state.products.filters);
  const [page, setPage] = useState(0);
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
    dispatch(
      getProducts({
        name: filters.name,
        category: filters.category,
        active: filters.active,
        page,
      }),
    );
    dispatch(getProductCategory());
    setActiveTab(0);
  }, []);
  console.log(products, 'addpro');

  const columns = [
    {
      title: 'Id',
      field: 'id',
      render: rowdata => {
        return (
          <Fragment>
            <Waypoint
              onEnter={() => {
                if (rowdata.tableData.id === products.length - 2) {
                  dispatch(
                    addProducts({
                      name: filters.name,
                      category: filters.category,
                      active: filters.active,
                      page: page + 1,
                    }),
                  );
                  setPage(i => i + 1);
                }
              }}></Waypoint>
            {rowdata.id}
          </Fragment>
        );
      },
    },
    {
      title: 'Name',
      field: 'name',
    },
    {
      title: 'Sub Name',
      field: 'subName',
    },
    {title: 'category', field: 'categoryName'},
    {title: 'Actual Price', field: 'actualPrice'},
    {title: 'Discount Price', field: 'discountedPrice'},
    {title: 'Reorder Qauntity', field: 'thresholdQuantity'},
    {title: 'Available Quantity', field: 'availableQuantity'},
    {title: 'Item Cap', field: 'maxAllowedQuantity'},
    {title: 'Priority', field: 'priority'},
    {title: 'On Demand', field: 'onDemand'},
    {title: 'Status', field: 'isActive'},
  ];
  return (
    <div className="vendor">
      <ProductsTable
        columns={columns}
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
