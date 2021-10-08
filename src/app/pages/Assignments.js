import React, {useEffect, useMemo, useState} from 'react';
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Polygon,
} from 'react-google-maps';
import {useDispatch} from 'react-redux';
import {useSelector} from 'react-redux';
import {
  getActiveDes,
  getAssignedOrders,
  getOrders,
  getOrderStateSummary,
  getZones,
  replaceSelectedOrders,
} from '../../redux/actions/Assignments';
import ActiveDeCard from '../components/assignments/ActiveDeCard';
import Multiselect from 'multiselect-react-dropdown';
import mapStyles from '../components/common/MapStyles';
import '../css/pages/assignments.css';
import MarkerAndInfo from '../components/assignments/MarkerAndInfo';
import axios from 'axios';
import AssignedOrders from '../components/assignments/AssignedOrders';
import {toast} from 'react-toastify';
import SelectedOrderCard from '../components/assignments/SelectedOrderCard';
import OrderStateSummary from '../components/assignments/OrderStateSummary';

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

function Assignments({setActiveTab}) {
  const activeDes = useSelector(state => state.assignments.activeDes);
  const dispatch = useDispatch();
  const selectedOrders = useSelector(state => state.assignments.selectedOrders);
  const [date, setDate] = useState();
  const [slot, setSlot] = useState('1,2,3,4');
  const FinalMap = useMemo(() => withScriptjs(withGoogleMap(Map)));

  useEffect(() => {
    setActiveTab(4);
    dispatch(getActiveDes());
    dispatch(getZones());
  }, []);
  const assignDeToOrder = async de => {
    if (selectedOrders) {
      const start = new Date(date);
      start.setHours(0, 0, 0, 0);
      const end = new Date(date);
      end.setHours(23, 59, 59, 999);
      const selectedOrderIds = selectedOrders.map(i => i.id);
      const params = {
        deliveryBoyId: de.id,
        orderIdCsv: selectedOrderIds.join(','),
      };
      await axios
        .post(
          `https://test-api.zasket.in/inventory/api/1/assignment/orders`,
          params,
        )
        .then(res => {
          dispatch(getOrders(date, slot));
          dispatch(getAssignedOrders(date, slot));
          dispatch(replaceSelectedOrders([]));
          toast.success('Order Assigned successfully', {
            position: 'top-right',
            autoClose: 2000,
          });
        })
        .catch(err => {
          console.log(err);
        });
    } else {
      console.log('selete order please');
    }
  };
  return (
    <div className="vendor">
      <div className="map-assign">
        <div className="map-data">
          <FinalMap
            setDate={setDate}
            setSlot={setSlot}
            slot={slot}
            date={date}
            googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyDfo_edO8vVa26PQolLeKUF_eLO_IiknlY&v=3.exp&libraries=geometry,drawing,places"
            loadingElement={<div style={{height: `100%`}} />}
            containerElement={<div style={{height: `500px`}} />}
            mapElement={<div style={{height: `100%`}} />}></FinalMap>
          <AssignedOrders date={date} slot={slot} />
          <OrderStateSummary date={date} slot={slot} />
        </div>
        <div className="assign">
          <div>
            <p className="selectedOrderLabel">Selected Order Ids:</p>
            <p className="selectedOrder">
              {selectedOrders
                ? selectedOrders.map(i => (
                    <SelectedOrderCard
                      orderId={i.id}
                      selectedOrder={i}
                      selectedOrders={selectedOrders}
                      key={i.id}
                    />
                  ))
                : 'Please click on marker in map to select order'}
            </p>
          </div>
          <div>
            <p className="selectedOrderLabel">Assign DE :</p>
            <div className="desDiv">
              {activeDes
                ? activeDes.map(i => (
                    <div key={i.id}>
                      <ActiveDeCard de={i} assignDeToOrder={assignDeToOrder} />
                    </div>
                  ))
                : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Assignments;
