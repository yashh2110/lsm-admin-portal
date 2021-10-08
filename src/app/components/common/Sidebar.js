import React, {forwardRef} from 'react';
import '../../css/common/sidebar.css';
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';
import GroupOutlinedIcon from '@mui/icons-material/GroupOutlined';
import HouseOutlinedIcon from '@mui/icons-material/HouseOutlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import ListAltOutlinedIcon from '@mui/icons-material/ListAltOutlined';
import AssignmentTurnedInOutlinedIcon from '@mui/icons-material/AssignmentTurnedInOutlined';
import {Link} from 'react-router-dom';
const Sidebar = forwardRef(({activeTab}, ref) => {
  return (
    <div ref={ref} className="sidebar">
      <div className="sidebarDiv">
        <div className="user">
          <div className="userDet">
            <div
              className="userImg"
              style={{
                backgroundImage: 'url("https://i.pravatar.cc/150?img=3")',
              }}></div>
            <div className="userandplace">
              <p className="userName">Admin</p>
              <p className="placeName">Vijayawada-Guntur</p>
            </div>
          </div>
          <div className="userMore">
            <KeyboardArrowDownOutlinedIcon />
          </div>
        </div>
        {/* <div className="place">
          <p className="placeLabel">Region</p>
          <div className="placeDiv">
            <p className="placeName">Vijayawada-Guntur</p>
            <div>
              <KeyboardArrowDownOutlinedIcon />
            </div>
          </div>
        </div> */}
        <ul className="menu">
          <p className="inventoryLabel">Orders</p>
          <Link
            to="/assignments"
            className={activeTab === 4 ? 'menu-item active' : 'menu-item'}>
            <AssignmentTurnedInOutlinedIcon
              sx={{fontSize: 20}}
              className="menuicons"
            />
            <p>Assignments</p>
          </Link>
        </ul>
        <ul className="menu">
          <p className="inventoryLabel">Inventory</p>
          <Link
            to="/"
            className={activeTab === 0 ? 'menu-item active' : 'menu-item'}>
            <ListAltOutlinedIcon sx={{fontSize: 20}} className="menuicons" />{' '}
            <p>Products</p>
          </Link>
          <Link
            to="/vendors"
            className={activeTab === 1 ? 'menu-item active' : 'menu-item'}>
            <GroupOutlinedIcon sx={{fontSize: 20}} className="menuicons" />{' '}
            <p>Vendors</p>
          </Link>
          <Link
            to="/warehouses"
            className={activeTab === 2 ? 'menu-item active' : 'menu-item'}>
            <HouseOutlinedIcon sx={{fontSize: 20}} className="menuicons" />{' '}
            <p>Warehouses</p>
          </Link>
          <Link
            to="/purchaseorders"
            className={activeTab === 3 ? 'menu-item active' : 'menu-item'}>
            <ShoppingCartOutlinedIcon
              sx={{fontSize: 20}}
              className="menuicons"
            />{' '}
            <p>Purchase Orders</p>
          </Link>
        </ul>

        <div className="foot">
          <div className="signout">
            <LogoutOutlinedIcon sx={{fontSize: 20}} />
            <p> Sign Out</p>
          </div>
        </div>
      </div>
      <div
        className="backDrop"
        onClick={() => {
          ref.current.style.left = '-100%';
        }}></div>
    </div>
  );
});

export default Sidebar;
