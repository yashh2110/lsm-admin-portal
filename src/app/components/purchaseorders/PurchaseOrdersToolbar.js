import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useHistory} from 'react-router';
import {
  getPurchaseOrders,
  setPaymentStateFilter,
  setPoEndDateFilter,
  setPoStartDateFilter,
  setPurchaseStateFilter,
  setVendorFilter,
} from '../../../redux/actions/PurchaseOrders';
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import AddIcon from '@mui/icons-material/Add';
import '../../css/common/Toolbar.css';
import PurchaseOrderFilterSm from './PurchaseOrderFilterSm';
function PurchaseOrderToolbar({setPage}) {
  const [open, setOpen] = useState(false);

  const dispatch = useDispatch();
  const history = useHistory();
  const vendors = useSelector(state => state.vendors);
  const {vendorId, purchaseState, paymentState, poStartDate, poEndDate} =
    useSelector(state => state.purchaseorders);
  // useEffect(() => {
  //   if (vendorid) setVendor(vendorid);
  // }, [vendorid]);
  return (
    <div className="toolbar">
      <div className="title mt-0">Purchase Orders</div>
      <div className="filter" style={{width: '80%'}}>
        <div
          className="d-flex justify-content-center align-items-center"
          style={{width: '220px'}}>
          <label
            htmlFor="startdate"
            style={{whiteSpace: 'nowrap', padding: '10px'}}>
            Start
          </label>
          <input
            className="form-control "
            type="date"
            id="startdate"
            value={poStartDate}
            onChange={e => {
              dispatch(setPoStartDateFilter(e.target.value));
            }}
          />
        </div>

        <div
          className="d-flex justify-content-center align-items-center"
          style={{width: '220px', marginRight: '3px'}}>
          <label
            htmlFor="enddate"
            style={{whiteSpace: 'nowrap', padding: '10px'}}>
            End
          </label>
          <input
            className="form-control "
            type="date"
            value={poEndDate}
            id="enddate"
            onChange={e => {
              dispatch(setPoEndDateFilter(e.target.value));
            }}
          />
        </div>
        <select
          className="form-control name"
          onChange={e => dispatch(setVendorFilter(e.target.value))}
          value={vendorId}>
          <option value="">Vendor Filter</option>
          {vendors ? (
            vendors.map(i => (
              <option value={i.id} key={i.id}>
                {i.name}
              </option>
            ))
          ) : (
            <option disabled>none</option>
          )}
        </select>
        <select
          className="form-control name"
          onChange={e => dispatch(setPurchaseStateFilter(e.target.value))}
          value={purchaseState}>
          <option value="">Purchase State</option>
          <option value="NOT_RECEIVED">NOT_RECEIVED</option>
          <option value="RECEIVED">RECEIVED</option>
        </select>
        <select
          className="form-control name"
          onChange={e => dispatch(setPaymentStateFilter(e.target.value))}
          value={paymentState}>
          <option value="">Payment State</option>
          <option value="NOT_PAID">NOT_PAID</option>
          <option value="PAID">PAID</option>
        </select>
        <button
          className="btn"
          onClick={() => {
            setPage(0);
            dispatch(
              getPurchaseOrders({
                vendorId,
                purchaseState,
                paymentState,
                poStartDate,
                poEndDate,
              }),
            );
          }}
          style={{
            backgroundColor: 'rgb(223, 223, 223)',
            fontWeight: '500',
            marginRight: '3px',
          }}>
          Search
        </button>
        <button
          className="btn"
          onClick={() => history.push('/purchaseorders/new')}
          style={{
            backgroundColor: 'rgb(223, 223, 223)',
            fontWeight: '500',
          }}>
          Create
        </button>
      </div>
      <div>
        <PurchaseOrderFilterSm
          open={open}
          handleClose={() => setOpen(false)}
          setPage={setPage}
        />
        <button
          className="createBtn-sm"
          onClick={() => setOpen(true)}
          style={{
            backgroundColor: 'rgb(223, 223, 223)',
            fontWeight: '500',
            padding: '2px',
            borderRadius: '5px',
            margin: '2px',
          }}>
          <FilterAltOutlinedIcon />
        </button>
        <button
          className="createBtn-sm"
          onClick={() => history.push('/purchaseorders/new')}
          style={{
            backgroundColor: 'rgb(223, 223, 223)',
            fontWeight: '500',
            padding: '2px',
            borderRadius: '5px',
            margin: '2px',
          }}>
          <AddIcon />
        </button>
      </div>
    </div>
  );
}

export default PurchaseOrderToolbar;
