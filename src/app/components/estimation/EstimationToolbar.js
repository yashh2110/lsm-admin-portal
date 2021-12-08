import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  getEstimations,
  setEstimationCategory,
  setEstimationEndDate,
  setEstimationSlot,
  setEstimationStartDate,
} from '../../../redux/actions/Estimation';
import CheckPicker from 'rsuite/CheckPicker';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import '../../css/common/Toolbar.css';
import {downloadEstimationService} from './EstimationService';
function EstimationToolbar() {
  const cat = useSelector(state => state.products.catogories);
  const dispatch = useDispatch();
  const slotsData = [
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

  const {category, startDate, endDate, slotId} = useSelector(
    state => state.estimations,
  );
  const filter = ({type, payload}) => {
    switch (type) {
      case 'startDate':
        dispatch(setEstimationStartDate(payload));

        return;
      case 'endDate':
        dispatch(setEstimationEndDate(payload));

        return;
      case 'category':
        dispatch(setEstimationCategory(payload));

        return;
      case 'slotId':
        dispatch(setEstimationSlot(payload));

        return;
      default:
        return;
    }
  };
  const onSubmit = e => {
    e.preventDefault();
    dispatch(getEstimations({slotId, category, startDate, endDate}));
  };
  return (
    <div className="toolbar" style={{zIndex: 1000}}>
      <div className="title">Estimations</div>
      <form onSubmit={onSubmit} className="filter " style={{width: '75%'}}>
        <div
          className="d-flex justify-content-center align-items-center"
          style={{width: '25%'}}>
          <label
            htmlFor="startdate"
            style={{whiteSpace: 'nowrap', padding: '10px'}}>
            Start
          </label>
          <input
            className="form-control "
            type="date"
            id="startdate"
            value={startDate}
            onChange={e => {
              filter({type: 'startDate', payload: e.target.value});
            }}
          />
        </div>

        <div
          className="d-flex justify-content-center align-items-center"
          style={{width: '25%', marginRight: '3px'}}>
          <label
            htmlFor="enddate"
            style={{whiteSpace: 'nowrap', padding: '10px'}}>
            End
          </label>
          <input
            className="form-control "
            type="date"
            value={endDate}
            id="enddate"
            onChange={e => {
              console.log(e.target.value);
              filter({type: 'endDate', payload: e.target.value});
            }}
          />
        </div>
        {/* <select
          className="form-control"
          style={{width: '10%'}}
          value={slotId}
          onChange={e => filter({type: 'slotId', payload: e.target.value})}>
          <option value="">slots</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
        </select> */}
        <CheckPicker
          data={slotsData}
          placeholder="Slot"
          searchable={false}
          style={{width: '120px', marginRight: '3px'}}
          onChange={e => filter({type: 'slotId', payload: e.join(',')})}
          renderValue={(value, items) => {
            return (
              <span>
                <span style={{color: '#575757'}}></span> {value.join(',')}
              </span>
            );
          }}
        />
        <CheckPicker
          placeholder="Categories"
          data={
            cat
              ? cat.map(e => ({label: e.displayName, value: e.displayName}))
              : null
          }
          searchable={false}
          style={{width: '160px', marginRight: '3px'}}
          onChange={e => filter({type: 'category', payload: e.join(',')})}
          renderValue={(value, items) => {
            return (
              <span>
                <span style={{color: '#575757'}}></span> {value.join(',')}
              </span>
            );
          }}
        />
        {/* <select
          className="form-control "
          onChange={e => filter({type: 'category', payload: e.target.value})}
          style={{width: '20%'}}
          value={category}>
          <option value="">Category</option>
          {cat ? (
            cat.map(i => (
              <option value={i.displayName} key={i.id}>
                {i.displayName}
              </option>
            ))
          ) : (
            <option disabled>none</option>
          )}
        </select> */}
        <button
          className="btn"
          type="submit"
          style={{
            backgroundColor: 'rgb(223, 223, 223)',
            fontWeight: '500',
            marginRight: '3px',
            whiteSpace: 'nowrap',
          }}>
          Search
        </button>
        <button
          className="btn btn-light"
          onClick={() =>
            downloadEstimationService({category, startDate, endDate, slotId})
          }
          disabled={category && startDate && endDate && slotId ? false : true}
          style={{
            backgroundColor: 'rgb(223, 223, 223)',
            fontWeight: '500',
            marginRight: '3px',
            whiteSpace: 'nowrap',
          }}>
          <FileDownloadOutlinedIcon /> Estimation
        </button>
      </form>
    </div>
  );
}

export default EstimationToolbar;
