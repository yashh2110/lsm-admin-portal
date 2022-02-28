import React from 'react';
import {useSelector} from 'react-redux';
import {useDispatch} from 'react-redux';
import {setAssignemtDate} from '../../../redux/actions/Assignments';

function Date({slot, setDate}) {
  const dispatch = useDispatch();
  const {date} = useSelector(state => state.assignments.dateandslot);
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        // backgroundColor: 'white',
      }}>
      <label
        for="date"
        style={{
          margin: 0,
          fontSize: '12px',
          fontWeight: 'bold',
          padding: 0,
          paddingLeft: '2px',
        }}>
        Delivery Date
      </label>
      <input
        type="date"
        id="date"
        className="assign-date"
        value={date}
        style={{width: '220px', marginTop: '2px'}}
        onChange={e => dispatch(setAssignemtDate(e.target.value))}
      />
    </div>
  );
}

export default Date;
