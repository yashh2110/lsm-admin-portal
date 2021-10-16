import {Polygon} from '@react-google-maps/api';
import React from 'react';
import {useSelector} from 'react-redux';

function Polygons() {
  const zones = useSelector(state =>
    state.assignments.zones.map(i => {
      const latlng = i.latLngList.map(e => ({
        lat: e.latitude,
        lng: e.longitude,
      }));
      return {...i, latlng};
    }),
  );
  return zones
    ? zones.map((i, index) => (
        <Polygon
          path={i.latlng}
          key={i.coordinates + index}
          options={{
            fillColor: i.color,
            fillOpacity: 0.3,
            strokeColor: i.color,
            strokeOpacity: 1,
            strokeWeight: 1,
          }}
        />
      ))
    : null;
}

export default React.memo(Polygons);
