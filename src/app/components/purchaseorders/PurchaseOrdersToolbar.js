import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useHistory} from 'react-router';
import {
  getPurchaseOrders,
  setVendorFilter,
} from '../../../redux/actions/PurchaseOrders';
import '../../css/common/Toolbar.css';
function PurchaseOrderToolbar({setPage}) {
  const [vendor, setVendor] = useState('');
  const vendorFilter = e => {
    setPage(0);
    dispatch(getPurchaseOrders(e));
    setVendor(e);
    dispatch(setVendorFilter(e));
  };
  const dispatch = useDispatch();
  const history = useHistory();
  const vendors = useSelector(state => state.vendors);
  const vendorid = useSelector(state => state.purchaseorders.vendorid);
  console.log(vendors);
  useEffect(() => {
    if (vendorid) setVendor(vendorid);
  }, [vendorid]);
  return (
    <div className="toolbar">
      <div className="title">Purchase Orders</div>
      <div className="filter">
        <button
          className="btn"
          onClick={() => history.push('/purchaseorders/new')}
          style={{
            backgroundColor: 'rgb(223, 223, 223)',
            fontWeight: '500',
          }}>
          Create
        </button>
        <select
          className="form-control name"
          onChange={e => vendorFilter(e.target.value)}
          value={vendor}>
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
      </div>
    </div>
  );
}

export default PurchaseOrderToolbar;
