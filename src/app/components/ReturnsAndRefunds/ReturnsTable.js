import MaterialTable from 'material-table';
import React from 'react';
import ReturnsToolbar from './ReturnsToolbar';

function ReturnsTable({columns, data, setPage}) {
  return (
    <div style={{maxWidth: '100%'}}>
      <div className="p-2">
        <ReturnsToolbar setPage={setPage} />
      </div>
      <MaterialTable
        style={{padding: '0 8px', boxShadow: 'none'}}
        options={{
          paging: false,
          padding: 'dense',
          sorting: false,

          toolbar: false,
          actionsColumnIndex: -1,
          debounceInterval: 1000,
          minBodyHeight: 'calc(100vh - (92px + 67px + 5px))',
          maxBodyHeight: 'calc(100vh - (92px + 67px + 5px))',
          rowStyle: {
            fontSize: '15px',
          },
        }}
        localization={{
          toolbar: {},
        }}
        columns={columns}
        data={data}
        title="Returns And Refunds"
      />
    </div>
  );
}

export default ReturnsTable;
