import React from 'react';
import {useSelector} from 'react-redux';
import {useDispatch} from 'react-redux';
import {setAssignemtDate} from '../../../redux/actions/Assignments';

function Date({slot, setDate}) {
  const dispatch = useDispatch();
  const {date} = useSelector(state => state.assignments.dateandslot);
  return (
    <input
      type="date"
      className="assign-date "
      value={date}
      style={{width: '220px', marginTop: '2px'}}
      onChange={e => dispatch(setAssignemtDate(e.target.value))}
    />
  );
}

export default Date;
