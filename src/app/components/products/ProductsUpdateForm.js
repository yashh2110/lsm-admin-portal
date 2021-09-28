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
import axios from 'axios';
import {useDispatch, useSelector} from 'react-redux';
import {toast} from 'react-toastify';
import {getProducts} from '../../../redux/actions/Products';
const reducer = (state, {type, payload}) => {
  switch (type) {
    case 'name':
      return {...state, name: payload};
    case 'subName':
      return {...state, subName: payload};
    case 'categoryName':
      return {...state, categoryName: payload};
    case 'actualPrice':
      return {...state, actualPrice: payload};
    case 'thresholdQuantity':
      return {...state, thresholdQuantity: payload};
    case 'maxAllowedQuantity':
      return {...state, maxAllowedQuantity: payload};
    case 'priority':
      return {...state, priority: payload};
    case 'onDemand':
      return {...state, onDemand: payload};
    case 'isActive':
      return {...state, isActive: payload};
    default:
      return state;
  }
};
function ProductsUpdateForm({open, handleClose, data}) {
  const filters = useSelector(state => state.products.filters);
  const initial = data;
  const [form, dispatch] = useReducer(reducer, initial);
  const reducDispatch = useDispatch();
  const submit = async () => {
    await axios
      .post(
        `https://test-api.zasket.in/api/v1/inventory/products/update`,
        form,
        {headers: {'inventory-user-id': 1, 'session-id': 1}},
      )
      .then(res => {
        console.log(res);
        reducDispatch(
          getProducts({
            name: filters.name,
            category: filters.category,
            active: filters.active,
          }),
        );
        toast.success('Edited Succefully', {
          position: 'top-right',
          autoClose: 2000,
        });
        handleClose();
      })
      .catch(err => {
        console.log(err);
        toast.error('Something went wrong');
      });
  };
  console.log(form);
  return (
    <Dialog open={open} onClose={handleClose} className="p-4">
      <DialogTitle>Edit</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          value={form.name}
          onChange={e => dispatch({type: 'name', payload: e.target.value})}
          label="Product Name"
          type="text"
          variant="standard"
          fullWidth
        />
        <TextField
          fullWidth
          margin="dense"
          value={form.subName}
          onChange={e => dispatch({type: 'subName', payload: e.target.value})}
          id="subName"
          label="Sub Name"
          type="text"
          variant="standard"
        />
        <TextField
          fullWidth
          value={form.categoryName}
          onChange={e =>
            dispatch({type: 'categoryName', payload: e.target.value})
          }
          margin="dense"
          id="categoryName"
          label="Category Name"
          type="text"
          variant="standard"
        />
        <TextField
          fullWidth
          value={form.actualPrice}
          onChange={e =>
            dispatch({type: 'actualPrice', payload: e.target.value})
          }
          margin="dense"
          id="actualPrice"
          label="Actual Price"
          type="text"
          variant="standard"
        />
        <TextField
          fullWidth
          margin="dense"
          value={form.discountedPrice}
          onChange={e =>
            dispatch({type: 'discountedPrice', payload: e.target.value})
          }
          id="discountedPrice"
          label="Discounted Price"
          type="text"
          variant="standard"
        />
        <TextField
          fullWidth
          margin="dense"
          value={form.thresholdQuantity}
          onChange={e =>
            dispatch({
              type: 'thresholdQuantity',
              payload: e.target.value,
            })
          }
          id="thresholdQuantity"
          label="Threshold Quantity"
          type="number"
          variant="standard"
        />
        <TextField
          fullWidth
          margin="dense"
          value={form.availableQuantity}
          onChange={e =>
            dispatch({
              type: 'availableQuantity',
              payload: e.target.value,
            })
          }
          id="availableQuantity"
          label="Available Quantity"
          type="number"
          variant="standard"
        />
        <TextField
          fullWidth
          margin="dense"
          value={form.maxAllowedQuantity}
          onChange={e =>
            dispatch({
              type: 'maxAllowedQuantity',
              payload: e.target.value,
            })
          }
          id="maxAllowedQuantity"
          label="Max Allowed Quantity"
          type="number"
          variant="standard"
        />
        <TextField
          fullWidth
          margin="dense"
          value={form.priority}
          onChange={e =>
            dispatch({
              type: 'priority',
              payload: e.target.value,
            })
          }
          id="priority"
          label="Priority"
          type="number"
          variant="standard"
        />
        <FormControl
          fullWidth
          variant="standard"
          sx={{marginTop: '8px', minWidth: 120, marginBottom: '4px'}}>
          <InputLabel id="status">On Demand</InputLabel>
          <Select
            labelId="onDemand"
            id="onDemand"
            label="On Demand"
            onChange={e =>
              dispatch({type: 'onDemand', payload: e.target.value})
            }
            value={form.onDemand}>
            <MenuItem value={true} className="d-block p-2">
              True
            </MenuItem>
            <MenuItem value={false} className="d-block p-2">
              false
            </MenuItem>
          </Select>
        </FormControl>
        <FormControl
          fullWidth
          variant="standard"
          sx={{marginTop: '8px', minWidth: 120, marginBottom: '4px'}}>
          <InputLabel id="status">Status</InputLabel>
          <Select
            labelId="isActive"
            id="isActive"
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
        <Button onClick={submit}>Update</Button>
      </DialogActions>
    </Dialog>
  );
}

export default ProductsUpdateForm;
