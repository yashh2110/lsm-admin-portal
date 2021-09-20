import React from 'react'
import "../../css/common/navbar.css";
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
function Navbar() {
    return (
        <div className="navbar"> 
        <div></div>
            <div className="navDet">
                <NotificationsNoneOutlinedIcon sx={{ fontSize: 24,marginRight:"10px" }} className="notification"/>
                <div className="title">Zasket Inventory</div>
            </div>
        </div>
    )
}

export default Navbar
