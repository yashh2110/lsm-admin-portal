import React, {useReducer, useRef, useState} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';

import DialogTitle from '@mui/material/DialogTitle';
import {toast} from 'react-toastify';

import {createInvoices, uploadInvoices} from './PurchaseOrderService';

const initial = {
  name: '',
  amount: '',
  invoiceLink: '',
};
const reducer = (state, {type, payload}) => {
  switch (type) {
    case 'initial':
      return initial;
    case 'invoiceLink':
      return {...state, invoiceLink: payload};
    case 'name':
      return {...state, name: payload};
    case 'amount':
      return {...state, amount: parseInt(payload)};
    default:
      return state;
  }
};

function UploadInvoices({open, handleClose, purchaseId}) {
  const [form, dispatch] = useReducer(reducer, initial);
  const [imageLoading, setImageLoading] = useState(false);
  const [imageUploaded, setImageUploaded] = useState(false);
  const [imageSelected, setImageSelected] = useState(false);
  const invoiceFileRef = useRef();
  console.log(form);
  const submit = async e => {
    e.preventDefault();
    createInvoices(purchaseId, form)
      .then(res => {
        toast.success('Invoice Created Succefully', {
          position: 'top-right',
          autoClose: 2000,
        });
        handleClose();
        dispatch({type: 'initial'});
        setImageUploaded(false);
      })
      .catch(err => {
        console.log(err);
        toast.error('Something went wrong');
      });
  };

  const uploadImage = () => {
    const e = invoiceFileRef.current.files[0];
    if (e) {
      setImageLoading(true);
      let formData = new FormData();
      formData.append('file', e);
      uploadInvoices(formData)
        .then(res => {
          console.log(res.data);
          dispatch({type: 'invoiceLink', payload: res.data});
          setImageUploaded(true);
          setImageLoading(false);
        })
        .catch(err => {
          console.log(err);
          setImageLoading(false);
        });
    } else {
      toast.error('Please Select image');
    }
  };
  return (
    <Dialog
      open={open}
      onClose={() => {
        dispatch({type: 'initial'});
        handleClose();
      }}
      className="p-4">
      <DialogTitle>Create Invoice</DialogTitle>
      <form onSubmit={submit}>
        <DialogContent>
          <div className="d-flex justify-content-center align-items-end">
            <TextField
              required
              autoFocus
              margin="dense"
              id="invoiceLink"
              inputRef={invoiceFileRef}
              onChange={() => {
                setImageSelected(true);
                setImageUploaded(false);
              }}
              InputLabelProps={{
                shrink: true,
              }}
              sx={{mr: '5px'}}
              label="Invoice"
              type="file"
              variant="standard"
              fullWidth
            />
            <Button
              variant="outlined"
              disabled={imageSelected ? false : true}
              color="secondary"
              onClick={uploadImage}
              className="mb-1 ">
              {imageLoading
                ? 'loading..'
                : imageUploaded
                ? 'Uploaded'
                : 'Upload'}
            </Button>
          </div>

          <TextField
            required
            margin="dense"
            id="name"
            value={form.name}
            onChange={e => dispatch({type: 'name', payload: e.target.value})}
            label="Invoice Name"
            type="text"
            variant="standard"
            fullWidth
          />
          <TextField
            required
            fullWidth
            margin="dense"
            value={form.amount}
            onChange={e => dispatch({type: 'amount', payload: e.target.value})}
            id="amount"
            label="Amount"
            type="number"
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button
            type="submit"
            disabled={form.invoiceLink?.length >= 1 ? false : true}>
            Create
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}

export default UploadInvoices;
