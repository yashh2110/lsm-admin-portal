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
import {
  downloadPurchaseOrder,
  getPurchaseOrder,
} from '../components/purchaseorders/PurchaseOrderService';
import FileCopyOutlinedIcon from '@mui/icons-material/FileCopyOutlined';
import DownloadInvoices from '../components/purchaseorders/DownloadInvoices';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
function ViewPurchaseOrder({orderId}) {
  const [p_order, setP_order] = useState();
  const [createopen, setCreateopen] = useState(false);
  const [downloadOpen, setDownloadOpen] = useState(false);
  const history = useHistory();

  const handleCreateClose = () => {
    setCreateopen(false);
  };
  const handleDownloadClose = () => {
    setDownloadOpen(false);
  };
  // const downloadPo = ()=>{
  //   downloadPurchaseOrder(orderId).then(res=>{

  //   })
  // }
  useEffect(() => {
    getPurchaseOrder(orderId)
      .then(res => {
        setP_order(res.data);
      })
      .then(err => {
        console.log(err);
      });
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
            <div className="d-flex">
              <Button
                variant="contained"
                className="dropdown-item"
                onClick={() => downloadPurchaseOrder(orderId)}
                style={{
                  backgroundColor: ' rgb(223, 223, 223)',
                  boxShadow: 'none',
                  color: '#333',
                  textTransform: 'capitalize',
                  marginLeft: '20px',
                }}>
                <FileDownloadOutlinedIcon /> Download PO
              </Button>
              <div class="dropdown">
                <button
                  class="btn dropdown-toggle"
                  style={{
                    backgroundColor: ' rgb(223, 223, 223)',
                    boxShadow: 'none',
                    color: '#333',
                    textTransform: 'capitalize',
                    marginLeft: '20px',
                    fontWeight: '500',
                  }}
                  type="button"
                  id="dropdownMenuButton"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false">
                  <DescriptionOutlinedIcon sx={{fontSize: 24}} /> Invoices
                </button>
                <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                  <Button
                    variant="contained"
                    className="dropdown-item"
                    onClick={() => setDownloadOpen(true)}
                    style={{
                      backgroundColor: 'white',
                      boxShadow: 'none',
                      color: '#333',
                      textTransform: 'capitalize',
                      textAlign: 'left',
                    }}>
                    <FileDownloadOutlinedIcon />
                    Download Invoices
                  </Button>
                  <Button
                    variant="contained"
                    className="dropdown-item"
                    onClick={() => setCreateopen(true)}
                    style={{
                      backgroundColor: ' white',
                      boxShadow: 'none',
                      color: '#333',
                      textTransform: 'capitalize',
                    }}>
                    <FileUploadOutlinedIcon /> Upload Invoice
                  </Button>
                </div>
              </div>
              <Button
                variant="contained"
                className="dropdown-item"
                onClick={() =>
                  history.push({
                    pathname: `/purchaseorders/duplicate/${orderId}`,
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
                <FileCopyOutlinedIcon sx={{fontSize: 20}} /> Duplicate
              </Button>
              <Button
                variant="contained"
                onClick={() =>
                  history.push({
                    pathname: `/purchaseorders/update/${orderId}`,
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
                        <img
                          src={
                            e.itemImages[0]?.mediumImagePath
                              ? e.itemImages[0].mediumImagePath
                              : img
                          }
                          alt=""
                          className="itemImg"
                        />
                        <div className="" style={{pointerEvents: 'none'}}>
                          <p className="itemName">
                            {e.itemName} ({e.itemSubName})
                          </p>
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
                              style={{width: '75px'}}
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
      ) : (
        <p>Loading...</p>
      )}
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
