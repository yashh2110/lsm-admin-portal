import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import '../css/pages/vendor.css';

import ZoneTable from '../components/zones/ZoneTable';
import {getZones} from '../../redux/actions/Zones';
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
      field: 'partnerInfo',
      render: e =>
        e.partnersInfo ? e.partnersInfo.map(i => i.name).join(' , ') : null,
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
