// import MUIDataTable from 'mui-datatables';
import MaterialTable, {MTableToolbar} from 'material-table';
import React, {useState} from 'react';
import MoreVertIcon from '@material-ui/icons/MoreVert';

import {useDispatch} from 'react-redux';
import {toast} from 'react-toastify';
import Button from '@material-ui/core/Button';

import {ActivatePartner, deactivatePartner} from './PartnerService';
import {getPartners} from '../../../redux/actions/Partners';
import {
  FormControl,
  InputLabel,
  Menu,
  MenuItem,
  Select,
} from '@material-ui/core';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
function PartnersTable({columns, data}) {
  const [anchorEl, setAnchorEl] = useState({});
  const [openActivateForm, setOpenActivateForm] = useState(false);
  const [openDeactivate, setOpenDeactivate] = useState(false);
  const [partnership_type, setPartnership_type] = useState('');

  const handleActivateFormClose = () => {
    setOpenActivateForm(false);
    setPartnership_type(false);
  };
  const handleDeactivateClose = () => {
    setOpenDeactivate(false);
  };
  const handleClick = (event, rowData) => {
    setAnchorEl({anchor: event.currentTarget, data: rowData});
  };
  const handleClose = () => {
    setAnchorEl({anchor: null, data: undefined});
  };
  const dispatch = useDispatch();

  const deactivate = async id => {
    deactivatePartner(id)
      .then(res => {
        toast.success('Partner deactivated', {
          position: 'top-right',
          autoClose: 2000,
        });
        handleClose();
        handleDeactivateClose();
        dispatch(getPartners());
      })
      .catch(err => {
        console.log(err);
        toast.error('Something went wrong', {
          position: 'top-right',
          autoClose: 2000,
        });
      });
  };
  const activate = async id => {
    ActivatePartner(id, partnership_type)
      .then(res => {
        toast.success('Partner activated', {
          position: 'top-right',
          autoClose: 2000,
        });
        dispatch(getPartners());
        handleActivateFormClose();
        handleClose();
      })
      .catch(err => {
        console.log(err);
        toast.error('Something went wrong', {
          position: 'top-right',
          autoClose: 2000,
        });
      });
  };
  return (
    <>
      <div style={{maxWidth: '100%'}}>
        <MaterialTable
          style={{padding: '0 8px', boxShadow: 'none'}}
          options={{
            paging: false,
            sorting: false,
            padding: 'dense',
            actionsColumnIndex: -1,
            debounceInterval: 1000,
            search: false,
            minBodyHeight: 'calc(100vh - (92px + 67px + 5px))',
            maxBodyHeight: 'calc(100vh - (92px + 67px + 5px))',
            rowStyle: {
              fontSize: '15px',
            },
          }}
          localization={{
            toolbar: {},
          }}
          components={{
            Toolbar: props => (
              <div className="p-2">
                <MTableToolbar {...props} />
              </div>
            ),
          }}
          actions={[
            {
              icon: MoreVertIcon,
              tooltip: 'More',
              onClick: handleClick,
            },
          ]}
          columns={columns}
          data={data}
          title="Partners"
        />
      </div>
      <Menu
        id="more-menu"
        anchorEl={anchorEl.anchor}
        keepMounted={true}
        open={Boolean(anchorEl.anchor)}
        onClose={handleClose}>
        {anchorEl.data ? (
          <>
            {anchorEl.data.type !== 'IN_HOUSE' ? (
              <MenuItem onClick={() => setOpenActivateForm(true)}>
                Activate
              </MenuItem>
            ) : null}
            <MenuItem onClick={() => setOpenDeactivate(true)}>
              Deactivate
            </MenuItem>
          </>
        ) : null}
        {anchorEl.data ? (
          <>
            <Dialog
              open={openActivateForm}
              onClose={handleActivateFormClose}
              fullWidth
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description">
              <DialogTitle id="alert-dialog-title">
                {`Activating ${anchorEl.data.name}!`}
              </DialogTitle>
              <DialogContent>
                <FormControl
                  variant="standard"
                  fullWidth
                  //   sx={{m: 1}}
                  color="secondary"
                  className="category">
                  <InputLabel id="status">Select Category</InputLabel>
                  <Select
                    labelId="Category"
                    id="category"
                    label="category"
                    value={partnership_type}
                    onChange={e => setPartnership_type(e.target.value)}>
                    <MenuItem value="COMMUNITY_LEADER" className="d-block p-2">
                      COMMUNITY_LEADER
                    </MenuItem>
                    <MenuItem value="MARKETING_PARTNER" className="d-block p-2">
                      MARKETING_PARTNER
                    </MenuItem>
                  </Select>
                </FormControl>
              </DialogContent>
              <DialogActions>
                <Button onClick={() => activate(anchorEl.data.id)} autoFocus>
                  Activate
                </Button>
              </DialogActions>
            </Dialog>
            <Dialog
              open={openDeactivate}
              onClose={handleDeactivateClose}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description">
              <DialogTitle id="alert-dialog-title">
                {`Deactivating ${anchorEl.data.name}?`}
              </DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  By clicking this the partner will be deactivated.
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleDeactivateClose}>No</Button>
                <Button onClick={() => deactivate(anchorEl.data.id)} autoFocus>
                  Yes
                </Button>
              </DialogActions>
            </Dialog>
          </>
        ) : null}
      </Menu>
    </>
  );
}

export default PartnersTable;
