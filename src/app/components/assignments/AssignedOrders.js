import MaterialTable from 'material-table';
import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getAssignedOrders, getOrders} from '../../../redux/actions/Assignments';
import DownloadIcon from '@mui/icons-material/Download';
import DeliveryDiningIcon from '@mui/icons-material/DeliveryDining';
import DeleteIcon from '@mui/icons-material/Delete';
import SimCardDownloadIcon from '@mui/icons-material/SimCardDownload';
import {toast} from 'react-toastify';
import {
  deleteAssignmentService,
  downloadEstimationService,
  downloadInvoicesService,
  makeTransitService,
} from './AssignmentService';
const columns = [
  {title: 'De Id', field: 'id'},
  {title: 'De', field: 'de'},
  {title: 'orders', field: 'orders', render: row => row.orders.join(',')},
];
function AssignedOrders({date, slot}) {
  const dispatch = useDispatch();
  const assignedOrders = useSelector(state => state.assignments.assignedOrders);

  const deleteAssignment = (event, rowData) => {
    deleteAssignmentService(rowData)
      .then(res => {
        dispatch(getOrders(date, slot));
        dispatch(getAssignedOrders(date, slot));
        toast.success('Deleted Order Assignment Succefully', {
          position: 'top-right',
          autoClose: 2000,
        });
      })
      .catch(err => {
        console.log(err);
        toast.error('Something went wrong', {
          position: 'top-right',
          autoClose: 2000,
        });
      });
  };
  const makeTransit = async (event, rowData) => {
    makeTransitService(rowData)
      .then(res => {
        toast.success('Order is in transit now', {
          position: 'top-right',
          autoClose: 2000,
        });
      })
      .catch(err => {
        toast.error('Something went wrong', {
          position: 'top-right',
          autoClose: 2000,
        });
      });
  };

  return (
    <div>
      <MaterialTable
        style={{padding: '0 8px', boxShadow: 'none', marginTop: '10px'}}
        options={{
          paging: false,
          padding: 'dense',
          search: false,
          selection: true,
          actionsColumnIndex: -1,
          rowStyle: {
            fontSize: '15px',
          },

          draggable: false,
        }}
        actions={[
          {
            icon: () => (
              <DeliveryDiningIcon
                sx={{fontSize: '24px', color: '#333', margin: '5px'}}
              />
            ),
            tooltip: 'Make Transit',
            position: 'row',
            onClick: makeTransit,
          },
          {
            icon: () => (
              <DownloadIcon
                sx={{fontSize: '24px', color: '#333', margin: '5px'}}
              />
            ),
            position: 'row',
            tooltip: 'Download Invoice',
            onClick: downloadInvoicesService,
          },
          {
            icon: () => (
              <DeleteIcon
                sx={{fontSize: '20px', color: '#333', margin: '5px'}}
              />
            ),
            position: 'row',
            tooltip: 'Delete',
            onClick: deleteAssignment,
          },
          {
            icon: () => (
              <div className="btn btn-light">
                <SimCardDownloadIcon
                  sx={{fontSize: '20px', color: '#333', margin: '5px'}}
                />
                Download Estimation
              </div>
            ),
            tooltip: 'Download Estimation',
            onClick: downloadEstimationService,
          },
        ]}
        columns={columns}
        data={assignedOrders}
        title="Assigned Orders"
      />
    </div>
  );
}

export default AssignedOrders;
