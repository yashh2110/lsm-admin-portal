import React, {useRef} from 'react';
import Sidebar from '../components/common/Sidebar';
import Navbar from '../components/common/Navbar';
import '../css/pages/index.css';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import OrderTags from '../components/pdfs/OrderTags';
import {PDFViewer} from '@react-pdf/renderer';
function Index({children, activeTab}) {
  const sidebarRef = useRef();
  return (
    <>
      <Sidebar ref={sidebarRef} activeTab={activeTab} />
      <Navbar sidebar={sidebarRef.current} />
      <ToastContainer />
      <div className="main">{children}</div>
    </>
  );
}

export default Index;
