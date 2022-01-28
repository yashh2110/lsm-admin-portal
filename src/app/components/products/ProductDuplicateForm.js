import React, {useEffect, useReducer, useRef, useState} from 'react';
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
import {useDispatch, useSelector} from 'react-redux';
import {toast} from 'react-toastify';
import {getProducts} from '../../../redux/actions/Products';
import {
  createProduct,
  updateProductImgService,
  uploadProductImgService,
} from './ProductService';
import axios from 'axios';
import {setLoader} from '../../../redux/actions/Loader';
const reducer = (state, {type, payload}) => {
  switch (type) {
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
    case 'itemTag':
      return {...state, itemTag: payload};
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
    case 'availableQuantity':
      return {...state, availableQuantity: payload};
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
function ProductDuplicateForm({open, handleClose, data}) {
  console.log(data);
  const filters = useSelector(state => state.products.filters);
  const initial = {...data, imageUrlList: []};
  const [form, dispatch] = useReducer(reducer, initial);
  const categories = useSelector(state => state.products.catogories);
  const reducDispatch = useDispatch();
  const [imageLoading, setImageLoading] = useState(false);
  const [imageUploaded, setImageUploaded] = useState(false);
  const [imageSelected, setImageSelected] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');
  const [isDisabled, setIsDisabled] = useState(false);

  const productImgRef = useRef();

  const submit = async e => {
    e.preventDefault();
    dispatch(setLoader(true));
    setIsDisabled(() => true);
    createProduct(form)
      .then(res => {
        reducDispatch(
          getProducts({
            name: filters.name,
            category: filters.category,
            active: filters.active,
          }),
        );
        dispatch(setLoader(false));
        toast.success('Product Duplicated Succefully', {
          position: 'top-right',
          autoClose: 2000,
        });
        handleClose();
        dispatch({type: 'initial'});
        setImageUploaded(false);
      })
      .catch(err => {
        console.log(err);
        dispatch(setLoader(false));
        setIsDisabled(() => false);
        toast.error('Something went wrong');
      });
  };
  const uploadImage = () => {
    const e = productImgRef.current.files[0];
    console.log(e);
    if (e) {
      setImageLoading(true);
      let formData = new FormData();
      formData.append('file', e);
      uploadProductImgService(formData)
        .then(res => {
          console.log(res.data);
          dispatch({type: 'imageUrlList', payload: res.data});
          setImageUploaded(true);
          setImageSelected(false);
          setImageLoading(false);
        })
        .catch(err => {
          console.log(err);
          setImageLoading(false);
        });
    } else {
      toast.error('Please Select image');
    }
  };
  useEffect(() => {
    if (data.productImageInfoList[0]) {
      dispatch({
        type: 'imageUrlList',
        payload: data.productImageInfoList[0].mediumImagePath,
      });
    }
  }, []);
  return (
    <Dialog open={open} className="p-4">
      <DialogTitle>Duplicate Product</DialogTitle>
      <form onSubmit={submit}>
        <DialogContent>
          <div className="productPic">
            <label
              htmlFor="image"
              style={
                selectedImage
                  ? {
                      backgroundImage: 'url(' + selectedImage + ')',
                    }
                  : form.productImageInfoList[0]
                  ? {
                      backgroundImage:
                        'url(' +
                        form.productImageInfoList[0].mediumImagePath +
                        ')',
                    }
                  : null
              }>
              {selectedImage || form.productImageInfoList[0]
                ? null
                : 'Upload Product'}
            </label>
            <input
              ref={productImgRef}
              type="file"
              id="image"
              className="d-none"
              onChange={() => {
                setImageSelected(true);
                setImageUploaded(false);
                setSelectedImage(
                  URL.createObjectURL(productImgRef.current.files[0]),
                );
              }}
            />
            <button
              className="btn btn-light imageUpload"
              type="button"
              disabled={imageSelected ? false : true}
              onClick={() => uploadImage(productImgRef.current.files[0])}>
              {imageLoading
                ? 'loading..'
                : imageUploaded
                ? 'Uploaded'
                : 'Upload'}
            </button>
          </div>
          {/* <div className="d-flex justify-content-center align-items-end">
            <TextField
              required
              autoFocus
              margin="dense"
              id="imageUrlList"
              inputRef={productImgRef}
              onChange={() => {
                setImageSelected(true);
                setImageUploaded(false);
              }}
              InputLabelProps={{
                shrink: true,
              }}
              sx={{mr: '5px'}}
              label="Product Image"
              type="file"
              variant="standard"
              fullWidth
            />
            
            <Button
              variant="outlined"
              disabled={imageSelected ? false : true}
              color="secondary"
              onClick={uploadImage}
              className="mb-1 ">
              {imageLoading
                ? 'loading..'
                : imageUploaded
                ? 'Uploaded'
                : 'Upload'}
            </Button>
          </div> */}
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
            fullWidth
            value={form.itemTag}
            onChange={e => dispatch({type: 'itemTag', payload: e.target.value})}
            margin="dense"
            id="itemTag"
            label="Tag Name"
            type="text"
            variant="standard"
          />
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
          <Button type="submit" disabled={isDisabled}>
            Duplicate
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}

export default ProductDuplicateForm;
