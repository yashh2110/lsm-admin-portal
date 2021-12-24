import {MenuItem, TextField} from '@mui/material';
import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {
  getAllOrders,
  setAssignedTo,
  setCustomerId,
  setDeliveryDate,
  setDeliveryState,
  setOrderId,
  setSlotId,
} from '../../../redux/actions/Orders';
import {downloadOrderInvoices} from './OrdersServices';

function OrdersFilter({slotIdParam, deliveryDateParam, deliveryStateparam}) {
  const activeDes = useSelector(state => state.assignments.activeDes);
  const {
    assignedTo,
    customerId,
    // deliveredBy,
    deliveryDate,
    deliveryState,
    orderId,
    slotId,
  } = useSelector(state => state.orders);
  const dispatch = useDispatch();
  return (
    <div className="filters">
      <TextField
        type="text"
        label="Order Id"
        variant="standard"
        sx={{width: '90px'}}
        size="small"
        onChange={e => dispatch(setOrderId(e.target.value))}
        value={orderId}
        InputLabelProps={{shrink: true}}
      />
      <TextField
        type="text"
        sx={{width: '90px'}}
        label="Customer Id"
        variant="standard"
        size="small"
        onChange={e => dispatch(setCustomerId(e.target.value))}
        value={customerId}
        InputLabelProps={{shrink: true}}
      />
      <TextField
        select
        label="Slot Id"
        variant="standard"
        sx={{width: '90px'}}
        disabled={slotIdParam ? true : false}
        value={slotIdParam || slotId}
        onChange={e => dispatch(setSlotId(e.target.value))}
        size="small"
        InputLabelProps={{shrink: true}}>
        <MenuItem value="">None</MenuItem>
        <MenuItem value={1}>1</MenuItem>
        <MenuItem value={2}>2</MenuItem>
        <MenuItem value={3}>3</MenuItem>
        <MenuItem value={4}>4</MenuItem>
      </TextField>
      <TextField
        type="date"
        label="Delivery Date"
        value={deliveryDateParam || deliveryDate}
        disabled={deliveryDateParam ? true : false}
        onChange={e => dispatch(setDeliveryDate(e.target.value))}
        variant="standard"
        size="small"
        InputLabelProps={{shrink: true}}
      />
      <TextField
        select
        sx={{width: '200px'}}
        label="Delivery State"
        disabled={deliveryStateparam ? true : false}
        variant="standard"
        onChange={e => dispatch(setDeliveryState(e.target.value))}
        size="small"
        value={deliveryStateparam || deliveryState}
        InputLabelProps={{shrink: true}}>
        <MenuItem value="">None</MenuItem>
        <MenuItem value="PAYMENT_PROCESSING">PAYMENT_PROCESSING</MenuItem>
        <MenuItem value="PAYMENT_FAILED">PAYMENT_FAILED</MenuItem>
        <MenuItem value="IN_INVENTORY">IN_INVENTORY</MenuItem>
        <MenuItem value="ASSIGNED">ASSIGNED</MenuItem>
        <MenuItem value="READY_TO_SHIP">READY_TO_SHIP</MenuItem>
        <MenuItem value="IN_TRANSIT">IN_TRANSIT</MenuItem>
        <MenuItem value="DELIVERED">DELIVERED</MenuItem>
        <MenuItem value="CANCELLED">CANCELLED</MenuItem>
        <MenuItem value="RESCHEDULED">RESCHEDULED</MenuItem>
        <MenuItem value="RETURNED">RETURNED</MenuItem>
        <MenuItem value="PARTIALLY_RETURNED">PARTIALLY_RETURNED</MenuItem>
        <MenuItem value="REFUNDED">REFUNDED</MenuItem>
        <MenuItem value="ITEM_NOT_AVAILABLE">ITEM_NOT_AVAILABLE</MenuItem>
      </TextField>

      <TextField
        select
        sx={{width: '200px'}}
        label="Assingned To"
        variant="standard"
        onChange={e => dispatch(setAssignedTo(e.target.value))}
        size="small"
        value={assignedTo}
        InputLabelProps={{shrink: true}}>
        <MenuItem value="">None</MenuItem>
        {activeDes
          ? activeDes.map(e => (
              <MenuItem key={e.id} value={e.id}>
                {e.name}
              </MenuItem>
            ))
          : null}
      </TextField>
      <button
        className="btn"
        onClick={() =>
          dispatch(
            getAllOrders({
              assignedTo,
              customerId,
              deliveryDate,
              deliveryState,
              orderId,
              slotId,
            }),
          )
        }
        style={{
          backgroundColor: 'rgb(223, 223, 223)',
          fontWeight: '500',
          whiteSpace: 'nowrap',
        }}>
        Search
      </button>
      <button
        className="btn"
        disabled={deliveryDate ? false : true}
        onClick={() =>
          downloadOrderInvoices({date: deliveryDate, slot: slotId})
        }
        style={{
          backgroundColor: 'rgb(223, 223, 223)',
          fontWeight: '500',
          whiteSpace: 'nowrap',
        }}>
        Download Invoices
      </button>
    </div>
  );
}

export default OrdersFilter;
