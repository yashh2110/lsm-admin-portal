import React from 'react';
import Date from './Date';
import Slot from './Slot';
import Button from '@material-ui/core/Button';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import {useSelector, useDispatch} from 'react-redux';
import {
  setAssignedOrders,
  setIsFetching,
  setOrders,
  setOrderStateSummary,
} from '../../../redux/actions/Assignments';
import {getAllService} from './AssignmentService';
import axios from 'axios';
function DateAndSlotForm() {
  const {date, slots, all} = useSelector(
    state => state.assignments.dateandslot,
  );
  const dispatch = useDispatch();
  const searchHandle = () => {
    let slotarr = [];
    if (all) {
      slotarr = [1, 2, 3, 4];
    } else {
      Object.keys(slots).map(i => {
        if (slots[i]) slotarr = [...slotarr, i];
        return i;
      });
    }
    const slotStr = slotarr.join(',');
    getAllService(date, slotStr)
      .then(
        axios.spread((...alldata) => {
          const assigndata = Object.keys(alldata[1].data).map(i => {
            const item = {
              id: i.split(':')[0],
              de: i.split(':')[1],
              orders: alldata[1].data[i],
            };
            return item;
          });
          dispatch(setOrders(alldata[0].data));
          dispatch(setAssignedOrders(assigndata));
          dispatch(setOrderStateSummary(alldata[2].data));
          dispatch(setIsFetching(false));
        }),
      )
      .catch(err => {
        console.log(err);
      });
  };
  return (
    <div className="assign-date-slot">
      <Date />
      <Slot />
      <Button
        variant="contained"
        style={{
          backgroundColor: 'white',
          width: '70px',
          margin: '4px 5px',
        }}
        onClick={searchHandle}>
        <SearchOutlinedIcon />
      </Button>
    </div>
  );
}

export default DateAndSlotForm;
