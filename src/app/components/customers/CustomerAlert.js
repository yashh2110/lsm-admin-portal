import React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
function CustomerAlert({open, handleClose, confirmFunction, alert, alertDesc}) {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description">
      <DialogTitle id="alert-dialog-title">{alert}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {alertDesc}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>No</Button>
        <Button onClick={confirmFunction} autoFocus>
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default CustomerAlert;
