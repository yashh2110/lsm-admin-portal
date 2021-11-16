import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  getCustomers,
  setCustomerFilter,
} from '../../../redux/actions/Customers';

import '../../css/common/Toolbar.css';
function CustomerToolbar({setPage}) {
  const [customer, setCustomer] = useState('');
  const customerFilter = e => {
    setPage(0);
    dispatch(getCustomers(e));
    setCustomer(e);
    dispatch(setCustomerFilter(e));
  };
  const dispatch = useDispatch();
  const customerfilter = useSelector(
    state => state.purchaseorders.customerfilter,
  );
  useEffect(() => {
    if (customerfilter) setCustomer(customerfilter);
  }, [customerfilter]);
  return (
    <div className="toolbar">
      <div className="title">Customers</div>
      <div className="filter justify-content-end">
        <input
          className="form-control name"
          type="text"
          placeholder="Search here..."
          value={customer}
          onChange={e => {
            customerFilter(e.target.value);
          }}
        />
      </div>
    </div>
  );
}

export default CustomerToolbar;
