import React, {useReducer, useRef, useState} from 'react';
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
import Input from '@mui/material/Input';
import {updateBannerService, uploadBannerService} from './BannerService';
import Checkbox from '@mui/material/Checkbox';
import {getBanners} from '../../../redux/actions/Banners';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';

const reducer = (state, {type, payload}) => {
  switch (type) {
    case 'name':
      return {...state, name: payload};
    case 'imagePath':
      return {...state, imagePath: payload};
    case 'priority':
      return {...state, priority: payload};
    case 'target':
      return {...state, target: payload};
    case 'consumer':
      let consumerData;
      if (payload.target.checked) {
        consumerData = 'CONSUMER';
      } else {
        consumerData = '';
      }
      return {...state, consumer: consumerData};
    case 'partner':
      let partnerData;
      if (payload.target.checked) {
        partnerData = 'PARTNER';
      } else {
        partnerData = '';
      }
      return {...state, partner: partnerData};
    case 'totalShareCount':
      return {...state, totalShareCount: payload};
    case 'startedAt':
      return {...state, startedAt: payload};
    case 'expiredAt':
      return {...state, expiredAt: payload};
    case 'isActive':
      return {...state, isActive: payload};
    case 'image':
      return {...state, imagePath: payload};
    default:
      return state;
  }
};

function BannerUpdateForm({open, handleClose, data}) {
  const initial = {
    ...data,
    startedAt: new Date(data.startedAt).toISOString().substring(0, 16),
    expiredAt: new Date(data.expiredAt).toISOString().substring(0, 16),
    consumer: data.target === 'CONSUMER' ? 'CONSUMER' : '',
    partner: data.target === 'PARTNER' ? 'PARTNER' : '',
  };
  console.log(initial);
  const [form, dispatch] = useReducer(reducer, initial);

  const [imageUploaded, setImageUploaded] = useState(false);
  const [imageLoading, setImageLoading] = useState(false);
  const [imageSelected, setImageSelected] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');
  const bannerRef = useRef();
  const reducDispatch = useDispatch();
  console.log(form);
  const submit = async e => {
    e.preventDefault();
    let startdate = new Date(form.startedAt);
    startdate = startdate.getTime();
    let endDate = new Date(form.expiredAt);
    endDate = endDate.getTime();
    const target = [form.consumer, form.partner].join(',');

    const params = {
      ...form,
      startedAt: startdate,
      expiredAt: endDate,
      target: target,
    };
    console.log(params);
    updateBannerService(params)
      .then(res => {
        reducDispatch(getBanners());
        toast.success('Banner Updated Succefully', {
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
  const uploadImage = e => {
    if (e) {
      setImageLoading(true);
      let formData = new FormData();
      formData.append('file', e);
      uploadBannerService(formData)
        .then(res => {
          console.log(res.data);
          dispatch({type: 'image', payload: res.data});
          setImageUploaded(true);
          setImageSelected(false);
          setImageLoading(false);
        })
        .catch(err => {
          console.log(err);
          setImageLoading(false);
        });
    } else {
      toast.error('Select Iamge First');
    }
  };
  return (
    <Dialog
      open={open}
      onClose={() => {
        dispatch({type: 'initial'});
        handleClose();
      }}
      className="p-4">
      <DialogTitle>Update Banner</DialogTitle>
      <form onSubmit={submit}>
        <DialogContent>
          <div className="bannerPic">
            <label
              htmlFor="image"
              style={
                selectedImage
                  ? {
                      backgroundImage: 'url(' + selectedImage + ')',
                    }
                  : form.imagePath
                  ? {
                      backgroundImage: 'url(' + form.imagePath + ')',
                    }
                  : null
              }>
              {selectedImage || form.imagePath ? null : 'Upload Banner'}
            </label>
            <input
              ref={bannerRef}
              type="file"
              id="image"
              className="d-none"
              onChange={() => {
                setImageSelected(true);
                setImageUploaded(false);
                setSelectedImage(
                  URL.createObjectURL(bannerRef.current.files[0]),
                );
              }}
            />
            <button
              className="btn btn-light imageUpload"
              type="button"
              disabled={imageSelected ? false : true}
              onClick={() => uploadImage(bannerRef.current.files[0])}>
              {imageLoading
                ? 'loading..'
                : imageUploaded
                ? 'Uploaded'
                : 'Upload'}
            </button>
          </div>
          <div className="d-flex justify-content-between">
            <TextField
              className="m-2"
              required
              autoFocus
              margin="dense"
              id="name"
              value={form.name}
              onChange={e => dispatch({type: 'name', payload: e.target.value})}
              label="Banner Name"
              type="text"
              variant="standard"
              fullWidth
            />
            <TextField
              className="m-2"
              required
              fullWidth
              margin="dense"
              value={form.priority}
              onChange={e =>
                dispatch({type: 'priority', payload: e.target.value})
              }
              id="priority"
              label="priority"
              type="number"
              variant="standard"
            />
          </div>
          <div className="d-flex justify-content-between">
            <TextField
              className="m-2"
              required
              fullWidth
              value={form.startedAt}
              onChange={e =>
                dispatch({type: 'startedAt', payload: e.target.value})
              }
              margin="dense"
              id="email"
              label="Started At"
              InputLabelProps={{
                shrink: true,
              }}
              type="datetime-local"
              variant="standard"
            />
            <TextField
              className="m-2"
              required
              fullWidth
              value={form.expiredAt}
              onChange={e =>
                dispatch({type: 'expiredAt', payload: e.target.value})
              }
              margin="dense"
              id="expiredAt"
              label="Expired At"
              InputLabelProps={{
                shrink: true,
              }}
              type="datetime-local"
              variant="standard"
            />
          </div>
          <div className="d-flex justify-content-between">
            <FormControl
              className="m-2 date"
              fullWidth
              required
              variant="standard"
              sx={{minWidth: 120}}>
              <InputLabel id="status">Is Active</InputLabel>
              <Select
                labelId="isActive"
                id="isActive"
                label="Is Active"
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
            <FormControl
              className="m-2 date"
              fullWidth
              required
              variant="standard"
              sx={{minWidth: 120}}>
              <InputLabel htmlFor="my-input">Total Share Count</InputLabel>
              <Input
                required
                fullWidth
                margin="dense"
                value={form.totalShareCount}
                sx={{pb: '3.4px'}}
                onChange={e =>
                  dispatch({type: 'totalShareCount', payload: e.target.value})
                }
                id="totalShareCount"
                label="Total Share Count"
                type="text"
              />
            </FormControl>
          </div>
          <div className="d-flex justify-content-between">
            <FormControl
              required
              component="fieldset"
              className="m-2 mb-0 date"
              sx={{minWidth: 120}}
              variant="standard">
              <FormLabel component="legend">Target</FormLabel>
              <FormGroup>
                <FormControlLabel
                  className="mb-2"
                  sx={{marginLeft: '0px'}}
                  control={
                    <Checkbox
                      name="CONSUMER"
                      checked={!!form.consumer}
                      onChange={e => dispatch({type: 'consumer', payload: e})}
                    />
                  }
                  label="CONSUMER"
                />
                <FormControlLabel
                  className="mb-2"
                  sx={{marginLeft: '0px'}}
                  control={
                    <Checkbox
                      name="PARTNER"
                      checked={!!form.partner}
                      onChange={e => dispatch({type: 'partner', payload: e})}
                    />
                  }
                  label="PARTNER"
                />
              </FormGroup>
            </FormControl>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit" disabled={form.imagePath ? false : true}>
            Update
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}

export default BannerUpdateForm;
