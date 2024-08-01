// Sidebar.js
import React, { useState, useRef, useEffect } from "react";
import { TiHome } from "react-icons/ti";
import { RiLogoutBoxFill } from "react-icons/ri";
import { AiFillMessage } from "react-icons/ai";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaUserDoctor } from "react-icons/fa6";
import { MdAddModerator } from "react-icons/md";
import { IoPersonAddSharp } from "react-icons/io5"; 
import { BsPeopleFill } from "react-icons/bs";
import { HiUserGroup } from "react-icons/hi";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo3.png";

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

  const handleLogout = async () => {
    try {
      const { data } = await axios.get("https://hmsback.vercel.app/api/v1/user/logout", {
        withCredentials: true,
      });
      toast.success(data.message);
      // Handle additional logout actions if needed
    } catch (error) {
      toast.error(error.response?.data?.message);
    }
  };

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
            <span>Doctors</span>
          </div>
          <div onClick={() => navigateToPage("/admin/addnew")}>
            <MdAddModerator />
            <span>Add New Admin</span>
          </div>
          <div onClick={() => navigateToPage("/doctor/addnew")}>
            <IoPersonAddSharp />
            <span>Add New Doctor</span>
          </div>
          <div onClick={() => navigateToPage("/patients")}>
            <BsPeopleFill />
            <span>Patients</span>
          </div>
          <div onClick={() => navigateToPage("/receptionists")}>
            <HiUserGroup />
            <span>Receptionists</span>
          </div>
          <div onClick={() => navigateToPage("/messages")}>
            <AiFillMessage />
            <span>Messages</span>
          </div>
          <div onClick={() => window.location.href = "https://hmsfront.vercel.app/"}>
            <TiHome />
            <span>Go to Frontend</span>
          </div>
          <div onClick={handleLogout}>
            <RiLogoutBoxFill />
            <span>Logout</span>
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
