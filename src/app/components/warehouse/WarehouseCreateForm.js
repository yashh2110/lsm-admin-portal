import React, {useReducer, useState} from 'react';
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
import {toast} from 'react-toastify';
import {getWarehouses} from '../../../redux/actions/Warehouses';
import {createWareHouseService} from './WarehouseService';

const initial = {
  name: '',
  contactPerson: '',
  address: '',
  contactPhoneNumber: '',
  latlon: '',
  isActive: '',
};
const reducer = (state, {type, payload}) => {
  switch (type) {
    case 'initial':
      return initial;
    case 'name':
      return {...state, name: payload};
    case 'contactPerson':
      return {...state, contactPerson: payload};
    case 'address':
      return {...state, address: payload};
    case 'contactPhoneNumber':
      return {...state, contactPhoneNumber: payload};
    case 'latlon':
      return {...state, latlon: payload};
    case 'isActive':
      return {...state, isActive: payload};
    default:
      return state;
  }
};

function WarehouseCreateForm({open, handleClose}) {
  const [form, dispatch] = useReducer(reducer, initial);
  const reducDispatch = useDispatch();
  const [isDisabled, setIsDisabled] = useState(false);

  const submit = async e => {
    setIsDisabled(() => true);
    e.preventDefault();
    createWareHouseService(form)
      .then(res => {
        reducDispatch(getWarehouses());
        toast.success('Warehouse Created Succefully', {
          position: 'top-right',
          autoClose: 2000,
        });
        handleClose();
      })
      .catch(err => {
        console.log(err);
        toast.error('Something went wrong');
        setIsDisabled(() => false);
      });
  };
  return (
    <Dialog
      open={open}
      onClose={() => {
        dispatch({type: 'initial'});
        handleClose();
      }}
      className="p-4">
      <DialogTitle>Create Warehouse</DialogTitle>
      <form onSubmit={submit}>
        <DialogContent>
          <TextField
            required
            autoFocus
            margin="dense"
            id="name"
            value={form.name}
            onChange={e => dispatch({type: 'name', payload: e.target.value})}
            label="Warehouse Name"
            type="text"
            variant="standard"
            fullWidth
          />
          <TextField
            required
            fullWidth
            margin="dense"
            value={form.contactPerson}
            onChange={e =>
              dispatch({type: 'contactPerson', payload: e.target.value})
            }
            id="phone"
            label="Contact Person"
            type="text"
            variant="standard"
          />
          <TextField
            required
            fullWidth
            margin="dense"
            value={form.contactPhoneNumber}
            onChange={e =>
              dispatch({type: 'contactPhoneNumber', payload: e.target.value})
            }
            id="pcn"
            label="Contact Phone Number"
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
            value={form.latlon}
            onChange={e =>
              dispatch({
                type: 'latlon',
                payload: e.target.value,
              })
            }
            id="pcnum"
            label="lat-lag"
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
          <Button type="submit" disabled={isDisabled}>
            Create
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}

export default WarehouseCreateForm;
