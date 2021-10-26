// import MUIDataTable from 'mui-datatables';
import MaterialTable, {MTableToolbar} from 'material-table';
import React, {useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';
import {useHistory} from 'react-router';
import {toast} from 'react-toastify';
function ZoneSlotTable({data}) {
  const dispatch = useDispatch();
  const [zoneData, setZoneData] = useState();
  const history = useHistory();
  const days = [
    'Sunday',
    'monday',
    'tuesday',
    'wednesday',
    'thursday',
    'friday',
    'saturday',
  ];
  useEffect(() => {
    const flatData = data.map(i => ({
      ...i,
      slot: i.slotInfo.id,
      timings: i.slotInfo.description,
    }));
    setZoneData(flatData);
  }, []);
  const columns = [
    {title: 'Day', field: 'dayNumber', render: e => <p>{days[e.dayNumber]}</p>},
    {title: 'Slot', field: 'slot'},
    {title: 'Timings', field: 'timings'},
    {title: 'Capacity', field: 'capacity'},
  ];
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
                Edit
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
        data={zoneData}
        title="Slots Info"
      />
    </div>
  );
}

export default ZoneSlotTable;
