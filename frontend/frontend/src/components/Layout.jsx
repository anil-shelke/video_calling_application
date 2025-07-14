import React from 'react'
import Sidebar from './Sidebar';
import Navbar from './Navbar';

const Layout = ({ children, showSidebar = false }) => {
  return (
  <div className="min-vh-100 d-flex">
    {showSidebar && <Sidebar />}

    <div className="flex-grow-1 d-flex flex-column">
      <Navbar />
      <main className="flex-grow-1 overflow-auto">{children}</main>
    </div>
  </div>
);

}

export default Layout
