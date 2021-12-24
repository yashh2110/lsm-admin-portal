import React from 'react';
import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined';
import {useHistory} from 'react-router';

function OrdersToolbar({title, back}) {
  const history = useHistory();
  return (
    <div className="toolbar" style={{position: 'sticky', top: 0}}>
      <div className="d-flex align-items-center justify-content-start">
        {back ? (
          <ArrowBackOutlinedIcon
            sx={{fontSize: '24px', marginRight: '10px'}}
            onClick={() => history.goBack()}
          />
        ) : null}
        <p className="toolbar-title mt-0 mb-0">{title}</p>
      </div>
      <div className="toolbar-buttons"></div>
    </div>
  );
}

export default OrdersToolbar;
