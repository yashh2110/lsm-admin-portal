import MaterialTable from 'material-table';
import React from 'react';
import {useSelector} from 'react-redux';
import EstimationToolbar from './EstimationToolbar';

function EstimationsTable({columns}) {
  const {estimations} = useSelector(state => state.estimations);
  return (
    <div style={{maxWidth: '100%'}}>
      <div className="p-2">
        <EstimationToolbar />
      </div>
      <MaterialTable
        style={{padding: '0 8px', boxShadow: 'none'}}
        options={{
          paging: false,
          padding: 'dense',
          actionsColumnIndex: -1,
          sorting: false,
          toolbar: false,
          minBodyHeight: 'calc(100vh - (92px + 67px + 16px))',
          maxBodyHeight: 'calc(100vh - (92px + 67px + 16px))',
          rowStyle: {
            fontSize: '13px',
          },

          draggable: false,
        }}
        columns={columns}
        data={estimations}
        title="Estimations"
      />
    </div>
  );
}

export default EstimationsTable;
