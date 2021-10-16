import React, {useEffect} from 'react';
import ZoneMap from '../components/zones/ZoneMap';

function Zones({setActiveTab}) {
  useEffect(() => {
    setActiveTab(6);
  }, []);
  return (
    <div className="vendor">
      <ZoneMap />
    </div>
  );
}

export default Zones;
