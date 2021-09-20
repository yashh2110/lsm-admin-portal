import React from 'react';
import Sidebar from '../components/common/Sidebar';
import Navbar from '../components/common/Navbar';
import '../css/pages/index.css';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function Index({children, activeTab}) {
  return (
    <div>
      <Sidebar activeTab={activeTab} />
      <Navbar />
      <ToastContainer />
      <div className="main">{children}</div>
    </div>
  );
}

export default Index;
