import React from 'react';
import PeopleOutlineOutlinedIcon from '@mui/icons-material/PeopleOutlineOutlined';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import Button from '@material-ui/core/Button';
function ActiveDeCard({de, assignDeToOrder, isLoading}) {
  return (
    <div className="deCard">
      <div className="deCardDet">
        {de.deliveryBoyType === 'IN_HOUSE' ? (
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
          disabled={isLoading}
          onClick={() => assignDeToOrder(de)}
          style={{textTransform: 'capitalize'}}>
          assign
        </Button>
      </div>
    </div>
  );
}

export default React.memo(ActiveDeCard);
