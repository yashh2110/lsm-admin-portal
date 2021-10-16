import React, {useState} from 'react';
import {Marker, InfoWindow} from '@react-google-maps/api';
import marker from '../../../assets/images/marker.svg';

function MarkerAndInfo({i, orders, setSelectedOrders, setOrders}) {
  const [open, setOpen] = useState(false);
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
        setSelectedOrders(e => [i, ...e]);
        const filterdOrders = orders.filter(k => k.id !== i.id);
        setOrders(filterdOrders);
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

export default React.memo(MarkerAndInfo);
