import React, {useEffect, useState} from 'react';
import Button from '@material-ui/core/Button';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import OpenInNewOutlinedIcon from '@mui/icons-material/OpenInNewOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import DialogTitle from '@mui/material/DialogTitle';
import {
  deleteInvoice,
  deleteInvoices,
  getInvoices,
} from './PurchaseOrderService';
import {toast} from 'react-toastify';

function DownloadInvoices({open, handleClose, purchaseId}) {
  const [invoices, setInvoices] = useState([]);

  const getOrderInvoices = async orderId => {
    getInvoices(orderId)
      .then(res => {
        console.log(res.data);
        setInvoices(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  };
  const deleteOrderInvoice = async (purchaseid, invoiceid) => {
    deleteInvoice(purchaseid, invoiceid)
      .then(() => {
        toast.success('Invoice deleted Successfully', {
          position: 'top-right',
          autoClose: 2000,
        });
      })
      .catch(err => {
        toast.error('Something went wrong', {
          position: 'top-right',
          autoClose: 2000,
        });
      });
  };
  const deleteOrderInvoices = async () => {
    deleteInvoices(purchaseId)
      .then(() => {
        toast.success('Invoices deleted Successfully', {
          position: 'top-right',
          autoClose: 2000,
        });
      })
      .catch(err => {
        toast.error('Something went wrong', {
          position: 'top-right',
          autoClose: 2000,
        });
      });
  };
  useEffect(() => {
    getOrderInvoices(purchaseId);
  }, []);
  return (
    <Dialog
      open={open}
      onClose={() => {
        handleClose();
      }}
      className="p-4"
      fullWidth>
      <DialogTitle className="d-flex justify-content-between">
        <p>Invoices</p>{' '}
        <Button
          variant="outlined"
          onClick={() => deleteOrderInvoices()}
          size="small"
          style={{textTransform: 'capitalize'}}>
          <DeleteOutlineOutlinedIcon
            color="warning"
            sx={{fontSize: 25, margin: '5px'}}
          />
          Delete All
        </Button>
      </DialogTitle>
      <DialogContent>
        {invoices.length >= 1 ? (
          invoices.map(i => (
            <div key={i.id}>
              <a href={i.invoiceLink} target="_blank" rel="noopener noreferrer">
                <Button
                  variant="outlined"
                  style={{
                    margin: '5px',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    textTransform: 'capitalize',
                  }}>
                  <OpenInNewOutlinedIcon
                    sx={{fontSize: 20, marginRight: '5px'}}
                  />{' '}
                  {i.name}
                </Button>
              </a>
              <DeleteOutlineOutlinedIcon
                color="warning"
                sx={{fontSize: 25, margin: '5px'}}
                onClick={() => deleteOrderInvoice(i.purchaseId, i.id)}
              />
            </div>
          ))
        ) : (
          <p className="text-center">No Invoices</p>
        )}
      </DialogContent>

      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
      </DialogActions>
    </Dialog>
  );
}

export default DownloadInvoices;
