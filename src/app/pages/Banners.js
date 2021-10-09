import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getBanners} from '../../redux/actions/Banners';
import BannerTable from '../components/banners/BannersTable';
import '../css/pages/vendor.css';
// import VendorUpdateForm from '../components/vendor/VendorUpdateForm';
// import VendorCreateForm from '../components/vendor/VendorCreateForm';
// import VendorTable from '../components/vendor/VendorTable';
function Banners({setActiveTab}) {
  const banners = useSelector(state => state.banners);
  const dispatch = useDispatch();
  const [updateopen, setUpdateopen] = useState(false);
  const [createopen, setCreateopen] = useState(false);
  //   const [rowData, setRowData] = useState(false);

  //   const handleUpdateClose = () => {
  //     setUpdateopen(false);
  //     setRowData(null);
  //   };
  //   const handleCreateClose = () => {
  //     setCreateopen(false);
  //     setRowData(null);
  //   };
  useEffect(() => {
    dispatch(getBanners());
    setActiveTab(5);
  }, []);
  const columns = [
    {title: 'Id', field: 'id'},
    {
      title: 'Image',
      field: 'imagePath',
      render: rowData => (
        <img src={rowData.imagePath} alt="offer" width="120px" />
      ),
    },
    {
      title: 'OfferName',
      field: 'name',
      render: rowData => <p className="m-0">{rowData.name.toLowerCase()}</p>,
    },

    {title: 'Target', field: 'target'},
    {title: 'Priority', field: 'priority'},
    {title: 'Share Count', field: 'totalShareCount'},
    {
      title: 'Started At',
      field: 'startedAt',
      render: row => {
        const date = new Date(row.startedAt);
        return (
          <p style={{fontSize: '0.9rem', margin: 0}}>
            {date.toLocaleString('en-US', {hour: 'numeric', hour12: true})},{' '}
            {date.toDateString()}
          </p>
        );
      },
    },
    {
      title: 'Expired At',
      field: 'expiredAt',
      render: row => {
        const date = new Date(row.expiredAt);
        return (
          <p style={{fontSize: '0.9rem', margin: 0}}>
            {date.toLocaleString('en-US', {hour: 'numeric', hour12: true})},{' '}
            {date.toDateString()}
          </p>
        );
      },
    },
    {
      title: 'IsActive',
      field: 'isActive',
      //   render: row => (row.isActive ? 'Active' : 'InActive'),
    },
  ];
  return (
    <div className="vendor">
      <BannerTable
        columns={columns}
        data={banners}
        setUpdateopen={setUpdateopen}
        updateopen={updateopen}
        setCreateopen={setCreateopen}
        createopen={createopen}
        // setRowData={setRowData}
      />
      {/* {rowData ? (
        <VendorUpdateForm
          open={updateopen}
          handleClose={handleUpdateClose}
          data={rowData}
        />
      ) : null}
      <VendorCreateForm open={createopen} handleClose={handleCreateClose} /> */}
      {/* <Dtable /> */}
    </div>
  );
}

export default Banners;
