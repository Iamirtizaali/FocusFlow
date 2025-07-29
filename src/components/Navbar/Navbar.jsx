import React, { act, useState } from "react";
import { useContext } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { ImCross } from "react-icons/im";
import { NavLink, useLocation } from "react-router-dom";
import UserContext from "../../hooks/MyContext";
import {useNavigate} from 'react-router-dom';
import logo from "../../assets/logo.png";

import { useAuth } from '../../hooks/AuthContext';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const {logout} = useAuth();
  const handleLogout = () => {
    logout();
    // Optionally, you can redirect to the login page after logout
    navigate('/login');
  };

  const [showItems, setShowItems] = useState(false);
  const contextValue = useContext(UserContext);
  const { setType } = contextValue;

  const handleTypeChange = (newType) => {
    console.log("Changing type to:", newType);
    setType(newType);
    setShowItems(false); // Close mobile menu when selection is made
  };
  return (
    <>
      <div className="navbar bg-gradient-to-b from-rose-400 to-fuchsia-700 md:h-full w-full lg:w-2/12 md:w-3/12 flex md:flex-col md:justify-start justify-between  flex-row items-center p-4 text-white">
        <NavLink
          to="/"
          className=" md:mb-4 text-2xl font-serif font-bold hover:scale-110 transition-transform order-2 md:order-1 ease-in-out delay-75 md:h-fit md:w-fit mb-0 md:mt-4  object-contain  md:max-w-56 max-w-48"
        >
          <img src={logo} alt="Logo" className=" inline-block mr-2 rounded-2xl" />
        </NavLink>

        <button
          className="md:hidden order-0 z-[60] "
          onClick={() => setShowItems(!showItems)}
        >
          <h1 className="border-white mb-4 text-3xl font-serif font-bold hover:scale-110 transition-transform ease-in-out delay-75">
            {showItems ? <ImCross /> : <GiHamburgerMenu />}
          </h1>
        </button>
        <nav className="md:order-2 h-full">
          <ul
            className={`gap-4 flex-col h-full text-xl font-semibold backdrop-blur-md sticky top-0 z-50 px-6 py-4 md:flex hidden`}
          >
            <li onClick={() => handleTypeChange("all")}>
              <NavLink
                to="/All-Tasks"
                className={({ isActive }) => {
                  // Custom logic: active if current route is All-Tasks OR home page
                  const shouldBeActive = isActive || location.pathname === "/";
                  return `text-white px-4 py-2 rounded-xl transition-all duration-300 ease-in-out hover:scale-105 hover:bg-white/20 hover:backdrop-blur-lg ${
                    shouldBeActive
                      ? "bg-white/30 scale-105 border-2 border-white"
                      : ""
                  }`;
                }}
              >
                All Task
              </NavLink>
            </li>
            <li onClick={() => handleTypeChange("active")}>
              <NavLink
                to="/Active-Tasks"
                className={({ isActive }) =>
                  `text-white px-4 py-2 rounded-xl transition-all duration-300 ease-in-out hover:scale-105 hover:bg-white/20 hover:backdrop-blur-lg ${
                    isActive
                      ? "bg-white/30 scale-105 border-2 border-white"
                      : ""
                  }`
                }
              >
                Active
              </NavLink>
            </li>
            <li onClick={() => handleTypeChange("pending")}>
              <NavLink
                to="/Pending-Tasks"
                className={({ isActive }) =>
                  `text-white px-4 py-2 rounded-xl transition-all duration-300 ease-in-out hover:scale-105 hover:bg-white/20 hover:backdrop-blur-lg ${
                    isActive
                      ? "bg-white/30 scale-105 border-2 border-white"
                      : ""
                  }`
                }
              >
                Pending
              </NavLink>
            </li>
            <li onClick={() => handleTypeChange("completed")}>
              <NavLink
                to="/Completed-Tasks"
                className={({ isActive }) =>
                  `text-white px-4 py-2 rounded-xl transition-all duration-300 ease-in-out hover:scale-105 hover:bg-white/20 hover:backdrop-blur-lg ${
                    isActive
                      ? "bg-white/30 scale-105 border-2 border-white"
                      : ""
                  }`
                }
              >
                Completed
              </NavLink>
            </li>
            <li
            className="mt-auto "
            onClick={
              handleLogout
            }>
              <NavLink
                to="/login"
                className={({ isActive }) =>
                  `text-white px-4 py-2 rounded-xl transition-all duration-300 ease-in-out hover:scale-105 hover:bg-white/20 hover:backdrop-blur-lg ${
                    isActive
                      ? "bg-white/30 scale-105 border-2 border-white"
                      : ""
                  }`
                }
              >
                Logout
              </NavLink>
            </li>
          </ul>
        </nav>
        {showItems && (
          <nav>
            <ul className="flex h-full w-fit gap-4 bg-gradient-to-b from-rose-400 to-fuchsia-700 flex-col text-xl font-semibold  backdrop-blur-md fixed inset-0 bg-white/80 items-center justify-start transition-all duration-300 top-0 z-50 px-6 py-4 pt-15">
              {/* Close button */}
              {/* <li className="absolute top-6 right-6">
                <button
                  onClick={() => setShowItems(false)}
                  className="text-white text-2xl hover:scale-110 transition-transform ease-in-out"
                >
                  <ImCross />
                </button>
              </li> */}

              {/* Menu Title */}
              {/* <li className="mb-8 mt-4">
                <h2 className="text-3xl font-serif font-bold text-white border-b-2 border-white pb-2">
                  To-Do List
                </h2>
              </li> */}

              <li onClick={() => handleTypeChange("all")}>
                <NavLink
                  to="/All-Tasks"
                  className={({ isActive }) => {
                    // Custom logic: active if current route is All-Tasks OR home page
                    const shouldBeActive = isActive || location.pathname === "/";
                    return `text-white px-6 py-3 rounded-xl transition-all duration-300 ease-in-out 
                hover:scale-105 hover:bg-white/20 hover:backdrop-blur-lg block text-center ${
                      shouldBeActive ? "bg-white/30 scale-105 border-2 border-white" : ""
                    }`;
                  }}
                >
                  All Task
                </NavLink>
              </li>
              <li onClick={() => handleTypeChange("active")}>
                <NavLink
                  to="/Active-Tasks"
                  className="text-white px-6 py-3 rounded-xl transition-all duration-300 ease-in-out
                hover:scale-105 hover:bg-white/20 hover:backdrop-blur-lg block text-center"
                >
                  Active
                </NavLink>
              </li>
              <li onClick={() => handleTypeChange("pending")}>
                <NavLink
                  to="/Pending-Tasks"
                  className="text-white px-6 py-3 rounded-xl transition-all duration-300 ease-in-out
                hover:scale-105 hover:bg-white/20 hover:backdrop-blur-lg block text-center"
                >
                  Pending
                </NavLink>
              </li>
              <li onClick={() => handleTypeChange("completed")}>
                <NavLink
                  to="/Completed-Tasks"
                  className="text-white px-6 py-3 rounded-xl transition-all duration-300 ease-in-out
                hover:scale-105 hover:bg-white/20 hover:backdrop-blur-lg block text-center"
                >
                  Completed
                </NavLink>
              </li>
               <li onClick={
              handleLogout
            }>
              <NavLink
                to="/login"
                className={({ isActive }) =>
                  `text-white px-4 py-2 rounded-xl transition-all duration-300 ease-in-out hover:scale-105 hover:bg-white/20 hover:backdrop-blur-lg ${
                    isActive
                      ? "bg-white/30 scale-105 border-2 border-white"
                      : ""
                  }`
                }
              >
                Logout
              </NavLink>
            </li>
            </ul>
          </nav>
        )}
      </div>
    </>
  );
};

export default Navbar;
