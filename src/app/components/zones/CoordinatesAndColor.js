import React, {useState, useEffect} from 'react';
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import {createZoneService} from './ZoneService';
import {toast} from 'react-toastify';
import {useHistory} from 'react-router';
import {useDispatch} from 'react-redux';
import {setLoader} from '../../../redux/actions/Loader';

function CoordinatesAndColor({
  setColor,
  coord,
  color,
  activeDes,
  addActiveDeHandle,
  partnerIds,
}) {
  const [des, setDes] = useState();
  const [isPartner, setIsPartner] = useState(true);
  const [zoneType, setZoneType] = useState('PARTNER_ZONE');
  const history = useHistory();
  const dispatch = useDispatch();
  const zoneTypeHandler = e => {
    setZoneType(e);
    if (e === 'PARTNER_ZONE') setIsPartner(true);
    else setIsPartner(false);
  };
  const deFilter = e => {
    const filteredData = activeDes.filter(item => {
      return item.name.toLowerCase().includes(e.toLowerCase());
    });
    setDes(filteredData);
  };
  const isPartnerAdded = e => {
    if (partnerIds.some(i => i === e)) return true;
    return false;
  };
  const submit = () => {
    dispatch(setLoader(true));
    const params = {
      cityId: 1,
      color: color,
      partnerIds: partnerIds,
      vertices: coord,
      zoneType: zoneType,
      slotsInfo: [
        {
          capacity: 40,
          dayNumber: 0,
          slotId: 1,
        },
        {
          capacity: 40,
          dayNumber: 1,
          slotId: 1,
        },
        {
          capacity: 40,
          dayNumber: 2,
          slotId: 1,
        },
        {
          capacity: 40,
          dayNumber: 3,
          slotId: 1,
        },
        {
          capacity: 40,
          dayNumber: 4,
          slotId: 1,
        },
        {
          capacity: 40,
          dayNumber: 5,
          slotId: 1,
        },
        {
          capacity: 40,
          dayNumber: 6,
          slotId: 1,
        },
      ],
    };
    createZoneService(params)
      .then(res => {
        toast.success('Zone created succefully', {
          autoClose: 2000,
        });
        history.goBack();
        dispatch(setLoader(false));
      })
      .catch(err => {
        toast.error('something went wrong', {
          autoClose: 2000,
        });
        dispatch(setLoader(false));
      });
  };
  useEffect(() => {
    setDes(activeDes);
  }, []);
  return (
    <div className="in-map-form">
      <div style={{width: '100%', position: 'relative', overflow: 'auto'}}>
        <div className="">
          <p
            className="m-0"
            style={{
              fontWeight: '500',
            }}>
            Zone:
          </p>
          <div className="zonesCoord">
            {coord ? (
              coord.map(i => (
                <span className="d-flex" key={JSON.stringify(i)}>
                  <p
                    style={{
                      width: '50px',
                      margin: 0,
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                    }}>
                    {i.latitude}
                  </p>
                  ,
                  <p
                    style={{
                      margin: 0,
                      width: '50px',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                    }}>
                    {i.longitude}
                  </p>{' '}
                </span>
              ))
            ) : (
              <p>Draw the zone</p>
            )}
          </div>
        </div>
        <div className="d-flex justify-content-between mt-2">
          <p
            style={{
              fontWeight: '500',
            }}>
            Color:
          </p>
          <p>{color}</p>
          <input type="color" onChange={e => setColor(e.target.value)} />
        </div>
        <div className="d-flex justify-content-between ">
          <FormControl
            variant="standard"
            color="secondary"
            className=""
            fullWidth>
            <InputLabel id="status">Zone Type</InputLabel>
            <Select
              labelId="status"
              id="selectStatus"
              label="Status"
              defaultValue="PARTNER_ZONE"
              onChange={e => zoneTypeHandler(e.target.value)}>
              <MenuItem value="NORMAL" className="d-block p-2">
                NORMAL
              </MenuItem>
              <MenuItem value="PARTNER_ZONE" className="d-block p-2">
                PARTNER
              </MenuItem>
            </Select>
          </FormControl>
        </div>
        {isPartner ? (
          <div className="">
            <TextField
              required
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
            <div className="addedDes">
              <div className="addedDe">
                {partnerIds
                  ? partnerIds.map(i => (
                      <span
                        style={{
                          padding: '5px',
                          boxShadow: '0 1px 5px lightgrey',
                          borderRadius: '5px',
                          margin: '3px',
                          whiteSpace: 'nowrap',
                        }}>
                        <span className="m-1 text-dark">{i}</span>
                        <DeleteIcon
                          sx={{fontSize: '20px'}}
                          className="m-0 mb-2 text-danger selectOrderDelBtn"
                          onClick={() => addActiveDeHandle(i)}
                        />
                      </span>
                    ))
                  : null}
              </div>
            </div>
            <div className="activeDeDropDown">
              {des
                ? des.map(i =>
                    i.deliveryBoyType === 'PARTNER' ? (
                      <div className="d-flex justify-content-between align-items-center p-1">
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
                          onClick={() => addActiveDeHandle(i.id)}>
                          {isPartnerAdded(i.id) ? 'Remove' : 'Add'}
                        </Button>
                      </div>
                    ) : null,
                  )
                : null}
            </div>
          </div>
        ) : null}
        <div className="d-flex justify-content-between align-items-center">
          <p
            style={{fontSize: '0.9rem', width: '150px', opacity: '0.7'}}
            className="m-0 mt-2 ">
            By default the capacity is 40
          </p>
          <Button
            variant="contained"
            className="mt-2"
            style={{textTransform: 'capitalize'}}
            onClick={submit}>
            Create Zone
          </Button>
        </div>
      </div>
    </div>
  );
}

export default CoordinatesAndColor;
