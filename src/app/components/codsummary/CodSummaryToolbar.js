import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getCodSummary, setCodDate} from '../../../redux/actions/CodSummary';

import '../../css/common/Toolbar.css';
function CodSummaryToolbar() {
  const dispatch = useDispatch();
  const date = useSelector(state => state.codsummary.codDate);
  return (
    <div className="toolbar">
      <div className="title">COD Summary</div>
      <div className="filter justify-content-end">
        <input
          type="date"
          className="form-control"
          value={date}
          style={{width: '220px'}}
          onChange={e => {
            dispatch(setCodDate(e.target.value));
            dispatch(getCodSummary(e.target.value));
          }}
        />
      </div>
    </div>
  );
}

export default CodSummaryToolbar;
