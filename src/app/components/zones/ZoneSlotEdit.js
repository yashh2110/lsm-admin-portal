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
import {toast} from 'react-toastify';
import {getZoneById, updateSlotCapacity} from './ZoneService';

const reducer = (state, {type, payload}) => {
  switch (type) {
    case 'initial':
      return [];
    case 'dayNumber':
      return {...state, dayNumber: payload};
    case 'newCapacity':
      return {...state, newCapacity: payload};
    case 'slotId':
      return {...state, slotId: payload};
    case 'zoneId':
      return {...state, zoneId: payload};

    default:
      return state;
  }
};

function ZoneSlotEdit({open, handleClose, zoneId, setZone}) {
  const initial = {
    dayNumber: '',
    newCapacity: '',
    slotId: '',
  };
  const [form, dispatch] = useReducer(reducer, initial);
  const submit = async e => {
    e.preventDefault();
    const params = {
      zoneId: zoneId,
      ...form,
    };
    updateSlotCapacity(params)
      .then(res => {
        getZoneById(zoneId)
          .then(res => {
            setZone(res.data);
            toast.success('Slot Capacity Updated', {
              autoClose: 2000,
            });
          })
          .catch(err => {
            console.log(err);
          });
      })
      .catch(err => {
        toast.error('Something went wrong', {
          autoClose: 2000,
        });
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
      <DialogTitle>Update Slot Capcity</DialogTitle>
      <form onSubmit={submit}>
        <DialogContent>
          <FormControl fullWidth variant="standard" sx={{m: 1, minWidth: 120}}>
            <InputLabel id="status">Day</InputLabel>
            <Select
              labelId="day"
              id="day"
              label="day"
              onChange={e =>
                dispatch({type: 'dayNumber', payload: e.target.value})
              }
              value={form.dayNumber}>
              <MenuItem value={0} className="d-block p-2">
                Sunday
              </MenuItem>
              <MenuItem value={1} className="d-block p-2">
                Monday
              </MenuItem>
              <MenuItem value={2} className="d-block p-2">
                Tuesday
              </MenuItem>
              <MenuItem value={3} className="d-block p-2">
                Wednesday
              </MenuItem>
              <MenuItem value={4} className="d-block p-2">
                Thursday
              </MenuItem>
              <MenuItem value={5} className="d-block p-2">
                Friday
              </MenuItem>
              <MenuItem value={6} className="d-block p-2">
                Saturday
              </MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth variant="standard" sx={{m: 1, minWidth: 120}}>
            <InputLabel id="status">Slot</InputLabel>
            <Select
              labelId="slot"
              id="slot"
              label="Slot"
              onChange={e =>
                dispatch({type: 'slotId', payload: e.target.value})
              }
              value={form.slotId}>
              <MenuItem value={1} className="d-block p-2">
                1
              </MenuItem>
              <MenuItem value={2} className="d-block p-2">
                2
              </MenuItem>
              <MenuItem value={3} className="d-block p-2">
                3
              </MenuItem>
              <MenuItem value={4} className="d-block p-2">
                4
              </MenuItem>
            </Select>
          </FormControl>
          <TextField
            required
            autoFocus
            margin="dense"
            sx={{m: 1, minWidth: 120}}
            id="name"
            value={form.newCapacity}
            onChange={e =>
              dispatch({type: 'newCapacity', payload: e.target.value})
            }
            label="Capacity"
            type="number"
            variant="standard"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit">update</Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}

export default ZoneSlotEdit;
