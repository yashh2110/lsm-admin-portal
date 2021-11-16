import React, {useReducer, useState} from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import DialogTitle from '@mui/material/DialogTitle';
import {toast} from 'react-toastify';
import Input from '@mui/material/Input';
import {addCreditService} from './CustomerService';
import CustomAlert from '../common/CustomAlert';
const reducer = (state, {type, payload}) => {
  switch (type) {
    case 'creditAmount':
      return {...state, creditAmount: payload};
    case 'expiryTime':
      return {...state, expiryTime: payload};
    default:
      return state;
  }
};
const initial = '';
function AddCredits({open, handleClose, id, getCustomer}) {
  const [form, dispatch] = useReducer(reducer, initial);
  const [alertOpen, setAlertOpen] = useState(false);
  const addCredits = () => {
    const date = new Date(form.expiryTime);
    const dateInMilli = date.getTime();
    const finalForm = {...form, expiryTime: dateInMilli};
    addCreditService(id, finalForm)
      .then(res => {
        toast.success('Credit added to customer succesfully', {
          autoClose: 1000,
        });
        setAlertOpen(false);
        getCustomer();
        handleClose();
      })
      .catch(err => {
        toast.error('something went wrong', {
          autoClose: 3000,
        });
        setAlertOpen(false);
      });
  };
  const submit = e => {
    e.preventDefault();
    console.log(form);
    setAlertOpen(true);
  };
  return (
    <div>
      <Dialog
        open={open}
        onClose={() => {
          dispatch({type: 'initial'});
          handleClose();
        }}
        className="p-4">
        <DialogTitle>Block Status</DialogTitle>
        <form onSubmit={submit}>
          <DialogContent>
            <FormControl
              className="m-2"
              fullWidth
              required
              variant="standard"
              sx={{minWidth: 250}}>
              <InputLabel id="status">Add Credits</InputLabel>
              <Input
                type="text"
                required
                fullWidth
                margin="dense"
                value={form.creditAmount}
                onChange={e =>
                  dispatch({type: 'creditAmount', payload: e.target.value})
                }
              />
            </FormControl>
            <FormControl
              className="m-2 "
              fullWidth
              required
              variant="standard"
              sx={{minWidth: 250}}>
              <InputLabel id="status" shrink={true}>
                Expiry Time
              </InputLabel>
              <Input
                type="datetime-local"
                required
                fullWidth
                margin="dense"
                value={form.expiryTime}
                onChange={e =>
                  dispatch({type: 'expiryTime', payload: e.target.value})
                }
              />
            </FormControl>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit">Next</Button>
          </DialogActions>
        </form>
      </Dialog>
      {alertOpen ? (
        <CustomAlert
          open={alertOpen}
          handleClose={() => setAlertOpen(false)}
          alert={`Adding credit amount of ${form.creditAmount} INR`}
          alertDesc=""
          confirmFunction={addCredits}
        />
      ) : null}
    </div>
  );
}

export default AddCredits;
