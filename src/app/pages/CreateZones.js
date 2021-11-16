import React, {useEffect, useState} from 'react';
import ZoneMap from '../components/zones/ZoneMap';
import '../css/pages/zones.css';
import {useDispatch, useSelector} from 'react-redux';
import {getActiveDes} from '../../redux/actions/Assignments';
function CreateZones({setActiveTab}) {
  const [color, setColor] = useState('#000');
  const [coord, setCoord] = useState('');
  const [partnerIds, setPartnerIds] = useState([]);
  const dispatch = useDispatch();
  const activeDes = useSelector(state => state.assignments.activeDes);
  const addActiveDeHandle = id => {
    console.log(partnerIds.some(e => e === id));
    if (partnerIds.some(e => e === id)) {
      setPartnerIds(partnerIds.filter(i => i !== id));
    } else {
      setPartnerIds(i => [id, ...i]);
    }
  };
  console.log(partnerIds);
  useEffect(() => {
    dispatch(getActiveDes());
    setActiveTab(6);
  }, []);
  return (
    <div className="vendor">
      <div className="zones">
        <div className="zone-map">
          <ZoneMap
            activeDes={activeDes}
            color={color}
            setColor={setColor}
            coord={coord}
            setCoord={setCoord}
            addActiveDeHandle={addActiveDeHandle}
            partnerIds={partnerIds}
          />
        </div>
      </div>
    </div>
  );
}

export default CreateZones;
