import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  Input,
  InputLabel,
} from '@mui/material';
import React, {useState} from 'react';
import Button from '@mui/material/Button';
import {addStock} from './ProductService';
import {useDispatch, useSelector} from 'react-redux';
import {getProducts} from '../../../redux/actions/Products';
import {toast} from 'react-toastify';
function AddStock({open, handleClose, product_id}) {
  const [quantity, setQuantity] = useState();
  const dispatch = useDispatch();
  const filters = useSelector(state => state.products.filters);
  const submit = e => {
    e.preventDefault();
    addStock({product_id: product_id, quantity: quantity})
      .then(res => {
        dispatch(
          getProducts({
            name: filters.name,
            category: filters.category,
            active: filters.active,
          }),
        );
        setQuantity(0);
        handleClose();
        toast.success('Stock Added Succefully', {
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
  return (
    <Dialog
      open={open}
      // onClose={() => {
      //   dispatch({type: 'initial'});
      //   // handleClose();
      // }}
      className="p-4">
      <DialogTitle>Add Stock</DialogTitle>
      <form onSubmit={submit}>
        <DialogContent>
          <FormControl
            className="m-2"
            fullWidth
            required
            variant="standard"
            sx={{minWidth: 250}}>
            <InputLabel id="status">Stock</InputLabel>
            <Input
              type="text"
              required
              fullWidth
              margin="dense"
              value={quantity}
              onChange={e => setQuantity(e.target.value)}
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

export default AddStock;
