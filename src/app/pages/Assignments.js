import React, {useEffect, useState} from 'react';

import {useDispatch, useSelector} from 'react-redux';
import {getActiveDes, getZones} from '../../redux/actions/Assignments';
import '../css/pages/vendor.css';
import '../css/pages/assignments.css';
import AssignedOrders from '../components/assignments/AssignedOrders';
import OrderStateSummary from '../components/assignments/OrderStateSummary';
import FinalMap from '../components/assignments/AssignmentMap';
import SelectedOrders from '../components/assignments/SelectedOrders';
import ActiveDes from '../components/assignments/ActiveDes';
import {CircularProgress} from '@material-ui/core';

function Assignments({setActiveTab}) {
  const dispatch = useDispatch();
  const {isfetching, assignedOrders, orderStateSummary} = useSelector(
    state => state.assignments,
  );
  const storeorders = useSelector(state => state.assignments.orders);

  const [selectedOrders, setSelectedOrders] = useState([]);
  const [orders, setOrders] = useState();
  useEffect(() => {
    dispatch(getActiveDes());
    dispatch(getZones());
    setActiveTab(4);
  }, []);
  console.log(orders);
  useEffect(() => {
    setOrders(storeorders);
  }, [storeorders]);
  return (
    <div className="vendor">
      <div className="map-assign">
        <div className="map-data">
          <FinalMap
            selectedOrders={selectedOrders}
            setSelectedOrders={setSelectedOrders}
            orders={orders}
            setOrders={setOrders}
          />
          <AssignedOrders assignedOrders={assignedOrders} />
          <OrderStateSummary orderStateSummary={orderStateSummary} />
        </div>
        <div className="assign">
          <SelectedOrders
            selectedOrders={selectedOrders}
            setSelectedOrders={setSelectedOrders}
            orders={orders}
            setOrders={setOrders}
          />
          <ActiveDes
            selectedOrders={selectedOrders}
            setSelectedOrders={setSelectedOrders}
          />
        </div>
      </div>
      {isfetching ? (
        <div className="loader">
          <CircularProgress style={{color: 'white'}} />
        </div>
      ) : null}
    </div>
  );
}

export default Assignments;
