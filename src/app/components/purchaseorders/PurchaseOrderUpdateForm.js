import React, {useReducer} from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';

import DialogTitle from '@mui/material/DialogTitle';
import axios from 'axios';
import {useDispatch} from 'react-redux';
import {toast} from 'react-toastify';
import {getPurchaseOrders} from '../../../redux/actions/PurchaseOrders';

const reducer = (state, {type, payload}) => {
  switch (type) {
    case 'vendorId':
      return {...state, vendorId: payload};
    case 'warehouseId':
      return {...state, warehouseId: payload};
    case 'orderAmount':
      return {...state, orderAmount: payload};
    case 'purchaseState':
      return {...state, purchaseState: payload};
    case 'paymentState':
      return {...state, paymentState: payload};
    case 'comments':
      return {...state, comments: payload};
    default:
      return state;
  }
};
function PurchaseOrderUpdateForm({open, handleClose, data}) {
  const initial = data;
  const [form, dispatch] = useReducer(reducer, initial);
  const reducDispatch = useDispatch();
  const submit = async () => {
    await axios
      .put(`https://test-api.zasket.in/customer/purchases/${form.id}`, form)
      .then(res => {
        console.log(res);
        reducDispatch(getPurchaseOrders());
        toast.success('Edited Succefully', {
          position: 'top-right',
          autoClose: 2000,
        });
        handleClose();
      })
      .catch(err => {
        console.log(err);
        toast.error('Something went wrong');
      });
  };
  console.log(form);
  return (
    <Dialog open={open} onClose={handleClose} className="p-4">
      <DialogTitle>Edit</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          id="vendorId"
          value={form.vendorId}
          onChange={e => dispatch({type: 'vendorId', payload: e.target.value})}
          label="Vendor Id"
          type="text"
          variant="standard"
          fullWidth
        />
        <TextField
          fullWidth
          margin="dense"
          value={form.warehouseId}
          onChange={e =>
            dispatch({type: 'warehouseId', payload: e.target.value})
          }
          id="warehouseId"
          label="Warehouse Id"
          type="text"
          variant="standard"
        />
        <TextField
          fullWidth
          value={form.orderAmount}
          onChange={e =>
            dispatch({type: 'orderAmount', payload: e.target.value})
          }
          margin="dense"
          id="orderAmount"
          label="Order Amount"
          type="text"
          variant="standard"
        />
        <TextField
          fullWidth
          value={form.purchaseState}
          onChange={e =>
            dispatch({type: 'purchaseState', payload: e.target.value})
          }
          margin="dense"
          id="purchaseState"
          label="Purchase State"
          type="text"
          variant="standard"
        />
        <TextField
          fullWidth
          margin="dense"
          value={form.paymentState}
          onChange={e =>
            dispatch({type: 'paymentState', payload: e.target.value})
          }
          id="paymentState"
          label="Payment State"
          type="text"
          variant="standard"
        />
        <TextField
          fullWidth
          margin="dense"
          value={form.comments}
          onChange={e =>
            dispatch({
              type: 'comments',
              payload: e.target.value,
            })
          }
          id="comments"
          label="Comments"
          type="text"
          variant="standard"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={submit}>Update</Button>
      </DialogActions>
    </Dialog>
  );
}

export default PurchaseOrderUpdateForm;
