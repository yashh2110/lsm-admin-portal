import {
  GoogleMap,
  LoadScript,
  DrawingManager,
  Polygon,
} from '@react-google-maps/api';
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getZones} from '../../../redux/actions/Zones';
import {Marker} from '@react-google-maps/api';
import ZoneMapStyle from '../common/ZoneMapStyle';
import marker from '../../../assets/images/marker.svg';
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
  const [highlightCoord, setHighlightCoord] = useState();
  // const latRef = useRef();
  // const lngRef = useRef();
  const [lat, setLat] = useState(16.5062);
  const [lng, setLng] = useState(80.648);
  const onLoad = drawingManager => {
    console.log(drawingManager);
  };
  // const mark = () => {
  //   setLat(() => parseInt(latRef.current.value));
  //   setLng(() => parseInt(lngRef.current.value));
  // };
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
        center={{lat: lat, lng: lng}}
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
        {highlightCoord ? (
          <Polygon
            paths={highlightCoord}
            options={{
              strokeColor: 'black',
              fillColor: 'black',
              strokeOpacity: '1',
              strokeWeight: '3',
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
        <Marker
          position={{
            lat: lat,
            lng: lng,
          }}
          draggable={true}
          onDragEnd={e => {
            setLat(e.latLng.lat());
            setLng(e.latLng.lng());
          }}
          icon={{
            url: marker,
          }}></Marker>
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
        <form
          style={{
            position: 'absolute',
            left: 0,
            bottom: '10px',
          }}>
          <div
            style={{
              position: 'relative',
              width: '265px',
              height: '240px',
              backgroundColor: 'white',
              margin: '5px',
              borderRadius: '5px',
              padding: '4px',
              overflow: 'auto',
            }}>
            {zones
              ? zones.map(e => (
                  <div
                    key={e.zoneId}
                    style={{
                      padding: '7px',
                      margin: '1px',
                      position: 'relative',
                      width: '100%',
                    }}
                    className="selectedZone"
                    onClick={() => {
                      setHighlightCoord(e.latlng);
                      setLat(() => e.latlng[0].lat);
                      setLng(() => e.latlng[0].lng);
                    }}>
                    <div>{e.zoneId + '. ' + e.zoneType}</div>
                    <span style={{color: 'grey', whiteSpace: 'nowrap'}}>
                      {e.partnersInfo.map(i => i.name).join(' , ')}
                    </span>
                  </div>
                ))
              : null}
          </div>
          <div
            style={{
              bottom: '10px',
              backgroundColor: 'white',
              margin: '5px',
              borderRadius: '5px',
              padding: '4px',
            }}>
            <span>Lat</span>
            <input
              required
              type="number"
              step={0.01}
              value={lat}
              onChange={e => setLat(() => parseFloat(e.target.value))}
              style={{
                padding: '5px',
                width: '100px',
                margin: '4px',
                borderRadius: '5px',
                border: '2px solid lightgrey',
              }}
              placeholder="Enter Lat"
            />
            <span>Lat</span>
            <input
              type="number"
              step={0.01}
              value={lng}
              onChange={e => setLng(() => parseFloat(e.target.value))}
              style={{
                padding: '5px',
                width: '100px',
                margin: '4px',
                borderRadius: '5px',
                border: '2px solid lightgrey',
              }}
              placeholder="Enter Lng"
            />
            {/* <Button variant="contained" type="submit">
            Mark
          </Button> */}
          </div>
        </form>
      </GoogleMap>
    </LoadScript>
  );
}

export default React.memo(ZoneMap);
