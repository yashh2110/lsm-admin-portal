import React from 'react';
import '../../css/common/navbar.css';
import MenuIcon from '@mui/icons-material/Menu';
// import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import logo from '../../../assets/images/logo.svg';
function Navbar({sidebar}) {
  const sidebarHandle = () => {
    sidebar.classList.toggle('sidebar-open');
  };
  return (
    <div className="navbar">
      <div className="navbar-menuBtn" onClick={sidebarHandle}>
        <MenuIcon sx={{fontSize: 28}} />
      </div>
      <div className="navDet">
        {/* <NotificationsNoneOutlinedIcon
          sx={{fontSize: 24, marginRight: '10px'}}
          className="notification"
        /> */}
        <div className="title">
          <img
            src={logo}
            alt="Zasket"
            width="120px"
            style={{marginTop: '-12px'}}
          />{' '}
          Inventory
        </div>
      </div>
    </div>
  );
}

export default Navbar;
