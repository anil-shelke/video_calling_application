import React from 'react'
import useAuthUser from '../hooks/useAuthUser'
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { logout } from '../lib/api';
import {Link, useLocation } from 'react-router';
import { BellIcon, LogOutIcon, ShipWheelIcon } from "lucide-react";
import useLogout from '../hooks/useLogout';


const Navbar = () => {

    const {authUser} = useAuthUser();
    const location = useLocation();
    const isChatPage = location.pathname?.startsWith("/chat");

    // const queryClient = useQueryClient();
    // const {mutate: logoutMutation} = useMutation({
    //     mutationFn: logout,
    //     onSuccess: () => queryClient.invalidateQueries({queryKey: ["authUser"]})
    // })

    const {logoutMutation} = useLogout();

  return (
  <nav className=" position-sticky top-0 z-3 d-flex align-items-center" style={{ height: '4rem' }}>
    <div className="container-fluid px-3 px-sm-4 px-lg-5">
      <div className="d-flex align-items-center w-100 justify-content-end">
        
        {/* Logo - Only on Chat Page */}
        {isChatPage && (
          <div className="pe-4">
            <Link to="/" className="d-flex align-items-center gap-2 text-decoration-none">
              <ShipWheelIcon className="fs-2 text-primary" />
              <span className="fs-3 fw-bold fst-monospace text-primary bg-gradient bg-gradient-primary-to-secondary bg-clip-text text-transparent">
                Streamify
              </span>
            </Link>
          </div>
        )}

        {/* Right-side icons */}
        <div className="d-flex align-items-center gap-3 ms-auto">

          {/* Notification Icon */}
          <Link to="/notifications">
            <button className="btn btn-outline-light rounded-circle p-2">
              <BellIcon className="text-secondary opacity-75" style={{ width: '24px', height: '24px' }} />
            </button>
          </Link>

          {/* Theme Selector Component */}
          {/* <ThemeSelector /> */}

          {/* Avatar */}
          <div className="rounded-circle overflow-hidden" style={{ width: '36px', height: '36px' }}>
            <img
              src={authUser?.profilePic}
              alt="User Avatar"
              className="img-fluid w-100 h-100 object-fit-cover"
              rel="noreferrer"
            />
          </div>

          {/* Logout Button */}
          <button className="btn btn-outline-light rounded-circle p-2" onClick={ logoutMutation}>
            <LogOutIcon className="text-secondary opacity-75" style={{ width: '24px', height: '24px' }} />
          </button>
        </div>
      </div>
    </div>
  </nav>
);

}

export default Navbar
