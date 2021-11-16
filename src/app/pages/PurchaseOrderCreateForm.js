import React, {useEffect, useReducer, useState} from 'react';
import '../css/pages/vendor.css';
import '../css/pages/purchaseOrdersCreate.css';
import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined';
import {useHistory} from 'react-router-dom';
import TextField from '@mui/material/TextField';
import {Button, FormControl, InputLabel, MenuItem, Select} from '@mui/material';
import {useDispatch} from 'react-redux';
import {getVendors} from '../../redux/actions/Vendors';
import {getWarehouses} from '../../redux/actions/Warehouses';
import {useSelector} from 'react-redux';
import ProductFilterItem from '../components/purchaseorders/ProductFilterItem';
import ProductPreviewItem from '../components/purchaseorders/ProductPreviewItem';
import animationData from '../../assets/loaders/empty.json';
import Lottie from 'react-lottie';
import {BiRupee} from 'react-icons/bi';
import {toast} from 'react-toastify';
import {
  createPurchaseOrderService,
  productSearchService,
} from '../components/purchaseorders/PurchaseOrderService';
const initialState = {
  vendorId: '',
  warehouseId: '',
  po_paymentState: '',
  po_purchaseState: '',
  comments: '',
  purchaseOrderItemsRequests: [],
  orderAmount: 0,
};
const reducer = (state, {type, payload}) => {
  switch (type) {
    case 'vendorId':
      return {...state, vendorId: payload};
    case 'warehouseId':
      return {...state, warehouseId: payload};
    case 'po_paymentState':
      return {...state, po_paymentState: payload};
    case 'po_purchaseState':
      return {...state, po_purchaseState: payload};
    case 'comments':
      return {...state, comments: payload};
    case 'orderAmount':
      return {...state, orderAmount: payload};
    case 'addProductItems':
      return {
        ...state,
        purchaseOrderItemsRequests: [
          payload,
          ...state.purchaseOrderItemsRequests,
        ],
        orderAmount: state.orderAmount + payload.totalQuantityPrice,
      };
    case 'updateProducts':
      let count = 0;
      const updatedProductItems = state.purchaseOrderItemsRequests.map(i => {
        if (i['itemId'] === payload['itemId']) {
          count = count + payload.totalQuantityPrice;
          return payload;
        } else {
          count = count + i.totalQuantityPrice;
          return i;
        }
      });
      return {
        ...state,
        purchaseOrderItemsRequests: updatedProductItems,
        orderAmount: count,
      };
    case 'removeProductItems':
      const filterdList = state.purchaseOrderItemsRequests.filter(
        i => i['itemId'] !== payload['itemId'],
      );
      return {
        ...state,
        purchaseOrderItemsRequests: filterdList,
        orderAmount: state.orderAmount - payload.totalQuantityPrice,
      };
    case 'itemQuantity':
      const quantityfilterdList = state.purchaseOrderItemsRequests.map(i => {
        if (i['id'] === payload['id']) {
          i['quantity'] = payload['quantity'];
        }
        return i;
      });
      return {...state, purchaseOrderItemsRequests: quantityfilterdList};
    default:
      return state;
  }
};
function PurchaseOrderCreateForm({setActiveTab}) {
  const vendors = useSelector(state => state.vendors);
  const warehouses = useSelector(state => state.warehouses);
  const history = useHistory();
  const dispatch = useDispatch();
  const [pocForm, formDispatch] = useReducer(reducer, initialState);
  const [filterProducts, setFilterProducts] = useState();
  const [filterLoading, setFilterloading] = useState(false);

  const productSearch = async query => {
    setFilterloading(true);
    if (query.length >= 1) {
      productSearchService(query)
        .then(res => {
          setFilterProducts(res.data.products);
          setFilterloading(false);
        })
        .catch(err => {
          console.log(err);
          setFilterloading(false);
        });
    } else {
      setFilterProducts(null);
      setFilterloading(false);
    }
  };
  const pocSubmit = async () => {
    createPurchaseOrderService(pocForm)
      .then(res => {
        toast.success('Purchase Order Created', {
          position: 'top-right',
          autoClose: 2000,
        });
        history.goBack();
      })
      .catch(err => {
        console.log(err);
        toast.error('Something Went Worng', {
          position: 'top-right',
          autoClose: 2000,
        });
      });
  };
  useEffect(() => {
    dispatch(getVendors());
    dispatch(getWarehouses());
    setActiveTab(3);
  }, []);
  return (
    <div className="vendor">
      <div className="pocreateHead">
        <div className="d-flex justify-content-center align-items-center">
          <div
            className="pocBack"
            onClick={() => {
              history.goBack();
            }}>
            <ArrowBackOutlinedIcon sx={{fontSize: '24px'}} />
          </div>
          <p className="pocTitle">Create Purchase Order</p>
        </div>
      </div>
      <div className="pocFormDiv">
        <div className="pocForm">
          <div className="d-flex justify-content-center">
            <FormControl
              variant="standard"
              sx={{m: 1, maxWidth: '34%'}}
              color="secondary"
              className="pocInput">
              <InputLabel id="status">Select Vendor</InputLabel>
              <Select
                labelId="status"
                id="selectStatus"
                label="Status"
                value={pocForm.vendorId}
                onChange={e =>
                  formDispatch({type: 'vendorId', payload: e.target.value})
                }>
                <MenuItem value="" className="d-block p-2">
                  None
                </MenuItem>
                {vendors
                  ? vendors.map(i => (
                      <MenuItem value={i.id} key={i.id} className="d-block p-2">
                        {i.name}
                      </MenuItem>
                    ))
                  : null}
              </Select>
            </FormControl>
            <FormControl
              variant="standard"
              sx={{m: 1, maxWidth: '34%'}}
              color="secondary"
              className="pocInput">
              <InputLabel id="status">Select Warehouse</InputLabel>
              <Select
                labelId="status"
                id="selectStatus"
                label="Status"
                value={pocForm.warehouseId}
                onChange={e =>
                  formDispatch({type: 'warehouseId', payload: e.target.value})
                }>
                <MenuItem value="" className="d-block p-2">
                  None
                </MenuItem>
                {warehouses
                  ? warehouses.map(i => (
                      <MenuItem value={i.id} key={i.id} className="d-block p-2">
                        {i.name}
                      </MenuItem>
                    ))
                  : null}
              </Select>
            </FormControl>
          </div>
          <div className="d-flex justify-content-center">
            <FormControl
              variant="standard"
              sx={{m: 1, maxWidth: '34%'}}
              color="secondary"
              className="pocInput">
              <InputLabel id="status">Purchase State</InputLabel>
              <Select
                labelId="status"
                id="selectStatus"
                label="Status"
                value={pocForm.po_purchaseState}
                onChange={e =>
                  formDispatch({
                    type: 'po_purchaseState',
                    payload: e.target.value,
                  })
                }>
                <MenuItem value="" className="d-block p-2">
                  None
                </MenuItem>
                <MenuItem value="NOT_RECEIVED" className="d-block p-2">
                  NOT_RECEIVED
                </MenuItem>
                <MenuItem value="RECEIVED" className="d-block p-2">
                  RECEIVED
                </MenuItem>
              </Select>
            </FormControl>
            <FormControl
              variant="standard"
              sx={{m: 1, maxWidth: '34%'}}
              color="secondary"
              className="pocInput">
              <InputLabel id="status">Payment State</InputLabel>
              <Select
                labelId="status"
                id="selectStatus"
                label="Status"
                value={pocForm.po_paymentState}
                onChange={e =>
                  formDispatch({
                    type: 'po_paymentState',
                    payload: e.target.value,
                  })
                }>
                <MenuItem value="" className="d-block p-2">
                  None
                </MenuItem>
                <MenuItem value="NOT_PAID" className="d-block p-2">
                  NOT_PAID
                </MenuItem>
                <MenuItem value="PAID" className="d-block p-2">
                  PAID
                </MenuItem>
              </Select>
            </FormControl>
          </div>

          <div className="d-flex justify-content-center">
            <TextField
              label="Comments"
              variant="standard"
              value={pocForm.comments}
              sx={{width: '74%', margin: '10px'}}
              onChange={e =>
                formDispatch({
                  type: 'comments',
                  payload: e.target.value,
                })
              }
            />
          </div>
          <div className="d-flex justify-content-center flex-column align-items-center">
            <TextField
              label="Search & Add Products"
              variant="standard"
              onChange={e => productSearch(e.target.value)}
              sx={{
                width: '74%',
                margin: '10px',
                marginBottom: '0',
                paddingBottom: '0',
              }}
            />
            {!filterLoading ? (
              <div
                style={{
                  width: '74%',
                  margin: '10px',
                  marginTop: '0',
                  height: '500px',
                  overflow: 'auto',
                }}>
                {filterProducts
                  ? filterProducts.map(i => {
                      return (
                        <ProductFilterItem
                          i={i}
                          key={i.id}
                          dispatch={formDispatch}
                          addedProducts={pocForm.purchaseOrderItemsRequests}
                        />
                      );
                    })
                  : null}
              </div>
            ) : (
              <p>loading...</p>
            )}
            {/* {!filterLoading ? (
              <div
                style={{
                  width: '74%',
                  margin: '10px',
                  marginTop: '0',
                  height: '230px',
                  overflow: 'auto',
                }}>
                {filterProducts ? (
                  filterProducts.map(i => <div key={i.id}>{i.name}</div>)
                ) : (
                  <p>loading...</p>
                )}
              </div>
            ) : null} */}
          </div>
        </div>
        <div className="pocPrev">
          <p
            className=""
            style={{
              fontSize: '1.1rem',
              fontWeight: '500',
              color: 'grba(0,0,0,0.5)',
            }}>
            Checkout
          </p>
          <div className="productPrev">
            {pocForm.purchaseOrderItemsRequests.length >= 1 ? (
              pocForm.purchaseOrderItemsRequests.map(e => (
                <ProductPreviewItem
                  e={e}
                  key={e.item.id}
                  dispatch={formDispatch}
                  pocForm={pocForm}
                />
              ))
            ) : (
              <div
                className="d-flex align-items-center justify-content-center flex-column"
                style={{height: '100%'}}>
                <Lottie
                  height={150}
                  width={150}
                  options={{
                    loop: true,
                    autoplay: true,
                    animationData: animationData,
                    // rendererSettings: {
                    //   preserveAspectRatio: 'xMidYMid slice',
                    // },
                  }}
                />
                <p style={{fontSize: '1.1rem', fontWeight: '500'}}>
                  No Products
                </p>
              </div>
            )}
          </div>
          <div className="totalPriceDiv">
            <p className="totalPriceLabel">Total Price :</p>
            <p className="totalPrice">
              <BiRupee className="mb-1" />
              {pocForm.orderAmount}
            </p>
          </div>
          <div className="d-flex justify-content-end">
            <Button
              variant="contained"
              color="info"
              onClick={pocSubmit}
              disabled={
                pocForm.vendorId &&
                pocForm.warehouseId &&
                pocForm.po_paymentState &&
                pocForm.po_purchaseState
                  ? false
                  : true
              }>
              Submit
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PurchaseOrderCreateForm;
