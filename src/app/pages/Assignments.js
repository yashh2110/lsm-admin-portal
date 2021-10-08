import React, {useEffect, useState} from 'react';

import {useDispatch} from 'react-redux';
import {useSelector} from 'react-redux';
import {
  getActiveDes,
  getAssignedOrders,
  getOrders,
  getZones,
  replaceSelectedOrders,
} from '../../redux/actions/Assignments';
import ActiveDeCard from '../components/assignments/ActiveDeCard';

import '../css/pages/assignments.css';
import axios from 'axios';
import AssignedOrders from '../components/assignments/AssignedOrders';
import {toast} from 'react-toastify';
import SelectedOrderCard from '../components/assignments/SelectedOrderCard';
import OrderStateSummary from '../components/assignments/OrderStateSummary';
import FinalMap from '../components/assignments/AssignmentMap';

function Assignments({setActiveTab}) {
  const activeDes = useSelector(state => state.assignments.activeDes);
  const dispatch = useDispatch();
  const selectedOrders = useSelector(state => state.assignments.selectedOrders);
  const [date, setDate] = useState();
  const [slot, setSlot] = useState('1,2,3,4');
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
