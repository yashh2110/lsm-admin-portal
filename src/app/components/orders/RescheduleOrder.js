import React, {useEffect, useState} from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {MenuItem, TextField} from '@mui/material';
import {getSlotsForNextNDays, rescheduleOrderService} from './OrdersServices';
import {toast} from 'react-toastify';
import {useDispatch, useSelector} from 'react-redux';
import {getAllOrders} from '../../../redux/actions/Orders';
function RescheduleOrder({open, handleClose, rowData}) {
  const [deliverySlot, setDeliverySlot] = useState();
  const [daysFromCurrentDay, setDaysFromCurrentDay] = useState();
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const {
    assignedTo,
    customerId,
    // deliveredBy,
    deliveryDate,
    deliveryState,
    orderId,
    slotId,
  } = useSelector(state => state.orders);
  const rescheduleConfrim = e => {
    e.preventDefault();
    rescheduleOrderService({
      daysFromCurrentDay,
      deliverySlot,
      orderId: rowData.id,
    })
      .then(res => {
        handleClose();
        toast.success('Order Rescheduled Successfully', {
          autoClose: 2000,
        });
        dispatch(
          getAllOrders({
            assignedTo,
            customerId,
            deliveryDate,
            deliveryState,
            orderId,
            slotId,
          }),
        );
      })
      .catch(err => {
        console.error('Something went wrong!');
        console.log(err);
      });
  };
  useEffect(() => {
    getSlotsForNextNDays(rowData.id)
      .then(res => {
        setData(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.log(err);
        setLoading(false);
      });
  }, []);
  const days = [
    'Today',
    'Tomorrow',
    'Day After Tomorrow',
    'Next To Day Ater Tomorrow',
  ];
  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description">
        <DialogTitle id="alert-dialog-title">
          Reschedule Order "{rowData.id}"
        </DialogTitle>
        {!loading ? (
          <form onSubmit={rescheduleConfrim}>
            <DialogContent
              className="d-flex align-items-center flex-column"
              style={{minWidth: '300px'}}>
              <TextField
                select
                variant="standard"
                required
                label="Reschedule To"
                value={daysFromCurrentDay}
                onChange={e => {
                  setDaysFromCurrentDay(e.target.value);
                  data.map(i =>
                    i.nextDayBuffer === e.target.value
                      ? setDeliverySlot(i.id)
                      : null,
                  );
                }}
                style={{width: '200px', margin: '10px'}}>
                {data
                  ? data.map(e => (
                      <MenuItem value={e.nextDayBuffer}>
                        {days[e.nextDayBuffer]}
                      </MenuItem>
                    ))
                  : null}
              </TextField>
              <p style={{width: '200px', margin: '5px'}}>Delivery slot *</p>
              <p style={{width: '200px'}}>
                {data.map(i =>
                  i.nextDayBuffer === daysFromCurrentDay ? i.description : null,
                )}
              </p>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button type="submit" autoFocus>
                Reschedule
              </Button>
            </DialogActions>
          </form>
        ) : (
          <p>loading...</p>
        )}
      </Dialog>
    </div>
  );
}

export default RescheduleOrder;
