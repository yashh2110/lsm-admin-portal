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
  // const {isfetching} = useSelector(state => state.assignments);

  useEffect(() => {
    dispatch(getActiveDes());
    dispatch(getZones());
    setActiveTab(4);
  }, []);

  return (
    <div className="vendor">
      <div className="map-assign">
        <div className="map-data">
          <FinalMap />
          <AssignedOrders />
          <OrderStateSummary />
        </div>
        <div className="assign">
          <SelectedOrders />
          <ActiveDes />
        </div>
      </div>
      {/* {isfetching ? (
        <div className="loader">
          <CircularProgress style={{color: 'white'}} />
        </div>
      ) : null} */}
    </div>
  );
}

export default Assignments;
