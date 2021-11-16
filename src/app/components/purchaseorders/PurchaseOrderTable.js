import MaterialTable from 'material-table';
import React, {useState} from 'react';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import {useHistory} from 'react-router-dom';
import PurchaseOrderToolbar from './PurchaseOrdersToolbar';
import {Menu, MenuItem} from '@material-ui/core';
function PurchaseOrderTable({columns, data, setPage}) {
  const history = useHistory();
  const [anchorEl, setAnchorEl] = useState({});
  const viewOrder = e => {
    history.push({pathname: `/purchaseorders/${e.id}`, state: {orderId: e.id}});
  };
  const handleClick = (event, rowData) => {
    setAnchorEl({anchor: event.currentTarget, data: rowData});
  };
  const handleClose = () => {
    setAnchorEl({anchor: null, data: undefined});
  };
  return (
    <div style={{maxWidth: '100%'}}>
      <div className="p-2">
        <PurchaseOrderToolbar setPage={setPage} />
      </div>
      <MaterialTable
        style={{padding: '0 8px', boxShadow: 'none'}}
        options={{
          paging: false,
          padding: 'dense',
          actionsColumnIndex: -1,
          toolbar: false,
          minBodyHeight: 'calc(100vh - (92px + 67px + 16px))',
          maxBodyHeight: 'calc(100vh - (92px + 67px + 16px))',
          rowStyle: {
            fontSize: '15px',
          },
        }}
        onRowClick={(event, e) => viewOrder(e)}
        actions={[
          {
            icon: MoreVertIcon,
            tooltip: 'More',
            onClick: handleClick,
          },
          {
            icon: () => (
              <div
                className="btn"
                style={{
                  backgroundColor: 'rgb(223, 223, 223)',
                  fontWeight: '500',
                }}>
                Create
              </div>
            ),
            tooltip: 'Create',
            isFreeAction: true,
            onClick: event => {
              history.push('/purchaseorders/new');
            },
          },
        ]}
        columns={columns}
        data={data}
        title="Purchase Orders"
      />
      <Menu
        id="more-menu"
        anchorEl={anchorEl.anchor}
        keepMounted={true}
        open={Boolean(anchorEl.anchor)}
        onClose={handleClose}>
        <MenuItem
          onClick={() =>
            history.push({
              pathname: `/purchaseorders/duplicate/${anchorEl.data.id}`,
              state: {item: anchorEl.data},
            })
          }>
          Duplicate
        </MenuItem>
      </Menu>
    </div>
  );
}

export default PurchaseOrderTable;
