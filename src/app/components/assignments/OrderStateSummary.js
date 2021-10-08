import MaterialTable from 'material-table';
import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getOrderStateSummary} from '../../../redux/actions/Assignments';

const columns = [
  {title: 'Slot Id', field: 'slotId'},
  {title: 'In Inventory', field: 'inInventoryCount'},
  {title: 'In Transit', field: 'inTransitCount'},
  {title: 'Delivered', field: 'deliveredCount'},
  {title: 'Assigned', field: 'assignedCount'},
  {title: 'Cancelled', field: 'cancelledCount'},
];

function OrderStateSummary({date}) {
  const dispatch = useDispatch();
  const orderStateSummary = useSelector(
    state => state.assignments.orderStateSummary,
  );
  useEffect(() => {
    if (date) dispatch(getOrderStateSummary(date));
  }, []);
  return (
    <div>
      <MaterialTable
        style={{padding: '0 8px', boxShadow: 'none', marginTop: '10px'}}
        options={{
          paging: false,
          padding: 'dense',
          search: false,
          actionsColumnIndex: -1,
          rowStyle: {
            fontSize: '15px',
          },

          draggable: false,
        }}
        columns={columns}
        data={orderStateSummary}
        title="Order State Summary"
      />
    </div>
  );
}

export default OrderStateSummary;
