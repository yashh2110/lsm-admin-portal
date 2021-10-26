import {
  GoogleMap,
  LoadScript,
  DrawingManager,
  Polygon,
} from '@react-google-maps/api';
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getZones} from '../../../redux/actions/Zones';
import ZoneMapStyle from '../common/ZoneMapStyle';
import CoordinatesAndColor from './CoordinatesAndColor';
function ZoneMap({
  color,
  setColor,
  coord,
  setCoord,
  activeDes,
  addActiveDeHandle,
  partnerIds,
}) {
  const dispatch = useDispatch();
  const [path, setPath] = useState([]);
  const onLoad = drawingManager => {
    console.log(drawingManager);
  };
  const zones = useSelector(state =>
    state.zones?.zonesInfo
      ? state.zones.zonesInfo.map(i => {
          const latlng = i.points.map(e => ({
            lat: e.latitude,
            lng: e.longitude,
          }));
          return {...i, latlng};
        })
      : null,
  );
  useEffect(() => {
    dispatch(getZones());
  }, []);
  const onPolygonComplete = polygon => {
    const path = polygon.getPath();
    var bounds = [];
    var bounds1 = [];
    for (var i = 0; i < path.length; i++) {
      var point = {
        latitude: path.getAt(i).lat(),
        longitude: path.getAt(i).lng(),
      };
      var point1 = {
        lat: path.getAt(i).lat(),
        lng: path.getAt(i).lng(),
      };
      bounds.push(point);
      bounds1.push(point1);
    }
    setCoord(bounds);
    setPath(bounds1);
    polygon.setMap(null);
  };
  console.log(zones);
  const [libraries] = useState(['drawing']);
  return (
    <LoadScript
      googleMapsApiKey="AIzaSyDfo_edO8vVa26PQolLeKUF_eLO_IiknlY"
      libraries={libraries}>
      <GoogleMap
        zoom={12}
        center={{lat: 16.5062, lng: 80.648}}
        mapContainerStyle={{
          height: '100%',
        }}
        options={{
          zoomControl: false,
          mapTypeControl: false,
          streetViewControl: false,
          fullscreenControl: false,
          styles: ZoneMapStyle,
        }}>
        {path.length >= 1 ? (
          <Polygon
            paths={path}
            options={{
              strokeColor: color,
              fillColor: color,
              strokeOpacity: '0.5',
              strokeWeight: '2',
            }}
          />
        ) : null}
        {zones
          ? zones.map((i, index) => (
              <Polygon
                path={i.latlng}
                key={JSON.stringify(i)}
                options={{
                  fillColor: i.color,
                  fillOpacity: 0.3,
                  strokeColor: i.color,
                  strokeOpacity: 1,
                  strokeWeight: 1,
                }}
              />
            ))
          : null}
        <DrawingManager
          onLoad={onLoad}
          onPolygonComplete={onPolygonComplete}
          options={{
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
        <CoordinatesAndColor
          addActiveDeHandle={addActiveDeHandle}
          partnerIds={partnerIds}
          setColor={setColor}
          coord={coord}
          color={color}
          activeDes={activeDes}
        />
      </GoogleMap>
    </LoadScript>
  );
}

export default React.memo(ZoneMap);
