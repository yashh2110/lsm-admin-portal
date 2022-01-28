import React, {useEffect, useState} from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import {MenuItem, TextField} from '@mui/material';
import {
  getSlotsForNextNDays,
  rearrangeCl,
  rescheduleOrderService,
} from './OrdersServices';
import {toast} from 'react-toastify';
import {useDispatch, useSelector} from 'react-redux';
import {getAllOrders} from '../../../redux/actions/Orders';
import {SelectPicker} from 'rsuite';
import Select from 'react-select';
function RearrangeCl({open, handleClose, rowData, id}) {
  const [deliverySlot, setDeliverySlot] = useState();
  const activeDes = useSelector(state => state.assignments.activeDes);
  const [daysFromCurrentDay, setDaysFromCurrentDay] = useState();
  const [data, setData] = useState();
  const [cl, setCl] = useState('');
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const {assignedTo, customerId, deliveryDate, deliveryState, orderId, slotId} =
    useSelector(state => state.orders);
  //   const rescheduleConfrim = e => {
  //     e.preventDefault();
  //     rescheduleOrderService({
  //       daysFromCurrentDay,
  //       deliverySlot,
  //       orderId: rowData.id,
  //     })
  //       .then(res => {
  //         handleClose();
  //         toast.success('Order Rescheduled Successfully', {
  //           autoClose: 2000,
  //         });
  //         dispatch(
  //           getAllOrders({
  //             assignedTo,
  //             customerId,
  //             deliveryDate,
  //             deliveryState,
  //             orderId,
  //             slotId,
  //           }),
  //         );
  //       })
  //       .catch(err => {
  //         console.error('Something went wrong!');
  //         console.log(err);
  //       });
  //   };
  const onSubmit = async e => {
    e.preventDefault();
    rearrangeCl({id, cl})
      .then(res => {
        handleClose();
        setCl('');
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
        toast.error('Something went wrong!', {
          autoClose: 2000,
        });
        console.log(err);
      });
  };
  return (
    <div>
      <Dialog
        open={open}
        onClose={() => {
          handleClose();
          setCl('');
        }}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description">
        <DialogTitle id="alert-dialog-title">
          Rearrange CL For Order {id}
        </DialogTitle>
        <form onSubmit={onSubmit}>
          <DialogContent style={{minWidth: '300px', height: '400px'}}>
            <Select
              className="basic-single"
              classNamePrefix="select"
              placeholder="Select CL"
              isClearable={true}
              isSearchable={true}
              name="CL"
              onChange={values => setCl(values ? values.value : '')}
              options={
                activeDes
                  ? activeDes.map(e => ({
                      label: e.name,
                      value: e.id,
                    }))
                  : null
              }
            />
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => {
                handleClose();
                setCl('');
              }}>
              Cancel
            </Button>
            <Button type="submit" autoFocus disabled={cl ? false : true}>
              Rearrange
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}

export default RearrangeCl;
