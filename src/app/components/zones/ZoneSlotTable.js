// import MUIDataTable from 'mui-datatables';
import MaterialTable, {MTableToolbar} from 'material-table';
import React, {useEffect, useState} from 'react';
import {updateSlotCapacity} from './ZoneService';
function ZoneSlotTable({data, setCreateopen, zoneId}) {
  const [zoneData, setZoneData] = useState();
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
    const flatData = data.slotsInfo.map(i => ({
      ...i,
      slot: i.slotInfo.id,
      timings: i.slotInfo.description,
    }));
    setZoneData(flatData);
  }, [data]);
  const columns = [
    {
      title: 'Day',
      field: 'dayNumber',
      editable: 'never',
      render: e => <p>{days[e.dayNumber]}</p>,
    },
    {title: 'Slot', field: 'slot', lookup: {1: '1', 2: '2', 3: '3', 4: '4'}},
    // {title: 'Timings', field: 'timings'},
    {title: 'Capacity', field: 'capacity'},
  ];
  return zoneData ? (
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
        editable={{
          onRowUpdate: (newData, oldData) =>
            new Promise((resolve, reject) => {
              const params = {
                dayNumber: newData.dayNumber,
                newCapacity: parseInt(newData.capacity),
                slotId: parseInt(newData.slot),
                zoneId: parseInt(zoneId),
              };
              console.log(params);
              updateSlotCapacity(params)
                .then(() => {
                  const dataUpdate = [...zoneData];
                  const index = oldData.tableData.id;
                  dataUpdate[index] = newData;
                  setZoneData([...dataUpdate]);
                  resolve();
                })
                .catch(err => {
                  console.log(err);
                  reject();
                });
            }),
        }}
        // actions={[
        //   {
        //     icon: () => (
        //       <div
        //         className="btn"
        //         style={{
        //           backgroundColor: 'rgb(223, 223, 223)',
        //           fontWeight: '500',
        //         }}>
        //         Update Slot capacity
        //       </div>
        //     ),
        //     tooltip: 'Update slot capacity',
        //     isFreeAction: true,
        //     onClick: event => {
        //       setCreateopen(true);
        //     },
        //   },
        // ]}
        columns={columns}
        data={zoneData}
        title="Slots Info"
      />
    </div>
  ) : null;
}

export default ZoneSlotTable;
