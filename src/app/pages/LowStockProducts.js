import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {addLsProducts, getProductCategory} from '../../redux/actions/Products';
import {Waypoint} from 'react-waypoint';
import '../css/pages/vendor.css';

import ViewProduct from '../components/products/ViewProduct';
import LsProductTable from '../components/products/lowStock/LsProductTable';

function LsProducts({setActiveTab}) {
  const lsproducts = useSelector(state => state.products.lsproducts);
  const filters = useSelector(state => state.products.filters);
  const [page, setPage] = useState(0);

  const dispatch = useDispatch();
  const [updateopen, setUpdateopen] = useState(false);
  const [createopen, setCreateopen] = useState(false);
  const [viewProduct, setViewProduct] = useState(false);
  const [rowData, setRowData] = useState(null);

  const handleViewClose = () => {
    setViewProduct(false);
    setRowData(null);
  };
  useEffect(() => {
    dispatch(
      addLsProducts({
        name: filters.name,
        category: filters.category,
        active: filters.active,
        page,
      }),
    );
    dispatch(getProductCategory());
    setActiveTab(0);
  }, []);

  const columns = [
    {
      title: 'Id',
      field: 'id',
      render: rowdata => {
        return (
          <>
            <Waypoint
              onEnter={() => {
                if (rowdata.tableData.id === lsproducts.length - 2) {
                  dispatch(
                    addLsProducts({
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
          </>
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
      <LsProductTable
        columns={columns}
        setPage={setPage}
        setUpdateopen={setUpdateopen}
        updateopen={updateopen}
        setCreateopen={setCreateopen}
        createopen={createopen}
        setViewProduct={setViewProduct}
        viewProduct={viewProduct}
        setRowData={setRowData}
      />

      {rowData ? (
        <ViewProduct
          open={viewProduct}
          data={rowData}
          handleClose={handleViewClose}
        />
      ) : null}
    </div>
  );
}

export default LsProducts;
