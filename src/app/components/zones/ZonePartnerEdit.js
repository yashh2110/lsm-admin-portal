import React, {useState, useEffect} from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';

import DialogTitle from '@mui/material/DialogTitle';
import {useDispatch, useSelector} from 'react-redux';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import {toast} from 'react-toastify';
import {getActiveDes} from '../../../redux/actions/Assignments';
import {editZonePartners, getZoneById} from './ZoneService';

// const initial = {
//   newPartnerIds: [],
//   zoneId: '',
// };

function ZonePartnerEdit({open, handleClose, partners, zoneId, setZone}) {
  const [allPartners, setAllPartners] = useState(partners);
  const [des, setDes] = useState();
  const reducDispatch = useDispatch();
  const [isDisabled, setIsDisabled] = useState(false);
  const activeDes = useSelector(state => state.assignments.activeDes);
  const submit = async e => {
    e.preventDefault();
    setIsDisabled(() => true);
    const params = {
      newPartnerIds: allPartners.map(e => e.partnerId),
      zoneId,
    };
    editZonePartners(params)
      .then(res => {
        getZoneById(zoneId)
          .then(resp => {
            setZone(resp.data);
            toast.success('Partners updated Succefully', {
              position: 'top-right',
              autoClose: 2000,
            });
            handleClose();
          })
          .catch(err => {
            console.log(err);
          });
      })
      .catch(err => {
        console.log(err);
        toast.error('Something went wrong');
        setIsDisabled(() => false);
      });
  };
  const isPartnerAdded = id => {
    return allPartners.some(i => i.partnerId === id);
  };
  const addActiveDeHandle = e => {
    if (allPartners.some(i => i.partnerId === e.partnerId)) {
      setAllPartners(allPartners.filter(i => i.partnerId !== e.partnerId));
    } else {
      setAllPartners(i => [e, ...i]);
    }
  };
  const deFilter = e => {
    const filteredData = activeDes.filter(item => {
      return item.name.toLowerCase().includes(e.toLowerCase());
    });
    setDes(filteredData);
  };
  useEffect(() => {
    setDes(activeDes);
    reducDispatch(getActiveDes());
  }, []);
  return (
    <Dialog
      open={open}
      onClose={() => {
        handleClose();
      }}
      className="p-4">
      <DialogTitle>Edit Partners</DialogTitle>
      <form onSubmit={submit} style={{width: '500px'}}>
        <DialogContent>
          <div
            className="d-flex align-items-center"
            style={{
              width: '480px',
              flexWrap: 'wrap',
              maxHeight: '150px',
              overflow: 'auto',
            }}>
            {allPartners
              ? allPartners.map(e => (
                  <div
                    className="d-flex align-items-center p-2 m-1"
                    style={{
                      backgroundColor: 'rgba(202, 210, 226,0.5)',
                      borderRadius: '5px',
                    }}>
                    <span className="p-1 m-0">{e.name}</span>
                    <DeleteOutlineOutlinedIcon
                      sx={{fontSize: '25px'}}
                      className="m-0 mb-2 text-danger selectOrderDelBtn"
                      onClick={() =>
                        setAllPartners(() =>
                          allPartners.filter(i => i.partnerId !== e.partnerId),
                        )
                      }
                    />
                  </div>
                ))
              : null}
          </div>
          <TextField
            fullWidth
            margin="dense"
            id="ActiveDes"
            label="Active Des"
            InputLabelProps={{
              shrink: true,
            }}
            onChange={e => deFilter(e.target.value)}
            type="search"
            variant="standard"
          />
          <div className="activeDeDropDown">
            {des
              ? des.map(i => (
                  <div
                    className="d-flex justify-content-between align-items-center p-1"
                    key={i.id}>
                    <p className="m-0">
                      {i.id}. {i.name}
                      <p
                        className="m-0"
                        style={{
                          fontSize: '0.9rem',
                          opacity: 0.6,
                          fontWeight: '500',
                          paddingTop: '2px',
                        }}>
                        {i.phoneNumber}
                      </p>
                    </p>
                    <Button
                      variant="outlined"
                      size="small"
                      type="button"
                      onClick={() =>
                        addActiveDeHandle({...i, partnerId: i.id})
                      }>
                      {isPartnerAdded(i.id) ? 'Remove' : 'Add'}
                    </Button>
                  </div>
                ))
              : null}
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit" disabled={isDisabled}>
            Update
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}

export default ZonePartnerEdit;
