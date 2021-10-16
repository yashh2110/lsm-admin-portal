import React from 'react';
import {Cell, Column, HeaderCell, Table} from 'rsuite-table';
import AssignmentsTableToolBar from './AssignmentsTableToolBar';

function OrderStateSummary({orderStateSummary}) {
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
          <Cell dataKey="inInventoryCount" />
        </Column>
        <Column flexGrow={1}>
          <HeaderCell>In Transit</HeaderCell>
          <Cell dataKey="inTransitCount" />
        </Column>
        <Column flexGrow={1}>
          <HeaderCell>Delivered</HeaderCell>
          <Cell dataKey="deliveredCount" />
        </Column>
        <Column flexGrow={1}>
          <HeaderCell>Assigned</HeaderCell>
          <Cell dataKey="assignedCount" />
        </Column>
        <Column flexGrow={1}>
          <HeaderCell>Cancelled</HeaderCell>
          <Cell dataKey="cancelledCount" />
        </Column>
      </Table>
    </div>
  );
}

export default OrderStateSummary;
