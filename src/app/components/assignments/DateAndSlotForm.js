import React from 'react';
import Date from './Date';
import Slot from './Slot';
import Button from '@material-ui/core/Button';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import {useSelector, useDispatch} from 'react-redux';
import {
  setAssignedOrders,
  setAssignmentSlot,
  setIsFetching,
  setOrders,
  setOrderStateSummary,
} from '../../../redux/actions/Assignments';
import {getAllService} from './AssignmentService';
import axios from 'axios';
import {CheckPicker} from 'rsuite';
function DateAndSlotForm() {
  const {date, slots, all} = useSelector(
    state => state.assignments.dateandslot,
  );
  const {markerInfo} = useSelector(state => state.assignments);
  const dispatch = useDispatch();
  console.log(markerInfo);
  const slotsData = [
    {
      label: 'All',
      value: 'all',
    },
    {
      label: '1',
      value: 1,
    },
    {
      label: '2',
      value: 2,
    },
    {
      label: '3',
      value: 3,
    },
    {
      label: '4',
      value: 4,
    },
  ];
  const searchHandle = () => {
    // let slotarr = [];
    // if (all) {
    //   slotarr = [1, 2, 3, 4];
    // } else {
    //   Object.keys(slots).map(i => {
    //     if (slots[i]) slotarr = [...slotarr, i];
    //     return i;
    //   });
    // }
    const slotStr = slots.join(',');
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
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        position: 'absolute',
        top: '0',
        width: '100%',
        // padding: '5px',
      }}>
      <div className="assign-date-slot">
        <Date />
        {/* <Slot /> */}
        <CheckPicker
          data={slotsData}
          placeholder="Slot"
          searchable={false}
          size="md"
          style={{
            width: '120px',
            marginRight: '3px',
            marginLeft: '4px',
            marginTop: '2px',
          }}
          // container={() => <div>asd</div>}
          onChange={e => {
            if (e?.some(i => i === 'all')) {
              dispatch(setAssignmentSlot([1, 2, 3, 4]));
            } else {
              dispatch(setAssignmentSlot(e));
            }
          }}
          value={slots ? slots : []}
          renderValue={(value, items) => {
            return (
              <span>
                <span style={{color: '#575757'}}></span> {value?.join(',')}
              </span>
            );
          }}
        />
        <Button
          variant="contained"
          style={{
            backgroundColor: 'white',
            width: '70px',
            boxShadow: 'none',
            padding: '5px',
            marginTop: '2px',
          }}
          size="small"
          onClick={searchHandle}>
          <SearchOutlinedIcon />
        </Button>
      </div>
      {markerInfo ? (
        <div
          style={{
            maxWidth: '35%',
            padding: '10px',
            backgroundColor: 'white',
            borderRadius: '6px 0 0 6px',
            zIndex: 100,
            position: 'absolute',
            right: 0,
            top: 0,
          }}>
          <p
            style={{
              fontWeight: '600',
              letterSpacing: '0.8px',
              margin: 0,
              textOverflow: 'ellipsis',
              overflow: 'hidden',
              width: '100%',
              whiteSpace: 'nowrap',
            }}>
            Order Id: {markerInfo?.id}
          </p>
          <p
            style={{
              fontWeight: '500',
              letterSpacing: '0.8px',
              margin: 0,
              textOverflow: 'ellipsis',
              overflow: 'hidden',
              width: '100%',
              whiteSpace: 'nowrap',
            }}>
            {markerInfo?.associatedAddress?.recepientName}
          </p>
          <p
            style={{
              textOverflow: 'ellipsis',
              overflow: 'hidden',
              width: '100%',
              margin: 0,
              whiteSpace: 'nowrap',
            }}>
            {markerInfo?.associatedAddress?.addressLine_1}
          </p>
        </div>
      ) : null}
    </div>
  );
}

export default DateAndSlotForm;
