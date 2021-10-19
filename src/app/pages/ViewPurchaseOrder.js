import React, {useEffect, useState} from 'react';
import '../css/pages/vendor.css';
import '../css/pages/purchaseOrdersCreate.css';
import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined';
import {useHistory} from 'react-router-dom';
import {Button} from '@mui/material';
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';

import {BiRupee} from 'react-icons/bi';
import img from '../../assets/images/img.jpg';
import UploadInvoices from '../components/purchaseorders/UploadInvoices';
import {getPurchaseOrder} from '../components/purchaseorders/PurchaseOrderService';
import DownloadInvoices from '../components/purchaseorders/DownloadInvoices';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';

function ViewPurchaseOrder({orderId}) {
  const [p_order, setP_order] = useState();
  const [createopen, setCreateopen] = useState(false);
  const [downloadOpen, setDownloadOpen] = useState(false);
  const history = useHistory();
  const fetchOrder = async () => {
    getPurchaseOrder(orderId)
      .then(res => {
        setP_order(res.data);
      })
      .then(err => {
        console.log(err);
      });
  };

  const handleCreateClose = () => {
    setCreateopen(false);
  };
  const handleDownloadClose = () => {
    setDownloadOpen(false);
  };
  useEffect(() => {
    fetchOrder();
  }, []);
  return (
    <div className="vendor">
      {p_order ? (
        <>
          <div className="pocreateHead">
            <div className="d-flex justify-content-center align-items-center">
              <div
                className="pocBack"
                onClick={() => {
                  history.goBack();
                }}>
                <ArrowBackOutlinedIcon sx={{fontSize: '24px'}} />
              </div>
              <p className="pocTitle">{p_order.vendorName}'s Order</p>
            </div>
            <div>
              <Button
                variant="contained"
                onClick={() => setDownloadOpen(true)}
                style={{
                  backgroundColor: ' rgb(223, 223, 223)',
                  boxShadow: 'none',
                  color: '#333',
                  textTransform: 'capitalize',
                  marginLeft: '20px',
                }}>
                <FileDownloadOutlinedIcon />
                Download Invoices
              </Button>
              <Button
                variant="contained"
                onClick={() => setCreateopen(true)}
                style={{
                  backgroundColor: ' rgb(223, 223, 223)',
                  boxShadow: 'none',
                  color: '#333',
                  textTransform: 'capitalize',
                  marginLeft: '20px',
                }}>
                <FileUploadOutlinedIcon /> Upload Invoice
              </Button>
              <Button
                variant="contained"
                onClick={() =>
                  history.push({
                    pathname: '/purchaseorders/update',
                    state: {item: p_order},
                  })
                }
                style={{
                  backgroundColor: ' rgb(223, 223, 223)',
                  boxShadow: 'none',
                  color: '#333',
                  textTransform: 'capitalize',
                  marginLeft: '20px',
                }}>
                <EditOutlinedIcon sx={{fontSize: 20}} /> Edit
              </Button>
            </div>
          </div>
          <div className="pocFormDiv">
            <div
              className="pocForm d-flex align-items-center flex-column"
              style={{width: '60%'}}>
              <div
                style={{width: '60%'}}
                className="d-flex justify-content-between">
                <label htmlFor="vendorName">
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
                <label htmlFor="Warehouse">
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
                <label htmlFor="purchaseState">
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
                <label htmlFor="paymentState">
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
                <label htmlFor="comments">
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
                    <div className="item" key={e.id}>
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
      <UploadInvoices
        open={createopen}
        handleClose={handleCreateClose}
        purchaseId={orderId}
      />
      {downloadOpen ? (
        <DownloadInvoices
          open={downloadOpen}
          handleClose={handleDownloadClose}
          purchaseId={orderId}
        />
      ) : null}
    </div>
  );
}

export default ViewPurchaseOrder;
