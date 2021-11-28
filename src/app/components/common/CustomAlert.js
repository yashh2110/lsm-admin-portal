import React, {useState} from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
function CustomAlert({open, handleClose, confirmFunction, alert, alertDesc}) {
  const [isDisabled, setIsDisabled] = useState(false);
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
        <Button
          onClick={() => confirmFunction(setIsDisabled)}
          autoFocus
          disabled={isDisabled}>
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default CustomAlert;
