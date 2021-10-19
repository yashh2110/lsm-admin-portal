import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Input,
} from '@mui/material';
import React, {useEffect} from 'react';
import ZoneCapacity from '../components/zones/ZoneCapacity';
import ZoneMap from '../components/zones/ZoneMap';
import '../css/pages/zones.css';
function Zones({setActiveTab}) {
  useEffect(() => {
    setActiveTab(6);
  }, []);
  return (
    <div className="vendor">
      <div className="zones">
        <div className="zone-map">
          <ZoneMap />
        </div>
      </div>
    </div>
  );
}

export default Zones;
