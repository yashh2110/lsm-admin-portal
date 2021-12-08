import React, {useEffect, useState} from 'react';
import '../css/pages/vendor.css';
import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined';
import {useHistory} from 'react-router';
import Button from '@material-ui/core/Button';
import {GoogleMap, LoadScript, Polygon} from '@react-google-maps/api';
import {deactivateZone, getZoneById} from '../components/zones/ZoneService';
import {toast} from 'react-toastify';
import CustomAlert from '../components/common/CustomAlert';
import ZoneSlotTable from '../components/zones/ZoneSlotTable';
import ZoneSlotEdit from '../components/zones/ZoneSlotEdit';
import ZonePartnerEdit from '../components/zones/ZonePartnerEdit';

function ViewZone({zoneId, setActiveTab}) {
  const history = useHistory();
  const [path, setPath] = useState();
  const [libraries] = useState(['drawing']);
  const [alertOpen, setAlertOpen] = useState(false);
  const [partnerEditOpen, setPartnerEditOpen] = useState(false);
  const [createopen, setCreateopen] = useState(false);
  const [zone, setZone] = useState();
  const [isDisabled, setIsDisabled] = useState(false);

  const handleCreateClose = () => {
    setCreateopen(false);
  };
  const getZone = () => {
    getZoneById(zoneId)
      .then(res => {
        setZone(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  };
  const deactivate = () => {
    setIsDisabled(() => true);
    deactivateZone(zoneId)
      .then(res => {
        toast.success('Zone ' + zoneId + ' has been deactivated', {
          autoClose: 2000,
        });
        history.goBack();
        getZone();
        setAlertOpen(false);
      })
      .catch(err => {
        console.log('err');
        toast.error('something went wrong', {
          autoClose: 2000,
        });
        setIsDisabled(() => true);
      });
  };
  useEffect(() => {
    setActiveTab(6);
    getZone();
  }, []);
  useEffect(() => {
    if (zone) {
      setPath(i =>
        zone.points.map(i => ({
          lat: i.latitude,
          lng: i.longitude,
        })),
      );
    }
  }, [zone]);
  return zone ? (
    <>
      <div className="vendor">
        <div className="pocreateHead">
          <div className="d-flex justify-content-center align-items-center">
            <div
              className="pocBack"
              onClick={() => {
                history.goBack();
              }}>
              <ArrowBackOutlinedIcon sx={{fontSize: '24px'}} />
            </div>
            <p className="pocTitle">Zone Details</p>
          </div>

          <div className="m-4 mt-0 mb-0">
            {zone.zoneType !== 'NORMAL' ? (
              <Button
                variant="contained"
                onClick={() => setPartnerEditOpen(true)}
                disabled={isDisabled}
                style={{
                  backgroundColor: ' rgb(223, 223, 223)',
                  boxShadow: 'none',
                  color: '#333',
                  textTransform: 'capitalize',
                  marginLeft: '20px',
                }}>
                Edit Partners
              </Button>
            ) : null}
            <Button
              variant="contained"
              onClick={() => setAlertOpen(true)}
              disabled={isDisabled}
              style={{
                backgroundColor: ' rgb(223, 223, 223)',
                boxShadow: 'none',
                color: '#333',
                textTransform: 'capitalize',
                marginLeft: '20px',
              }}>
              Deactivate Zone
            </Button>
          </div>
        </div>
        <div className="d-flex justify-content-between" style={{width: '100%'}}>
          <div
            className="d-flex justify-content-center flex-column m-5 mt-2 mb-0"
            style={{width: '50%'}}>
            <p>
              <b>Zone Id</b>: {zone.zoneId}
            </p>
            <p>
              <b>Zone Type</b>: {zone.zoneType}
            </p>
            <p>
              <b>Zone Partners</b>:{' '}
              {zone.partnersInfo.map(i => i.name).join(' , ')}
            </p>
            <p>
              <b>Zone Color</b>: {zone.color}
            </p>
          </div>
          <div style={{width: '50%'}}>
            <LoadScript
              googleMapsApiKey="AIzaSyDfo_edO8vVa26PQolLeKUF_eLO_IiknlY"
              libraries={libraries}>
              <GoogleMap
                zoom={12}
                center={{
                  lat: zone.points[0].latitude,
                  lng: zone.points[0].longitude,
                }}
                mapContainerStyle={{
                  height: '300px',
                }}
                options={{
                  zoomControl: false,
                  mapTypeControl: false,
                  streetViewControl: false,
                  fullscreenControl: false,
                }}>
                {path ? (
                  <Polygon
                    paths={path}
                    options={{
                      strokeColor: zone.color,
                      fillColor: zone.color,
                      strokeOpacity: '0.5',
                      strokeWeight: '2',
                    }}
                  />
                ) : null}
              </GoogleMap>
            </LoadScript>
          </div>
        </div>
        <div>
          {zone ? (
            <ZoneSlotTable
              data={zone}
              setCreateopen={setCreateopen}
              zoneId={zoneId}
            />
          ) : null}
        </div>
        {alertOpen ? (
          <CustomAlert
            open={alertOpen}
            handleClose={() => setAlertOpen(false)}
            alert={`Are you sure you want to deactivate the zone ?`}
            alertDesc={`By clicking this you will deactivate Zone ${zone.zoneId}`}
            confirmFunction={deactivate}
          />
        ) : null}
        {partnerEditOpen ? (
          <ZonePartnerEdit
            open={partnerEditOpen}
            handleClose={() => setPartnerEditOpen(false)}
            partners={zone.partnersInfo}
            setZone={setZone}
            zoneId={zoneId}
          />
        ) : null}
        {}
        <ZoneSlotEdit
          open={createopen}
          handleClose={handleCreateClose}
          zoneId={zoneId}
          setZone={setZone}
        />
      </div>
    </>
  ) : (
    <div>Loading...</div>
  );
}

export default ViewZone;
