import React, {useState} from 'react';
import {Marker, InfoWindow} from 'react-google-maps';
import {useDispatch} from 'react-redux';
import marker from '../../../assets/images/marker.svg';
import {setOrders, setSelectedOrders} from '../../../redux/actions/Assignments';

function MarkerAndInfo({i, orders}) {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  return (
    <Marker
      position={{
        lat: i.associatedAddress.lat,
        lng: i.associatedAddress.lon,
      }}
      draggable={false}
      icon={{
        url: marker,
      }}
      onClick={() => {
        dispatch(setSelectedOrders(i));
        const filterdOrders = orders.filter(k => k.id !== i.id);
        dispatch(setOrders(filterdOrders));
      }}
      onMouseOver={() => setOpen(true)}
      onMouseOut={() => setOpen(false)}>
      {open ? (
        <InfoWindow onCloseClick={() => setOpen(false)}>
          <div>
            <p style={{fontWeight: '600', letterSpacing: '0.8px'}}>
              {i.associatedAddress.recepientName}
            </p>
            <p>{i.associatedAddress.addressLine_1}</p>
            <p>
              {i.associatedAddress.landmark
                ? 'near ' + i.associatedAddress.landmark
                : null}
            </p>
          </div>
        </InfoWindow>
      ) : null}
    </Marker>
  );
}

export default MarkerAndInfo;
