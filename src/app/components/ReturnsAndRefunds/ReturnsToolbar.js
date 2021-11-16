import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  setReturnDate,
  setDenyState,
  getFilterReturnsAndRefunds,
} from '../../../redux/actions/ReturnsAndRefunds';

import '../../css/common/Toolbar.css';
function ReturnsToolbar({setPage}) {
  const dispatch = useDispatch();
  const {date, denyStatus} = useSelector(state => state.returnsandrefunds);
  return (
    <div className="toolbar">
      <div className="title">Returns And Refunds</div>
      <div className="filter justify-content-end">
        <input
          type="date"
          className="form-control"
          value={date}
          style={{width: '220px'}}
          onChange={e => {
            setPage(0);
            dispatch(setReturnDate(e.target.value));
            dispatch(
              getFilterReturnsAndRefunds({
                date: e.target.value,
                denyState: denyStatus,
              }),
            );
          }}
        />
        <select
          className="form-control category"
          onChange={e => {
            setPage(0);
            dispatch(setDenyState(e.target.value));
            dispatch(
              getFilterReturnsAndRefunds({date, denyState: e.target.value}),
            );
          }}
          value={denyStatus}>
          <option value="">Deny State</option>
          <option value="PARTIALLY_RETURNED">PARTIALLY_RETURNED</option>
          <option value="RETURNED">RETURNED</option>
          <option value="PARTIALLY_REFUNDED">PARTIALLY_REFUNDED</option>
          <option value="REFUNDED">REFUNDED</option>
        </select>
      </div>
    </div>
  );
}

export default ReturnsToolbar;
