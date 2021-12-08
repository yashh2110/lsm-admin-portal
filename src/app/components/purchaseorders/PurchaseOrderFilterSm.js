import React, {useReducer, useState} from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import {useHistory} from 'react-router';
import DialogContent from '@mui/material/DialogContent';
import {
  getPurchaseOrders,
  setPaymentStateFilter,
  setPoEndDateFilter,
  setPoStartDateFilter,
  setPurchaseStateFilter,
  setVendorFilter,
} from '../../../redux/actions/PurchaseOrders';
import DialogTitle from '@mui/material/DialogTitle';
import {useDispatch, useSelector} from 'react-redux';
import {FormControl, InputLabel, MenuItem, Select} from '@material-ui/core';

function PurchaseOrderFilterSm({open, handleClose, setPage}) {
  const dispatch = useDispatch();
  const history = useHistory();
  const {vendorId, purchaseState, paymentState, poStartDate, poEndDate} =
    useSelector(state => state.purchaseorders);
  const vendors = useSelector(state => state.vendors);

  return (
    <Dialog
      open={open}
      onClose={() => {
        dispatch({type: 'initial'});
        handleClose();
      }}
      className="p-4">
      <DialogTitle>PO Filter</DialogTitle>
      <form>
        <DialogContent>
          <TextField
            required
            fullWidth
            value={poStartDate}
            onChange={e => {
              dispatch(setPoStartDateFilter(e.target.value));
            }}
            margin="dense"
            id="Start"
            InputLabelProps={{shrink: true}}
            label="Start Date"
            type="date"
            variant="standard"
          />
          <TextField
            style={{marginTop: '10px'}}
            required
            fullWidth
            value={poEndDate}
            id="enddate"
            onChange={e => {
              dispatch(setPoEndDateFilter(e.target.value));
            }}
            margin="dense"
            InputLabelProps={{shrink: true}}
            label="End Date"
            type="date"
            variant="standard"
          />
          <FormControl
            variant="standard"
            fullWidth
            style={{marginTop: '10px'}}
            //   sx={{m: 1}}
            color="secondary">
            <InputLabel id="status">Vendor Filter</InputLabel>
            <Select
              labelId="Vendor"
              id="Vendor"
              label="Vendor"
              onChange={e => dispatch(setVendorFilter(e.target.value))}
              value={vendorId}>
              <MenuItem value="" className="d-block p-2">
                None
              </MenuItem>
              {vendors
                ? vendors.map(i => (
                    <MenuItem value={i.id} key={i.id} className="d-block p-2">
                      {i.name}
                    </MenuItem>
                  ))
                : null}
            </Select>
          </FormControl>
          <FormControl
            variant="standard"
            style={{marginTop: '10px'}}
            fullWidth
            //   sx={{m: 1}}
            color="secondary">
            <InputLabel id="status">Purchase State</InputLabel>
            <Select
              labelId="Purchase"
              id="Purchase"
              label="Purchase"
              onChange={e => dispatch(setPurchaseStateFilter(e.target.value))}
              value={purchaseState}>
              <MenuItem value="" className="d-block p-2">
                None
              </MenuItem>
              <MenuItem value="NOT_RECEIVED">NOT_RECEIVED</MenuItem>
              <MenuItem value="RECEIVED">RECEIVED</MenuItem>
            </Select>
          </FormControl>
          <FormControl
            variant="standard"
            style={{marginTop: '10px'}}
            fullWidth
            //   sx={{m: 1}}
            color="secondary">
            <InputLabel id="status">Payment State</InputLabel>
            <Select
              labelId="Payment"
              id="Payment"
              label="Payment"
              onChange={e => dispatch(setPaymentStateFilter(e.target.value))}
              value={paymentState}>
              <MenuItem value="" className="d-block p-2">
                None
              </MenuItem>
              <MenuItem value="NOT_PAID">NOT_PAID</MenuItem>
              <MenuItem value="PAID">PAID</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button
            onClick={() => {
              setPage(0);
              dispatch(
                getPurchaseOrders({
                  vendorId,
                  purchaseState,
                  paymentState,
                  poStartDate,
                  poEndDate,
                }),
              );
              handleClose();
            }}>
            Search
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}

export default PurchaseOrderFilterSm;
