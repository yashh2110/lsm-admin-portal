import React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';

import DialogTitle from '@mui/material/DialogTitle';

function ViewProduct({open, handleClose, data}) {
  return (
    <Dialog
      open={open}
      onClose={() => {
        handleClose();
      }}
      className="p-4"
      fullWidth>
      <DialogTitle>{data.name}</DialogTitle>
      <DialogContent>
        <div className="mt-2 border-bottom p-1">
          <p className="m-0">Sub Name</p>
          <p className="m-0 mt-1">
            <b>{data.subName || 'none'}</b>
          </p>
        </div>
        <div className="mt-2 border-bottom p-1">
          <p className="m-0">category</p>
          <p className="m-0 mt-1">
            <b>{data.categoryId || 'none'}</b>
          </p>
        </div>
        <div className="mt-2 border-bottom p-1">
          <p className="m-0">Actual Price</p>
          <p className="m-0 mt-1">
            <b>{data.actualPrice || 'none'}</b>
          </p>
        </div>
        <div className="mt-2 border-bottom p-1">
          <p className="m-0">discountedPrice</p>
          <p className="m-0 mt-1">
            <b>{data.discountedPrice || 'none'}</b>
          </p>
        </div>
        <div className="mt-2 border-bottom p-1">
          <p className="m-0">ThresholdQuantity</p>
          <p className="m-0 mt-1">
            <b>{data.thresholdQuantity || 'none'}</b>
          </p>
        </div>
        <div className="mt-2  border-bottom">
          <p className="m-0">Threshold Quantity</p>
          <p className="m-0 mt-1">
            <b>{data.thresholdQuantity || 'none'}</b>
          </p>
        </div>
        <div className="mt-2  border-bottom">
          <p className="m-0">Available Quantity</p>
          <p className="m-0 mt-1">
            <b>{data.availableQuantity || 'none'}</b>
          </p>
        </div>
        <div className="mt-2  border-bottom">
          <p className="m-0">MaxAllowed Quantity</p>
          <p className="m-0 mt-1">
            <b>{data.maxAllowedQuantity || 'none'}</b>
          </p>
        </div>
        <div className="mt-2  border-bottom">
          <p className="m-0">Estimation Type</p>
          <p className="m-0 mt-1">
            <b>{data.estimationType || 'none'}</b>
          </p>
        </div>
        <div className="mt-2  border-bottom">
          <p className="m-0">Estimation Unit</p>
          <p className="m-0 mt-1">
            <b>{data.estimationUnit || 'none'}</b>
          </p>
        </div>
        <div className="mt-2  border-bottom">
          <p className="m-0">hsn Code</p>
          <p className="m-0 mt-1">
            <b>{data.hsnCode || 'none'}</b>
          </p>
        </div>
        <div className="mt-2  border-bottom">
          <p className="m-0">ean Code</p>
          <p className="m-0 mt-1">
            <b>{data.eanCode || 'none'}</b>
          </p>
        </div>
        <div className="mt-2  border-bottom">
          <p className="m-0">priority </p>
          <p className="m-0 mt-1">
            <b>{data.priority || 'none'}</b>
          </p>
        </div>
        <div className="mt-2  border-bottom">
          <p className="m-0">On Demand </p>
          <p className="m-0 mt-1">
            <b>{data.onDemand ? 'True' : 'False'}</b>
          </p>
        </div>
        <div className="mt-2  border-bottom">
          <p className="m-0">isActive</p>
          <p className="m-0 mt-1">
            <b>{data.isActive ? 'True' : 'False'}</b>
          </p>
        </div>
      </DialogContent>

      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
      </DialogActions>
    </Dialog>
  );
}

export default ViewProduct;
