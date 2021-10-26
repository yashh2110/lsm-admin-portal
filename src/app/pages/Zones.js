import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getVendors} from '../../redux/actions/Vendors';
import '../css/pages/vendor.css';

import ZoneTable from '../components/zones/ZoneTable';
import {getZones} from '../../redux/actions/Zones';
import {useHistory} from 'react-router';
function Zones({setActiveTab}) {
  const zones = useSelector(state => state.zones.zonesInfo);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getZones());
    setActiveTab(6);
  }, []);
  const columns = [
    {title: 'Id', field: 'zoneId'},
    {title: 'Zone Type', field: 'zoneType'},
    {
      title: 'Partners',
      field: 'partnerIds',
      render: e => <p>{e.partnerIds.join(' ,')}</p>,
    },
    {title: 'Color', field: 'color'},
  ];
  return (
    <div className="vendor">
      <ZoneTable columns={columns} data={zones} />
    </div>
  );
}

export default Zones;
