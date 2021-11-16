import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Waypoint} from 'react-waypoint';
import {addParnters, getPartners} from '../../redux/actions/Partners';
import PartnersTable from '../components/partners/PartnersTable';

import '../css/pages/vendor.css';

function Partners({setActiveTab}) {
  const partners = useSelector(state => state.partners);
  const dispatch = useDispatch();
  const [page, setPage] = useState(0);

  useEffect(() => {
    dispatch(getPartners());
    setActiveTab(9);
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
                if (rowdata.tableData.id === partners.length - 2) {
                  dispatch(
                    addParnters({
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
    {title: 'Partner Name', field: 'name'},
    {title: 'Mobile Number', field: 'mobileNumber'},
    {
      title: 'User Name',
      field: 'userName',
      render: e => (e.userName ? e.userName : 'N/A'),
    },
    {
      title: 'Password',
      field: 'password',
      render: e => (e.password ? e.password : 'N/A'),
    },
    {title: 'type', field: 'type'},

    {
      title: 'Partnership Type',
      field: 'partnershipType',
      render: e => (e.partnershipType ? e.partnershipType : 'N/A'),
    },
    {
      title: 'Status',
      field: 'accountStatus',
      render: e =>
        e.accountStatus === 'VERIFIED' ? 'Verified' : 'Not Verified',
    },
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
      <PartnersTable columns={columns} data={partners} setPage={setPage} />
    </div>
  );
}

export default Partners;
