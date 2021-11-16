// import MUIDataTable from 'mui-datatables';
import MaterialTable, {MTableToolbar} from 'material-table';
import React from 'react';
import CodSummaryToolbar from './CodSummaryToolbar';

function CodSummaryTable({columns, data}) {
  return (
    <div style={{maxWidth: '100%'}}>
      <div className="p-2">
        <CodSummaryToolbar />
      </div>
      <MaterialTable
        style={{padding: '0 8px', boxShadow: 'none'}}
        options={{
          paging: false,
          padding: 'dense',
          actionsColumnIndex: -1,
          toolbar: false,
          debounceInterval: 1000,
          minBodyHeight: 'calc(100vh - (92px + 67px + 16px))',
          maxBodyHeight: 'calc(100vh - (92px + 67px + 16px))',
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
        columns={columns}
        data={data}
        title="COD Summary"
      />
    </div>
  );
}

export default CodSummaryTable;
