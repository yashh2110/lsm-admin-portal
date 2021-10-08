import React, {useEffect, useState} from 'react';
import '../css/pages/vendor.css';
import '../css/pages/purchaseOrdersCreate.css';
import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined';
import {useHistory} from 'react-router-dom';
import {Button} from '@mui/material';

import axios from 'axios';

import {BiRupee} from 'react-icons/bi';
import img from '../../assets/images/img.jpg';

function ViewPurchaseOrder({orderId}) {
  const [p_order, setP_order] = useState();
  const history = useHistory();
  const fetchOrder = async () => {
    await axios
      .get(`https://api.zasket.in/inventory/api/1/purchase-order/${orderId}`)
      .then(res => {
        setP_order(res.data);
      })
      .then(err => {
        console.log(err);
      });
  };
  useEffect(() => {
    fetchOrder();
  }, []);
  return (
    <div className="vendor">
      {p_order ? (
        <>
          <div className="pocreateHead">
            <div
              className="pocBack"
              onClick={() => {
                history.goBack();
              }}>
              <ArrowBackOutlinedIcon sx={{fontSize: '24px'}} />
            </div>
            <p className="pocTitle">{p_order.vendorName}'s Order</p>
            <Button
              variant="contained"
              style={{
                backgroundColor: ' rgb(223, 223, 223)',
                boxShadow: 'none',
                color: '#333',
                textTransform: 'capitalize',
                marginLeft: '20px',
              }}>
              Download Invoice
            </Button>
          </div>
          <div className="pocFormDiv">
            <div
              className="pocForm d-flex align-items-center flex-column"
              style={{width: '60%'}}>
              <div
                style={{width: '60%'}}
                className="d-flex justify-content-between">
                <label for="vendorName">
                  <b>Vendor Name :</b>
                </label>
                <p
                  style={{fontSize: '1.1rem', marginLeft: '10px'}}
                  id="vendorName">
                  {p_order.vendorName}
                </p>
              </div>
              <div
                style={{width: '60%'}}
                className="d-flex justify-content-between">
                <label for="Warehouse">
                  <b>Warehouse Name :</b>
                </label>
                <p
                  style={{fontSize: '1.1rem', marginLeft: '10px'}}
                  id="Warehouse">
                  {p_order.warehouseName}
                </p>
              </div>
              <div
                style={{width: '60%'}}
                className="d-flex justify-content-between">
                <label for="purchaseState">
                  <b>Purchase State :</b>
                </label>
                <p
                  style={{fontSize: '1.1rem', marginLeft: '10px'}}
                  id="purchaseState">
                  {p_order.purchaseState}
                </p>
              </div>
              <div
                style={{width: '60%'}}
                className="d-flex justify-content-between">
                <label for="paymentState">
                  <b>Payment State :</b>
                </label>
                <p
                  style={{fontSize: '1.1rem', marginLeft: '10px'}}
                  id="paymentState">
                  {p_order.paymentState}
                </p>
              </div>
              <div
                style={{width: '60%'}}
                className="d-flex justify-content-between">
                <label for="comments">
                  <b>Comments :</b>
                </label>
                <p
                  style={{fontSize: '1.1rem', marginLeft: '10px'}}
                  id="comments">
                  {p_order.comments}
                </p>
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
                Products
              </p>
              <div className="productPrev">
                {p_order.purchaseOrderItems.length >= 1 ? (
                  p_order.purchaseOrderItems.map(e => (
                    <div className="item">
                      <div className="itemDet">
                        <img src={img} alt="" className="itemImg" />
                        <div className="" style={{pointerEvents: 'none'}}>
                          <p className="itemName">{e.itemName}</p>
                        </div>
                      </div>
                      <div className="quantityDiv">
                        <p className="price">
                          <BiRupee className="mb-1" />
                          {e.totalPrice}
                        </p>

                        <div className="d-flex justify-content-center align-items-center">
                          <div className="qantity d-flex">
                            <input
                              type="text"
                              className="form-control counter"
                              value={e.quantity}
                              disabled
                              style={{width: '50px'}}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <p style={{fontSize: '1.1rem', fontWeight: '500'}}>
                    No Products
                  </p>
                )}
              </div>
              <div className="totalPriceDiv">
                <p className="totalPriceLabel">Total Price :</p>
                <p className="totalPrice">
                  <BiRupee className="mb-1" />
                  {p_order.orderAmount}
                </p>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </div>
  );
}

export default ViewPurchaseOrder;
