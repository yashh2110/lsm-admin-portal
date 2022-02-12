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
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import ProductsUpdateForm from '../components/products/ProductsUpdateForm';
import ProductCreateForm from '../components/products/ProductsCreateForm';
import ViewProduct from '../components/products/ViewProduct';
import {Dropdown, Popover, Whisper} from 'rsuite';
import {useHistory} from 'react-router-dom';
import ProductDuplicateForm from '../components/products/ProductDuplicateForm';
import AddStock from '../components/products/AddStock';
import AdjustStock from '../components/products/AdjustStock';

const RenderMenu = React.forwardRef(
  (
    {
      rowData,
      onClose,
      setSelectedData,
      setRowData,
      setUpdateopen,
      setViewProduct,
      setDuplicateOpen,
      setAdjustStockOpen,
      setAddStockOpen,
      onDemand,
      ...rest
    },
    ref,
  ) => {
    const handleSelect = eventKey => {
      onClose();
    };
    const history = useHistory();

    return (
      <Popover ref={ref} {...rest} full>
        <Dropdown.Menu onSelect={handleSelect}>
          <Dropdown.Item
            onClick={() => {
              setRowData(rowData);
              setViewProduct(true);
            }}>
            View Product
          </Dropdown.Item>
          <Dropdown.Item
            onClick={() => {
              setUpdateopen(true);
              setRowData(rowData);
            }}>
            Edit Product
          </Dropdown.Item>
          {!onDemand ? (
            <>
              <Dropdown.Item
                onClick={() => {
                  setAdjustStockOpen(true);
                  setRowData(rowData);
                }}>
                Adjust Stock
              </Dropdown.Item>
              <Dropdown.Item
                onClick={() => {
                  setAddStockOpen(true);
                  setRowData(rowData);
                }}>
                Add Stock
              </Dropdown.Item>
            </>
          ) : null}
          <Dropdown.Item
            onClick={() => {
              setDuplicateOpen(true);
              setRowData(rowData);
            }}>
            Duplicate Product
          </Dropdown.Item>
        </Dropdown.Menu>
      </Popover>
    );
  },
);

function Products({setActiveTab}) {
  const products = useSelector(state => state.products.products);
  const filters = useSelector(state => state.products.filters);
  const [page, setPage] = useState(0);
  const [addStockOpen, setAddStockOpen] = useState(false);
  const [adjustStockOpen, setAdjustStockOpen] = useState(false);
  const dispatch = useDispatch();
  const [updateopen, setUpdateopen] = useState(false);
  const [createopen, setCreateopen] = useState(false);
  const [duplicateOpen, setDuplicateOpen] = useState(false);
  const [viewProduct, setViewProduct] = useState(false);
  const [rowData, setRowData] = useState(null);
  const handleUpdateClose = () => {
    setUpdateopen(false);
    setRowData(null);
  };
  const handleDuplicateClose = () => {
    setDuplicateOpen(false);
    setRowData(null);
  };
  const handleCreateClose = () => {
    setCreateopen(false);
    setRowData(null);
  };
  const handleViewClose = () => {
    setViewProduct(false);
    setRowData(null);
  };
  const handleAddStockClose = () => {
    setAddStockOpen(false);
    setRowData(null);
  };
  const handleAdjustClose = () => {
    setAdjustStockOpen(false);
    setRowData(null);
  };
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
  const popref = React.useRef();
  const columns = [
    {
      title: 'Id',
      field: 'id',
      render: rowdata => {
        return (
          <>
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
    {
      title: 'Tag',
      render: rowdata =>
        rowdata?.itemTag ? (
          <p style={{minWidth: 70}}>{rowdata.itemTag}</p>
        ) : (
          'N/A'
        ),
    },
    {title: 'Actual Price', field: 'actualPrice'},
    {title: 'Discount Price', field: 'discountedPrice'},
    {title: 'Reorder Qauntity', field: 'thresholdQuantity'},
    {title: 'Available Quantity', field: 'availableQuantity'},
    {title: 'Item Cap', field: 'maxAllowedQuantity'},
    {title: 'Priority', field: 'priority'},
    {title: 'On Demand', field: 'onDemand'},
    {title: 'Status', field: 'isActive'},
    {title: 'User Applicability', field: 'userApplicability'},
    {
      title: 'Actions',
      render: rowData => {
        return (
          <Whisper
            placement="autoVerticalEnd"
            trigger="click"
            ref={popref}
            speaker={
              <RenderMenu
                rowData={rowData}
                setRowData={setRowData}
                setViewProduct={setViewProduct}
                setUpdateopen={setUpdateopen}
                onDemand={rowData.onDemand}
                setDuplicateOpen={setDuplicateOpen}
                setAddStockOpen={setAddStockOpen}
                setAdjustStockOpen={setAdjustStockOpen}
                setRowData={setRowData}
                onClose={() => popref.current.close()}
              />
            }>
            <MoreHorizIcon />
          </Whisper>
        );
      },
    },
  ];
  return (
    <div className="vendor">
      <ProductsTable
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
      {/* {rowData ? (
        <PurchaseOrderUpdateForm
          open={updateopen}
          handleClose={handleUpdateClose}
          data={rowData}
        />
      ) : null}
      {/* <Dtable /> */}
      <ProductCreateForm open={createopen} handleClose={handleCreateClose} />
      {rowData ? (
        <ViewProduct
          open={viewProduct}
          data={rowData}
          handleClose={handleViewClose}
        />
      ) : null}
      {rowData ? (
        <ProductsUpdateForm
          open={updateopen}
          handleClose={handleUpdateClose}
          data={rowData}
        />
      ) : null}
      {rowData ? (
        <ProductDuplicateForm
          open={duplicateOpen}
          handleClose={handleDuplicateClose}
          data={rowData}
        />
      ) : null}
      {rowData ? (
        <AddStock
          open={addStockOpen}
          handleClose={handleAddStockClose}
          product_id={rowData.id}
        />
      ) : null}
      {rowData ? (
        <AdjustStock
          open={adjustStockOpen}
          handleClose={handleAdjustClose}
          product_id={rowData.id}
          availableQuantity={rowData.availableQuantity}
        />
      ) : null}
    </div>
  );
}

export default Products;
