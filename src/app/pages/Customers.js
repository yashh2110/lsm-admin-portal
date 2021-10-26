import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Waypoint} from 'react-waypoint';
import {getCustomers, getCustomersByPage} from '../../redux/actions/Customers';
import CustomersTable from '../components/customers/CustomersTable';

import '../css/pages/vendor.css';

function Customers({setActiveTab}) {
  const {customers, customerfilter} = useSelector(state => state.customers);
  const dispatch = useDispatch();
  const [page, setPage] = useState(0);

  useEffect(() => {
    dispatch(getCustomers());
    setActiveTab(7);
  }, []);
  const columns = [
    {
      title: 'Id',
      field: 'id',
      width: '10%',
      render: rowdata => {
        return (
          <>
            <Waypoint
              onEnter={() => {
                if (rowdata.tableData.id === customers.length - 2) {
                  dispatch(
                    getCustomersByPage({
                      id: customerfilter,
                      page: page + 1,
                    }),
                  );
                  setPage(i => i + 1);
                }
              }}></Waypoint>
            {rowdata.id}
          </>
        );
      },
    },
    {title: 'Customer Name', field: 'name'},
    {title: 'User Email', field: 'userEmail'},
    {title: 'Mobile Number', field: 'userMobileNumber'},
    {title: 'creditBalance', field: 'creditBalance'},
    {title: 'Is Blocked', field: 'isBlocked'},
    {
      title: 'Created At',
      field: 'createdAt',
      render: row => {
        const date = new Date(row.createdAt);
        return (
          <p style={{fontSize: '0.8rem', margin: 0}}>
            {/* {date.toLocaleString('en-US', {hour: 'numeric', hour12: true})},{' '} */}
            {date.toDateString()}
          </p>
        );
      },
    },
  ];
  return (
    <div className="vendor">
      <CustomersTable columns={columns} data={customers} setPage={setPage} />
    </div>
  );
}

export default Customers;
