import React, {useState} from 'react';
import {Marker, InfoWindow} from '@react-google-maps/api';
import marker from '../../../assets/images/marker.svg';
import {
  setMarkerInfo,
  setOrders,
  setSelectedOrders,
} from '../../../redux/actions/Assignments';
import {useDispatch, useSelector} from 'react-redux';
import {Popover} from 'rsuite';

function MarkerAndInfo({i}) {
  const [open, setOpen] = useState(false);
  const {orders} = useSelector(state => state.assignments);
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
      onClick={async () => {
        // setSelectedOrders(e => [i, ...e]);
        // const filterdOrders = orders.filter(k => k.id !== i.id);
        // setOrders(filterdOrders);
        const filterdOrders = await orders.filter(k => k.id !== i.id);
        dispatch(setOrders(filterdOrders));
        dispatch(setSelectedOrders(i));
      }}
      onMouseOver={() => dispatch(setMarkerInfo(i))}
      onMouseOut={() => dispatch(setMarkerInfo(null))}></Marker>
  );
}

export default React.memo(MarkerAndInfo);

// {open ? (
// <InfoWindow onCloseClick={() => setOpen(false)}>
//   <div style={{maxWidth: '200px'}}>
//     <p style={{fontWeight: '600', letterSpacing: '0.8px'}}>
//       {i.associatedAddress.recepientName}
//     </p>
//     <p
//       style={{
//         textOverflow: 'ellipsis',
//         overflow: 'hidden',
//         width: '100%',
//       }}>
//       {i.associatedAddress.addressLine_1}
//     </p>
//     <p>
//       {i.associatedAddress.landmark
//         ? 'near ' + i.associatedAddress.landmark
//         : null}
//     </p>
//   </div>
// </InfoWindow>
// <Popover title="Delivery Slot">
//   <p style={{maxWidth: '250px'}}>asd</p>
// </Popover>
//  ) : null}
