import React, {useEffect, useState} from 'react';
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Polygon,
} from 'react-google-maps';
import {useDispatch} from 'react-redux';
import {useSelector} from 'react-redux';
import {
  getAssignedOrders,
  getOrders,
  getOrderStateSummary,
} from '../../../redux/actions/Assignments';

import Multiselect from 'multiselect-react-dropdown';
import mapStyles from '../../components/common/MapStyles';
import '../../css/pages/assignments.css';
import MarkerAndInfo from './/MarkerAndInfo';

const Map = ({setDate, setSlot, date, slot}) => {
  const dispatch = useDispatch(new Date());
  const zones = useSelector(state => state.assignments.zones);
  const orders = useSelector(state => state.assignments.orders);
  const [finalZones, setFinalZones] = useState();

  useEffect(() => {
    if (zones) {
      const fZones = zones.map(i => {
        const latlng = i.latLngList.map(e => ({
          lat: e.latitude,
          lng: e.longitude,
        }));
        return {...i, latlng};
      });
      setFinalZones(fZones);
    }
  }, [zones]);
  const dateforOrders = e => {
    setDate(e);
    dispatch(getOrders(e, slot));
    dispatch(getAssignedOrders(e, slot));
    dispatch(getOrderStateSummary(e));
  };
  const slotForOrders = e => {
    setSlot(e);
    dispatch(getOrders(date, e));
    dispatch(getAssignedOrders(date, e));
  };

  return (
    <GoogleMap
      defaultZoom={12}
      defaultCenter={{lat: 16.5062, lng: 80.648}}
      options={{
        zoomControl: false,
        mapTypeControl: false,
        streetViewControl: false,
        fullscreenControl: false,
        styles: mapStyles,
      }}
      defaultOptions={{styles: mapStyles}}>
      {orders
        ? orders.map(i =>
            i.associatedAddress ? (
              <MarkerAndInfo i={i} orders={orders} key={i.id} />
            ) : null,
          )
        : null}
      {finalZones
        ? finalZones.map((i, index) => (
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
        : null}
      <div className="assign-date-slot ">
        <input
          type="date"
          className="assign-date "
          style={{width: '220px'}}
          onChange={e => dateforOrders(e.target.value)}
        />
        <Multiselect
          options={[
            {name: '1', id: 1},
            {name: '2', id: 2},
            {name: '3', id: 3},
            {name: '4', id: 4},
          ]}
          style={{
            chips: {
              background: 'rgb(166, 99, 230)',
            },
            multiselectContainer: {
              color: 'black',
            },
            searchBox: {
              border: 'none',
              borderBottom: '3px solid rgba(153, 115, 218, 0.585)',
              borderRadius: '5px',
              padding: '10px',
              backgroundColor: 'white',
              marginLeft: '5px',
              // width: '220px
              maxWidth: '70px',
            },
          }}
          placeholder="Slot"
          // Options to display in the dropdown
          // selectedValues={this.state.selectedValue} // Preselected value to persist in dropdown
          onSelect={(seletedList, selectedValue) => {
            const slotsArray = seletedList.map(i => i.id);
            const slotStr = slotsArray.join(',');
            slotForOrders(slotStr);
          }}
          onRemove={(removedList, removedValue) => {
            const slotsArray = removedList.map(i => i.id);
            const slotStr = slotsArray.join(',');
            slotForOrders(slotStr);
          }} // Function will trigger on remove event
          displayValue="name" // Property name to display in the dropdown options
          showCheckbox
        />
      </div>
    </GoogleMap>
  );
};
const FinalMap = withScriptjs(withGoogleMap(Map));
export default FinalMap;
