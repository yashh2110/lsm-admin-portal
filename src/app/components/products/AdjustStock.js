import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  Input,
  InputLabel,
} from '@mui/material';
import React, {useEffect, useState} from 'react';
import Button from '@mui/material/Button';
import {addStock, adjustStockOpen, getCommitedStock} from './ProductService';
import {useDispatch, useSelector} from 'react-redux';
import {getProducts} from '../../../redux/actions/Products';
import {toast} from 'react-toastify';
function AdjustStock({open, handleClose, product_id, availableQuantity}) {
  const [physicalQuantity, setPhysicalQuantity] = useState();
  const [commitedStock, setCommitedStock] = useState(0);
  const dispatch = useDispatch();
  const filters = useSelector(state => state.products.filters);
  const submit = e => {
    e.preventDefault();
    const quantity_adjusted =
      physicalQuantity - commitedStock - availableQuantity;
    adjustStockOpen({
      product_id: product_id,
      quantity_adjusted: quantity_adjusted,
    })
      .then(res => {
        dispatch(
          getProducts({
            name: filters.name,
            category: filters.category,
            active: filters.active,
          }),
        );
        setPhysicalQuantity(0);
        handleClose();
        toast.success('Stock Adjusted Succefully', {
          position: 'top-right',
          autoClose: 2000,
        });
      })
      .catch(err => {
        console.log(err);
        toast.error('Something Went Wrong', {
          position: 'top-right',
          autoClose: 2000,
        });
      });
  };
  useEffect(() => {
    getCommitedStock({product_id})
      .then(res => {
        setCommitedStock(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);
  console.log(availableQuantity);
  return (
    <Dialog
      open={open}
      // onClose={() => {
      //   dispatch({type: 'initial'});
      //   // handleClose();
      // }}
      className="p-4">
      <DialogTitle>Adjust Stock</DialogTitle>
      <form onSubmit={submit}>
        <DialogContent>
          <p>
            <b>Commited Stock</b> : {commitedStock}
          </p>
          <p>
            <b>Quantity Adjusted </b>:{' '}
            {physicalQuantity
              ? physicalQuantity - commitedStock - availableQuantity
              : null}
          </p>
          <FormControl
            className="m-1"
            fullWidth
            required
            variant="standard"
            sx={{minWidth: 250}}>
            <InputLabel id="status">Physical Quantity</InputLabel>
            <Input
              type="text"
              required
              fullWidth
              margin="dense"
              value={physicalQuantity}
              onChange={e => {
                if (parseInt(e.target.value)) {
                  setPhysicalQuantity(parseInt(e.target.value));
                } else {
                  setPhysicalQuantity('');
                }
              }}
            />
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit">Next</Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}

export default AdjustStock;
