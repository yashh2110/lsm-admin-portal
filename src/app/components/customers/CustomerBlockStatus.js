import React, {useReducer, useRef, useState} from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import DialogTitle from '@mui/material/DialogTitle';
import CustomerAlert from './CustomerAlert';
import {blockStatusService} from './CustomerService';
import {toast} from 'react-toastify';
import CustomAlert from '../common/CustomAlert';

const initial = {
  blockStatus: '',
};
const reducer = (state, {type, payload}) => {
  switch (type) {
    case 'initial':
      return initial;
    case 'blockStatus':
      return {blockStatus: payload};
    default:
      return state;
  }
};

function CustomerBlockStatus({open, handleClose, id, getCustomer}) {
  const [form, dispatch] = useReducer(reducer, initial);
  const [alertOpen, setAlertOpen] = useState(false);
  const submit = e => {
    e.preventDefault();
    setAlertOpen(true);
  };
  const blockCustomer = () => {
    blockStatusService(id, form)
      .then(res => {
        toast.success('Blocked customer succesfully', {
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
              className="m-2 date"
              fullWidth
              required
              variant="standard"
              sx={{minWidth: 250}}>
              <InputLabel id="status">Block Staus</InputLabel>
              <Select
                labelId="blockStatus"
                id="blockStatus"
                label="Is Active"
                onChange={e =>
                  dispatch({type: 'blockStatus', payload: e.target.value})
                }
                value={form.blockStatus}>
                <MenuItem value={true} className="d-block p-2">
                  Blocked
                </MenuItem>
                <MenuItem value={false} className="d-block p-2">
                  Not Blocked
                </MenuItem>
              </Select>
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
          alert="Confirm to block customer !"
          alertDesc="This does block customer temporarily"
          confirmFunction={blockCustomer}
        />
      ) : null}
    </div>
  );
}

export default CustomerBlockStatus;
