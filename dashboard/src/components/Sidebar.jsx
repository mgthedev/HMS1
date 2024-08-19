// Sidebar.js
import React, { useState, useRef, useEffect } from "react";
import { TiHome } from "react-icons/ti";
import { AiFillMessage } from "react-icons/ai";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaUserDoctor } from "react-icons/fa6";
import { IoPersonAddSharp } from "react-icons/io5"; 
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import logo from "/el.png";

const Sidebar = () => {
  const [show, setShow] = useState(false);
  const sidebarRef = useRef(null);
  const navigateTo = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setShow(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  

  const navigateToPage = (path) => {
    navigateTo(path);
    setShow(false);
  };

  return (
    <>
      <nav ref={sidebarRef} className={show ? "show sidebar" : "sidebar"}>
        <div className="logo-container">
          <img src={logo} alt="Logo" className="logo" />
        </div>
        <div className="links">
          <div onClick={() => navigateToPage("/")}>
            <TiHome />
            <span>Home</span>
          </div>
          <div onClick={() => navigateToPage("/doctors")}>
            <FaUserDoctor />
            <span>Employees</span>
          </div>
          
          <div onClick={() => navigateToPage("/doctor/addnew")}>
            <IoPersonAddSharp />
            <span>Add New Employee</span>
          </div>
         
          <div onClick={() => navigateToPage("/messages")}>
            <AiFillMessage />
            <span>Messages Issues</span>
          </div>
          <div onClick={() => window.location.href = "https://hmsfront.vercel.app/"}>
            <TiHome />
            <span>Go to Frontend</span>
          </div>
          
        </div>
      </nav>
      <div className="wrapper" style={{ display: "flex" }}>
        <GiHamburgerMenu className="hamburger" onClick={() => setShow(!show)} />
      </div>
    </>
  );
};

export default Sidebar;
