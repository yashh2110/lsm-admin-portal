import React from 'react';
import '../../css/common/Toolbar.css';
import SimCardDownloadIcon from '@mui/icons-material/SimCardDownload';
import Button from '@material-ui/core/Button';
import {downloadEstimationService} from './AssignmentService';
import LocalPrintshopOutlinedIcon from '@mui/icons-material/LocalPrintshopOutlined';
function AssignmentsTableToolBar({
  checkedKeys,
  title,
  downloadEstimation,
  printActiveOrders,
  date,
  setOpen,
}) {
  return (
    <div
      className="toolbar"
      style={{
        position: 'sticky',
        top: 0,
        backgroundColor: 'white',
        zIndex: 100,
      }}>
      <p className="title mb-0 mt-3">{title}</p>
      {downloadEstimation ? (
        <Button
          variant="outlined"
          disabled={checkedKeys.length >= 1 ? false : true}
          className="mt-3"
          onClick={() => downloadEstimationService(checkedKeys)}>
          <SimCardDownloadIcon /> Download Estimation
        </Button>
      ) : null}
      {printActiveOrders ? (
        <Button
          variant="outlined"
          className="mt-3"
          disabled={date ? false : true}
          onClick={() => setOpen(() => true)}>
          <LocalPrintshopOutlinedIcon style={{marginRight: '5px'}} /> Order Tags
        </Button>
      ) : null}
    </div>
  );
}

export default AssignmentsTableToolBar;
