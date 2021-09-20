import React from 'react';
import '../../css/common/sidebar.css';
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';
import GroupOutlinedIcon from '@mui/icons-material/GroupOutlined';
import HouseOutlinedIcon from '@mui/icons-material/HouseOutlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import {Link} from 'react-router-dom';
function Sidebar({activeTab}) {
  console.log(activeTab);
  return (
    <div className="sidebar">
      <div className="user">
        <div className="userDet">
          <div
            className="userImg"
            style={{
              backgroundImage: 'url("https://i.pravatar.cc/150?img=3")',
            }}></div>
          <div className="userName">Admin</div>
        </div>
        <div className="userMore">
          <KeyboardArrowDownOutlinedIcon />
        </div>
      </div>
      <div className="place">
        <p className="placeLabel">Region</p>
        <div className="placeDiv">
          <p className="placeName">Vijayawada-Guntur</p>
          <div>
            <KeyboardArrowDownOutlinedIcon />
          </div>
        </div>
      </div>
      <ul className="menu">
        <p className="inventoryLabel">Inventory</p>
        <li className="menu-item ">
          <GroupOutlinedIcon sx={{fontSize: 20}} className="menuicons" />{' '}
          <p>Products</p>
        </li>
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
          <ShoppingCartOutlinedIcon sx={{fontSize: 20}} className="menuicons" />{' '}
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
  );
}

export default Sidebar;
