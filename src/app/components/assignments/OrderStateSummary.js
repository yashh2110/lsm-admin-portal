import {Dialog, DialogContent} from '@mui/material';
import {PDFViewer} from '@react-pdf/renderer';
import React, {useState} from 'react';
import {useSelector} from 'react-redux';
import {Link} from 'react-router-dom';
import {Cell, Column, HeaderCell, Table} from 'rsuite-table';
import OrderTags from '../pdfs/OrderTags';
import AssignmentsTableToolBar from './AssignmentsTableToolBar';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
function OrderStateSummary({orderStateSummary}) {
  const {date} = useSelector(state => state.assignments.dateandslot);
  const [open, setOpen] = useState(false);
  return (
    <div>
      <AssignmentsTableToolBar
        title="Order State Summary"
        printActiveOrders
        setOpen={setOpen}
        date={date}
      />
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
      <Dialog
        onClose={() => setOpen(false)}
        open={open}
        fullWidth
        maxWidth={800}>
        <CloseOutlinedIcon
          onClick={() => setOpen(false)}
          style={{
            position: 'fixed',
            top: 0,
            right: 0,
            color: 'grey',
            margin: '10px',
            fontSize: '2rem',
            backgroundColor: 'rgba(233, 224, 224)',
            borderRadius: '50%',
          }}
        />
        <PDFViewer
          style={{width: '100%', height: '100vh'}}
          fileName={date + '.pdf'}>
          <OrderTags date={date} />
        </PDFViewer>
      </Dialog>
    </div>
  );
}

export default OrderStateSummary;
