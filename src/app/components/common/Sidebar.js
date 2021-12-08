import React, {forwardRef} from 'react';
import '../../css/common/sidebar.css';
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';
import GroupOutlinedIcon from '@mui/icons-material/GroupOutlined';
import HouseOutlinedIcon from '@mui/icons-material/HouseOutlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import ListAltOutlinedIcon from '@mui/icons-material/ListAltOutlined';
import AssignmentTurnedInOutlinedIcon from '@mui/icons-material/AssignmentTurnedInOutlined';
import LocalOfferOutlinedIcon from '@mui/icons-material/LocalOfferOutlined';
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined';
import EditLocationOutlinedIcon from '@mui/icons-material/EditLocationOutlined';
import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined';
import PersonPinOutlinedIcon from '@mui/icons-material/PersonPinOutlined';
import InsertChartOutlinedIcon from '@mui/icons-material/InsertChartOutlined';
import KeyboardReturnOutlinedIcon from '@mui/icons-material/KeyboardReturnOutlined';
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';
import {Link} from 'react-router-dom';
import logo from '../../../assets/icons/logo.png';
import {setUser} from '../../../redux/actions/Users';

import {useSelector, useDispatch} from 'react-redux';
import {signoutService} from '../../auth/AuthService';
const Sidebar = forwardRef(({activeTab}, ref) => {
  const {name} = useSelector(state => state.user);
  const dispatch = useDispatch();
  const signout = () => {
    dispatch(setUser({islogged: false}));
    signoutService()
      .then(res => {
        localStorage.removeItem('sessionId');
        localStorage.removeItem('user');
      })
      .catch(err => {
        console.log(err);
      });
  };
  return (
    <div ref={ref} className="sidebar">
      <div
        className="overlay"
        onClick={() => ref.current.classList.toggle('sidebar-open')}></div>
      <div className="sidebarDiv">
        <div className="user">
          <div className="userDet">
            <img src={logo} alt="user" className="userImg" />
            <div className="userandplace">
              <p className="userName">{name}</p>
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
          {/* <p className="inventoryLabel">Orders</p> */}
          <Link
            to="/orders"
            onClick={() => ref.current.classList.toggle('sidebar-open')}
            className={activeTab === 12 ? 'menu-item active' : 'menu-item'}>
            <BookmarkBorderOutlinedIcon
              sx={{fontSize: 20}}
              className="menuicons"
            />
            <p>Orders</p>
          </Link>
          <Link
            to="/assignments"
            onClick={() => ref.current.classList.toggle('sidebar-open')}
            className={activeTab === 4 ? 'menu-item active' : 'menu-item'}>
            <AssignmentTurnedInOutlinedIcon
              sx={{fontSize: 20}}
              className="menuicons"
            />
            <p>Assignments</p>
          </Link>
          <Link
            to="/banners"
            onClick={() => ref.current.classList.toggle('sidebar-open')}
            className={activeTab === 5 ? 'menu-item active' : 'menu-item'}>
            <LocalOfferOutlinedIcon sx={{fontSize: 20}} className="menuicons" />
            <p>Offer Management</p>
          </Link>
          <Link
            to="/zones"
            onClick={() => ref.current.classList.toggle('sidebar-open')}
            className={activeTab === 6 ? 'menu-item active' : 'menu-item'}>
            <EditLocationOutlinedIcon
              sx={{fontSize: 20}}
              className="menuicons"
            />
            <p>Zones</p>
          </Link>
          <Link
            to="/estimations"
            onClick={() => ref.current.classList.toggle('sidebar-open')}
            className={activeTab === 11 ? 'menu-item active' : 'menu-item'}>
            <InsertChartOutlinedIcon
              sx={{fontSize: 20}}
              className="menuicons"
            />
            <p>Estimation</p>
          </Link>
        </ul>
        <ul className="menu">
          {/* <p className="inventoryLabel">Inventory</p> */}
          <Link
            to="/"
            onClick={() => ref.current.classList.toggle('sidebar-open')}
            className={activeTab === 0 ? 'menu-item active' : 'menu-item'}>
            <ListAltOutlinedIcon sx={{fontSize: 20}} className="menuicons" />{' '}
            <p>Products</p>
          </Link>
          <Link
            to="/customers"
            onClick={() => ref.current.classList.toggle('sidebar-open')}
            className={activeTab === 7 ? 'menu-item active' : 'menu-item'}>
            <GroupsOutlinedIcon sx={{fontSize: 20}} className="menuicons" />{' '}
            <p>Customers</p>
          </Link>
          <Link
            to="/vendors"
            onClick={() => ref.current.classList.toggle('sidebar-open')}
            className={activeTab === 1 ? 'menu-item active' : 'menu-item'}>
            <GroupOutlinedIcon sx={{fontSize: 20}} className="menuicons" />{' '}
            <p>Vendors</p>
          </Link>
          <Link
            to="/warehouses"
            onClick={() => ref.current.classList.toggle('sidebar-open')}
            className={activeTab === 2 ? 'menu-item active' : 'menu-item'}>
            <HouseOutlinedIcon sx={{fontSize: 20}} className="menuicons" />{' '}
            <p>Warehouses</p>
          </Link>
          <Link
            to="/partners"
            onClick={() => ref.current.classList.toggle('sidebar-open')}
            className={activeTab === 9 ? 'menu-item active' : 'menu-item'}>
            <PersonPinOutlinedIcon sx={{fontSize: 20}} className="menuicons" />{' '}
            <p>Partners</p>
          </Link>
          <Link
            to="/purchaseorders"
            onClick={() => ref.current.classList.toggle('sidebar-open')}
            className={activeTab === 3 ? 'menu-item active' : 'menu-item'}>
            <ShoppingCartOutlinedIcon
              sx={{fontSize: 20}}
              className="menuicons"
            />{' '}
            <p>Purchase Orders</p>
          </Link>
          <Link
            to="/returnsandrefunds"
            onClick={() => ref.current.classList.toggle('sidebar-open')}
            className={activeTab === 10 ? 'menu-item active' : 'menu-item'}>
            <KeyboardReturnOutlinedIcon
              sx={{fontSize: 20}}
              className="menuicons"
            />{' '}
            <p>Returns And Refunds</p>
          </Link>
          <Link
            to="/codsummary"
            onClick={() => ref.current.classList.toggle('sidebar-open')}
            className={activeTab === 8 ? 'menu-item active' : 'menu-item'}>
            <AssignmentOutlinedIcon sx={{fontSize: 20}} className="menuicons" />{' '}
            <p>COD Summary</p>
          </Link>
          <div className="menu-item" onClick={signout}>
            <LogoutOutlinedIcon sx={{fontSize: 20}} className="menuicons" />{' '}
            <p>Sign Out</p>
          </div>
        </ul>
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
