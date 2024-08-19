import React from "react";
import { Link } from "react-router-dom";
import { FaLocationArrow, FaPhone } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import "../styles/Footer.css";

const Footer = () => {
  return (
    <>
      <footer className="container">
        <hr />
        <div className="content">
          <div>
            <img src="/el.png" alt="logo" className="logo-img"/>
          </div>
          <div>
            <h4>Quick Links</h4>
            <ul>
              <Link to="/">Home</Link>
              <Link to="/appointment">Appointment</Link>
            </ul>
          </div>
          <div>
            <h4>Contact</h4>
            <div>
              <FaPhone />
              <span>+2541234567890</span>
            </div>
            <div>
              <MdEmail />
              <span>kithinjimutwiri1@gmail.com</span>
            </div>
            <div>
              <FaLocationArrow />
              <span>Nairobi, Kenya</span>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
