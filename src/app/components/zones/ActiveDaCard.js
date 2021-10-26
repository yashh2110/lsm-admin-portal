import React from 'react';
import PeopleOutlineOutlinedIcon from '@mui/icons-material/PeopleOutlineOutlined';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import Button from '@material-ui/core/Button';
function ActiveDaCard({de, addActiveDeHandle}) {
  return (
    <div className="deCard">
      <div className="deCardDet">
        {de.deliveryBoyType === 'PARTNER' ? (
          <HomeOutlinedIcon sx={{fontSize: 20}} />
        ) : (
          <PeopleOutlineOutlinedIcon />
        )}
        <p className="deCardName">{de.name}</p>
      </div>
      <div>
        <Button
          variant="outlined"
          size="small"
          onClick={() => addActiveDeHandle(de.id)}
          style={{textTransform: 'capitalize'}}>
          Add
        </Button>
      </div>
    </div>
  );
}

export default ActiveDaCard;
