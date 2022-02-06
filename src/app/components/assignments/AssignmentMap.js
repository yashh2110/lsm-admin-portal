import React from 'react';

import mapStyles from '../../components/common/MapStyles';
import '../../css/pages/assignments.css';
import {LoadScript, GoogleMap} from '@react-google-maps/api';
import Markers from './Markers';
import Polygons from './Polygons';

import DateAndSlotForm from './DateAndSlotForm';

const FinalMap = ({selectedOrders, setSelectedOrders, orders, setOrders}) => {
  return (
    <LoadScript googleMapsApiKey="AIzaSyDfo_edO8vVa26PQolLeKUF_eLO_IiknlY">
      <GoogleMap
        zoom={12}
        center={{lat: 16.5062, lng: 80.648}}
        mapContainerStyle={{
          height: '500px',
        }}
        options={{
          zoomControl: false,
          mapTypeControl: false,
          streetViewControl: false,
          fullscreenControl: false,
          styles: mapStyles,
        }}>
        <Markers />
        <Polygons />
        <DateAndSlotForm />
      </GoogleMap>
    </LoadScript>
  );
};
export default FinalMap;
