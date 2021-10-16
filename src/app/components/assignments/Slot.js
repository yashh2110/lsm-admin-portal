import {Checkbox, FormControl, makeStyles} from '@material-ui/core';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  setAssignmentSlot,
  setAllSlots,
} from '../../../redux/actions/Assignments';
const initial = {
  1: false,
  2: false,
  3: false,
  4: false,
};
function Slot() {
  const dispatch = useDispatch();
  const {slots, all} = useSelector(state => state.assignments.dateandslot);
  const useStyles = makeStyles({
    input: {
      height: '20px',
      boxSizing: 'border-box', // <-- add this
    },
  });
  const classes = useStyles();
  return (
    <FormControl
      required
      component="fieldset"
      variant="standard"
      style={{
        border: 'none',
        borderBottom: '3px solid rgba(153, 115, 218, 0.585)',
        borderRadius: '5px',
        padding: '5px',
        backgroundColor: 'white',
        marginLeft: '5px',
        maxWidth: '70px',
      }}>
      <FormLabel component="legend">Slot</FormLabel>
      <FormControlLabel
        control={
          <Checkbox
            color="primary"
            checked={all}
            name="CONSUMER"
            classes={{root: classes.input}}
            onChange={() => {
              dispatch(setAssignmentSlot(initial));
              dispatch(setAllSlots(!all));
            }}
          />
        }
        label="All"
      />
      <FormControlLabel
        control={
          <Checkbox
            color="primary"
            classes={{root: classes.input}}
            checked={all ? false : slots['1']}
            onChange={() => {
              dispatch(setAssignmentSlot({...slots, 1: !slots['1']}));
              dispatch(setAllSlots(false));
            }}
            name="CONSUMER"
          />
        }
        label="1"
      />
      <FormControlLabel
        control={
          <Checkbox
            color="primary"
            checked={all ? false : slots['2']}
            classes={{root: classes.input}}
            onChange={() => {
              dispatch(setAssignmentSlot({...slots, 2: !slots['2']}));
              dispatch(setAllSlots(false));
            }}
            name="PARTNER"
          />
        }
        label="2"
      />
      <FormControlLabel
        control={
          <Checkbox
            color="primary"
            checked={all ? false : slots['3']}
            classes={{root: classes.input}}
            onChange={() => {
              dispatch(setAssignmentSlot({...slots, 3: !slots['3']}));
              dispatch(setAllSlots(false));
            }}
            name="PARTNER"
          />
        }
        label="3"
      />
      <FormControlLabel
        control={
          <Checkbox
            color="primary"
            checked={all ? false : slots['4']}
            classes={{root: classes.input}}
            onChange={() => {
              dispatch(setAssignmentSlot({...slots, 4: !slots['4']}));
              dispatch(setAllSlots(false));
            }}
            name="PARTNER"
          />
        }
        label="4"
      />
    </FormControl>
    // <Multiselect
    //   options={[
    //     {name: '1', id: 1},
    //     {name: '2', id: 2},
    //     {name: '3', id: 3},
    //     {name: '4', id: 4},
    //   ]}
    //   style={{
    //     chips: {
    //       background: 'rgb(166, 99, 230)',
    //     },
    //     multiselectContainer: {
    //       color: 'black',
    //     },
    //     searchBox: {
    //       border: 'none',
    //       borderBottom: '3px solid rgba(153, 115, 218, 0.585)',
    //       borderRadius: '5px',
    //       padding: '5px',
    //       backgroundColor: 'white',
    //       marginLeft: '5px',
    //       // width: '220px
    //       maxWidth: '70px',
    //     },
    //   }}
    //   placeholder="Slot"
    //   onSelect={(seletedList, selectedValue) => {
    //     const slotsArray = seletedList.map(i => i.id);
    //     const slotStr = slotsArray.join(',');
    //     slotForOrders(slotStr);
    //   }}
    //   onRemove={(removedList, removedValue) => {
    //     const slotsArray = removedList.map(i => i.id);
    //     const slotStr = slotsArray.join(',');
    //     slotForOrders(slotStr);
    //   }}
    //   displayValue="name"
    //   showCheckbox
    // />
  );
}

export default Slot;
