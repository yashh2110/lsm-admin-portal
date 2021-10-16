import {GoogleMap, LoadScript, DrawingManager} from '@react-google-maps/api';
import React from 'react';
import mapStyles from '../../components/common/MapStyles';
function ZoneMap() {
  const onLoad = drawingManager => {
    console.log(drawingManager);
  };

  const onPolygonComplete = polygon => {
    console.log(polygon);
  };
  return (
    <LoadScript
      googleMapsApiKey="AIzaSyDfo_edO8vVa26PQolLeKUF_eLO_IiknlY"
      libraries={['drawing']}>
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
        <DrawingManager onLoad={onLoad} onPolygonComplete={onPolygonComplete} />
      </GoogleMap>
    </LoadScript>
  );
}

export default ZoneMap;
