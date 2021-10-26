// import MUIDataTable from 'mui-datatables';
import MaterialTable, {MTableToolbar} from 'material-table';
import React from 'react';
import {useDispatch} from 'react-redux';
import {useHistory} from 'react-router';
import {toast} from 'react-toastify';
function ZoneTable({columns, data}) {
  const dispatch = useDispatch();
  const history = useHistory();

  return (
    <div style={{maxWidth: '100%'}}>
      <MaterialTable
        style={{padding: '0 8px', boxShadow: 'none'}}
        options={{
          paging: false,
          padding: 'dense',
          search: false,
          actionsColumnIndex: -1,
          margin: 'dense',
          debounceInterval: 1000,
          minBodyHeight: 'calc(100vh - (92px + 67px + 16px))',
          maxBodyHeight: 'calc(100vh - (92px + 67px + 16px))',
          rowStyle: {
            fontSize: '13px',
          },
        }}
        onRowClick={(event, e) =>
          history.push({pathname: `/zones/${e.zoneId}`, state: {zone: e}})
        }
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
              history.push('/zones/create');
            },
          },
        ]}
        columns={columns}
        data={data}
        title="Zones"
      />
    </div>
  );
}

export default ZoneTable;
