import {
  GoogleMap,
  LoadScript,
  DrawingManager,
  Polygon,
} from '@react-google-maps/api';
import React, {useState} from 'react';
import ZoneMapStyle from '../common/ZoneMapStyle';
import CoordinatesAndColor from './CoordinatesAndColor';
function ZoneMap() {
  const [color, setColor] = useState('#000');
  const [coord, setCoord] = useState('');
  const onLoad = drawingManager => {
    console.log(drawingManager);
  };
  const onPolygonComplete = polygon => {
    const path = polygon.getPath();
    var bounds = [];
    for (var i = 0; i < path.length; i++) {
      var point = {
        lat: path.getAt(i).lat(),
        lng: path.getAt(i).lng(),
      };
      bounds.push(point);
    }
    setCoord(bounds);
    polygon.setMap(null);
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
          styles: ZoneMapStyle,
        }}>
        {coord.length >= 1 ? (
          <Polygon
            paths={coord}
            options={{
              strokeColor: color,
              fillColor: color,
              strokeOpacity: '0.5',
              strokeWeight: '2',
            }}
          />
        ) : null}
        <DrawingManager
          onLoad={onLoad}
          onPolygonComplete={onPolygonComplete}
          options={{
            // drawingControl: true,
            drawingControlOptions: {
              drawingModes: ['polygon'],
            },
            polygonOptions: {
              fillColor: `#fff`,
              fillOpacity: 0.7,
              strokeWeight: 2,
              clickable: true,
              editable: true,
              zIndex: 1,
            },
          }}
        />
        <CoordinatesAndColor setColor={setColor} coord={coord} color={color} />
      </GoogleMap>
    </LoadScript>
  );
}

export default ZoneMap;
