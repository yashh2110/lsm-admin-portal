import React, {useReducer} from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import DialogTitle from '@mui/material/DialogTitle';
import {useDispatch} from 'react-redux';
import {getVendors} from '../../../redux/actions/Vendors';
import {toast} from 'react-toastify';
import {updateVendorService} from './VendorService';
const reducer = (state, {type, payload}) => {
  switch (type) {
    case 'name':
      return {...state, name: payload};
    case 'phoneNumber':
      return {...state, phoneNumber: payload};
    case 'email':
      return {...state, email: payload};
    case 'address':
      return {...state, address: payload};
    case 'primaryContactName':
      return {...state, primaryContactName: payload};
    case 'primaryContactPhoneNumber':
      return {...state, primaryContactPhoneNumber: payload};
    case 'isActive':
      return {...state, isActive: payload};
    default:
      return state;
  }
};
function VendorUpdateForm({open, handleClose, data}) {
  const initial = data;
  const [form, dispatch] = useReducer(reducer, initial);
  const reducDispatch = useDispatch();
  const submit = async e => {
    e.preventDefault();
    updateVendorService(initial.id, form)
      .then(res => {
        reducDispatch(getVendors());
        toast.success('Edited Succefully', {
          position: 'top-right',
          autoClose: 2000,
        });
        handleClose();
      })
      .catch(err => {
        console.log(err);
        toast.error('Something went wrong', {
          position: 'top-right',
          autoClose: 2000,
        });
      });
  };
  return (
    <Dialog open={open} onClose={handleClose} className="p-4">
      <DialogTitle>Edit</DialogTitle>
      <form onSubmit={submit}>
        <DialogContent>
          <TextField
            required
            autoFocus
            margin="dense"
            id="name"
            value={form.name}
            onChange={e => dispatch({type: 'name', payload: e.target.value})}
            label="Vendor Name"
            type="text"
            variant="standard"
            fullWidth
          />
          <TextField
            required
            fullWidth
            margin="dense"
            value={form.phoneNumber}
            onChange={e =>
              dispatch({type: 'phoneNumber', payload: e.target.value})
            }
            id="phone"
            label="Phone Number"
            type="text"
            variant="standard"
          />
          <TextField
            fullWidth
            value={form.email}
            onChange={e => dispatch({type: 'email', payload: e.target.value})}
            margin="dense"
            id="email"
            label="Email Address"
            type="text"
            variant="standard"
          />
          <TextField
            required
            fullWidth
            value={form.address}
            onChange={e => dispatch({type: 'address', payload: e.target.value})}
            margin="dense"
            id="adress"
            label="Address"
            type="text"
            variant="standard"
          />
          <TextField
            required
            fullWidth
            margin="dense"
            value={form.primaryContactName}
            onChange={e =>
              dispatch({type: 'primaryContactName', payload: e.target.value})
            }
            id="pcn"
            label="Primary Contact Name"
            type="text"
            variant="standard"
          />
          <TextField
            required
            fullWidth
            margin="dense"
            value={form.primaryContactPhoneNumber}
            onChange={e =>
              dispatch({
                type: 'primaryContactPhoneNumber',
                payload: e.target.value,
              })
            }
            id="pcnum"
            label="Primary Contact Number"
            type="text"
            variant="standard"
          />
          <FormControl fullWidth variant="standard" sx={{m: 1, minWidth: 120}}>
            <InputLabel id="status">Status</InputLabel>
            <Select
              labelId="status"
              id="selectStatus"
              label="Status"
              onChange={e =>
                dispatch({type: 'isActive', payload: e.target.value})
              }
              value={form.isActive}>
              <MenuItem value={true} className="d-block p-2">
                True
              </MenuItem>
              <MenuItem value={false} className="d-block p-2">
                false
              </MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit">Update</Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}

export default VendorUpdateForm;
