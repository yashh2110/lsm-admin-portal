import React from 'react';
import '../../css/common/navbar.css';
import MenuIcon from '@mui/icons-material/Menu';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
function Navbar({sidebar}) {
  const sidebarHandle = () => {
    if (sidebar.style.left === '0px') {
      sidebar.style.left = '-100%';
    } else {
      sidebar.style.left = 0;
    }
  };
  return (
    <div className="navbar">
      <div className="navbar-menuBtn" onClick={sidebarHandle}>
        <MenuIcon sx={{fontSize: 28}} />
      </div>
      <div className="navDet">
        <NotificationsNoneOutlinedIcon
          sx={{fontSize: 24, marginRight: '10px'}}
          className="notification"
        />
        <div className="title">Zasket Inventory</div>
      </div>
    </div>
  );
}

export default Navbar;
