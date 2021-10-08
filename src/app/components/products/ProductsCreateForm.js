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
import {useDispatch} from 'react-redux';
import {toast} from 'react-toastify';
import {useSelector} from 'react-redux';
import {getProducts} from '../../../redux/actions/Products';
import {createProduct} from './ProductService';

const initial = {
  name: '',
  subName: '',
  categoryId: '',
  actualPrice: '',
  thresholdQuantity: '',
  discountedPrice: '',
  eanCode: '',
  imageUrlList: [],
  estimationType: '',
  estimationUnit: '',
  hsnCode: '',
  maxAllowedQuantity: '',
  priority: '',
  onDemand: '',
  isActive: '',
};
const reducer = (state, {type, payload}) => {
  switch (type) {
    case 'initial':
      return initial;
    case 'imageUrlList':
      return {...state, imageUrlList: [payload]};
    case 'name':
      return {...state, name: payload};
    case 'subName':
      return {...state, subName: payload};
    case 'categoryId':
      return {...state, categoryId: payload};
    case 'actualPrice':
      return {...state, actualPrice: payload};
    case 'discountedPrice':
      return {...state, discountedPrice: payload};
    case 'eanCode':
      return {...state, eanCode: payload};
    case 'estimationType':
      return {...state, estimationType: payload};
    case 'estimationUnit':
      return {...state, estimationUnit: payload};
    case 'hsnCode':
      return {...state, hsnCode: payload};
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
    // case 'img'
    default:
      return state;
  }
};

function ProductCreateForm({open, handleClose}) {
  const [form, dispatch] = useReducer(reducer, initial);
  const filters = useSelector(state => state.products.filters);
  const categories = useSelector(state => state.products.catogories);
  const reducDispatch = useDispatch();

  const submit = async e => {
    e.preventDefault();
    createProduct(form)
      .then(res => {
        reducDispatch(
          getProducts({
            name: filters.name,
            category: filters.category,
            active: filters.active,
          }),
        );
        toast.success('Vendor Created Succefully', {
          position: 'top-right',
          autoClose: 2000,
        });
        handleClose();
        dispatch({type: 'initial'});
      })
      .catch(err => {
        console.log(err);
        toast.error('Something went wrong');
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
      <DialogTitle>Create Product</DialogTitle>
      <form onSubmit={submit}>
        <DialogContent>
          {/* <FormControl
          variant="standard"
          fullWidth
          //   sx={{m: 1}}
          color="secondary"
          className="imageUrl"> */}
          {/* <InputLabel id="status">Select Image</InputLabel>
          <Select
            labelId="imageUrl"
            id="imageUrl"
            label="imageUrl"
            value={form.imageUrl}
            onChange={e =>
              dispatch({type: 'imageUrl', payload: e.target.value})
            }>
            <MenuItem value="" className="d-block p-2">
              None
            </MenuItem>
            {images
              ? images.map(i =>
                  i.fileType === 'FILE' ? (
                    <MenuItem
                      value={i.filePath}
                      key={i.filePath}
                      className="d-block p-2">
                      {i.fileName}
                    </MenuItem>
                  ) : null,
                )
              : null}
          </Select>
        </FormControl> */}
          <TextField
            required
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
            required
            fullWidth
            margin="dense"
            value={form.subName}
            onChange={e => dispatch({type: 'subName', payload: e.target.value})}
            id="subName"
            label="Sub Name"
            type="text"
            variant="standard"
          />
          <FormControl
            variant="standard"
            fullWidth
            //   sx={{m: 1}}
            color="secondary"
            className="category">
            <InputLabel id="status">Select Category</InputLabel>
            <Select
              labelId="Category"
              id="category"
              label="category"
              value={form.categoryId}
              onChange={e =>
                dispatch({type: 'categoryId', payload: e.target.value})
              }>
              <MenuItem value="" className="d-block p-2">
                None
              </MenuItem>
              {categories
                ? categories.map(i => (
                    <MenuItem value={i.id} key={i.id} className="d-block p-2">
                      {i.name}
                    </MenuItem>
                  ))
                : null}
            </Select>
          </FormControl>
          <TextField
            required
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
            required
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
            required
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
            required
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
            required
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

          <FormControl
            variant="standard"
            fullWidth
            //   sx={{m: 1}}
            color="secondary"
            className="estimationType">
            <InputLabel id="status">Estimation Type</InputLabel>
            <Select
              labelId="estimationType"
              id="estimationType"
              label="estimationType"
              value={form.estimationType}
              onChange={e =>
                dispatch({
                  type: 'estimationType',
                  payload: e.target.value,
                })
              }>
              <MenuItem value="" className="d-block p-2">
                None
              </MenuItem>
              <MenuItem value="Kg" className="d-block p-2">
                Kg
              </MenuItem>
              <MenuItem value="Unit(s)" className="d-block p-2">
                Unit(s)
              </MenuItem>
              <MenuItem value="Piece(s)" className="d-block p-2">
                Piece(s)
              </MenuItem>
              <MenuItem value="Katta" className="d-block p-2">
                Katta
              </MenuItem>
              <MenuItem value="Kattalu" className="d-block p-2">
                Kattalu
              </MenuItem>
            </Select>
          </FormControl>
          <TextField
            required
            fullWidth
            margin="dense"
            value={form.estimationUnit}
            onChange={e =>
              dispatch({
                type: 'estimationUnit',
                payload: e.target.value,
              })
            }
            id="estimationUnit"
            label="Estimation Unit"
            type="number"
            variant="standard"
          />
          <TextField
            required
            fullWidth
            margin="dense"
            value={form.hsnCode}
            onChange={e =>
              dispatch({
                type: 'hsnCode',
                payload: e.target.value,
              })
            }
            id="hsnCode"
            label="hsn Code"
            type="text"
            variant="standard"
          />
          <TextField
            required
            fullWidth
            margin="dense"
            value={form.eanCode}
            onChange={e =>
              dispatch({
                type: 'eanCode',
                payload: e.target.value,
              })
            }
            id="eanCode"
            label="ean Code"
            type="text"
            variant="standard"
          />

          <TextField
            required
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
          <Button type="submit">Create</Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}

export default ProductCreateForm;
