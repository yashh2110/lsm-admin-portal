import React, {useRef} from 'react';
import Sidebar from '../components/common/Sidebar';
import Navbar from '../components/common/Navbar';
import '../css/pages/index.css';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from '../components/common/Loader';
import {useSelector} from 'react-redux';
function Index({children, activeTab}) {
  const sidebarRef = useRef();
  const loader = useSelector(state => state.Loader);
  return (
    <>
      {loader ? <Loader /> : null}
      <Sidebar ref={sidebarRef} activeTab={activeTab} />
      <Navbar sidebar={sidebarRef.current} />
      <ToastContainer />
      <div className="main">{children}</div>
    </>
  );
}

export default Index;
