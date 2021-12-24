import React from 'react';
import {useSelector} from 'react-redux';
import {Link} from 'react-router-dom';
import {Cell, Column, HeaderCell, Table} from 'rsuite-table';
import AssignmentsTableToolBar from './AssignmentsTableToolBar';

function OrderStateSummary({orderStateSummary}) {
  const {date} = useSelector(state => state.assignments.dateandslot);

  return (
    <div>
      <AssignmentsTableToolBar title="Order State Summary" />
      <Table wordWrap autoHeight data={orderStateSummary} id="table">
        <Column>
          <HeaderCell>Slot Id</HeaderCell>
          <Cell dataKey="slotId" />
        </Column>
        <Column flexGrow={1}>
          <HeaderCell>In Inventory</HeaderCell>
          <Cell>
            {row => (
              <Link
                style={{color: 'blue'}}
                to={`orders?slotId=${row.slotId}&deliveryDate=${date}&state=IN_INVENTORY`}>
                {row.inInventoryCount}
              </Link>
            )}
          </Cell>
        </Column>
        <Column flexGrow={1}>
          <HeaderCell>In Transit</HeaderCell>
          <Cell>
            {row => (
              <Link
                style={{color: 'blue'}}
                to={`orders?slotId=${row.slotId}&deliveryDate=${date}&state=IN_TRANSIT`}>
                {row.inTransitCount}
              </Link>
            )}
          </Cell>
        </Column>
        <Column flexGrow={1}>
          <HeaderCell>Delivered</HeaderCell>
          <Cell>
            {row => (
              <Link
                style={{color: 'blue'}}
                to={`orders?slotId=${row.slotId}&deliveryDate=${date}&state=DELIVERED`}>
                {row.deliveredCount}
              </Link>
            )}
          </Cell>
        </Column>
        <Column flexGrow={1}>
          <HeaderCell>Assigned</HeaderCell>
          <Cell>
            {row => (
              <Link
                style={{color: 'blue'}}
                to={`orders?slotId=${row.slotId}&deliveryDate=${date}&state=ASSIGNED`}>
                {row.assignedCount}
              </Link>
            )}
          </Cell>
        </Column>
        <Column flexGrow={1}>
          <HeaderCell>Cancelled</HeaderCell>
          <Cell>
            {row => (
              <Link
                style={{color: 'blue'}}
                to={`orders?slotId=${row.slotId}&deliveryDate=${date}&state=CANCELLED`}>
                {row.cancelledCount}
              </Link>
            )}
          </Cell>
        </Column>
      </Table>
    </div>
  );
}

export default OrderStateSummary;
