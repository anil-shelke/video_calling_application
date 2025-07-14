import React from 'react'
import useAuthUser from '../hooks/useAuthUser'
import {Link, useLocation } from 'react-router';
import { BellIcon, HomeIcon, ShipWheelIcon, UsersIcon } from "lucide-react";

const Sidebar = () => {

    const {authUser} = useAuthUser();
    const location = useLocation();
    const currentPath = location.pathname;

    console.log(currentPath)

  return (
  <aside className="d-none d-lg-flex flex-column position-sticky top-0" style={{ width: '16rem', height: '100vh' }}>
    {/* Logo Section */}
    <div className="p-4">
      <Link to="/" className="d-flex align-items-center gap-2 text-decoration-none">
        <ShipWheelIcon className="fs-2 text-primary" />
        <span className="fs-3 fw-bold fst-monospace text-primary bg-gradient bg-gradient-primary-to-secondary bg-clip-text text-transparent">
          Streamify
        </span>
      </Link>
    </div>

    {/* Navigation */}
    <nav className="flex-grow-1 p-3 d-flex flex-column gap-2">
      <Link
        to="/"
        className={`btn btn-outline-secondary text-start w-100 d-flex align-items-center gap-3 px-3 ${
          currentPath === "/" ? "active" : ""
        }`}
      >
        <HomeIcon className="text-secondary opacity-75" />
        <span>Home</span>
      </Link>

      <Link
        to="/friends"
        className={`btn btn-outline-secondary text-start w-100 d-flex align-items-center gap-3 px-3 ${
          currentPath === "/friends" ? "active" : ""
        }`}
      >
        <UsersIcon className="text-secondary opacity-75" />
        <span>Friends</span>
      </Link>

      <Link
        to="/notifications"
        className={`btn btn-outline-secondary text-start w-100 d-flex align-items-center gap-3 px-3 ${
          currentPath === "/notifications" ? "active" : ""
        }`}
      >
        <BellIcon className="text-secondary opacity-75" />
        <span>Notifications</span>
      </Link>
    </nav>

    {/* User Profile Section */}
    <div className="p-3 mt-auto">
      <div className="d-flex align-items-center gap-3">
        <div className="rounded-circle overflow-hidden" style={{ width: '40px', height: '40px' }}>
          <img src={authUser?.profilePic} alt="User Avatar" className="w-100 h-100 object-fit-cover" />
        </div>
        <div className="flex-grow-1">
          <p className="fw-semibold mb-0 small">{authUser?.fullName}</p>
          <p className="text-success small d-flex align-items-center gap-1 mb-0">
            <span className="d-inline-block rounded-circle bg-success" style={{ width: '8px', height: '8px' }}></span>
            Online
          </p>
        </div>
      </div>
    </div>
  </aside>
);

}

export default Sidebar
