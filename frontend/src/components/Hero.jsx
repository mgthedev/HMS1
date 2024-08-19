import React from "react";

const Hero = ({ title, imageUrl }) => {
  return (
    <>
      <div className="hero container">
        <div className="banner">
          <h1>{title}</h1>
          <p>
          Our Employee Management System is designed to streamline all HR processes, helping you stay 
          organized and focused on what truly matters—your people
          </p>
        </div>
        <div className="banner">
          <img src={"/el.png"} alt="hero" className="animated-image" />
          <span>
            <img src="/Vector.png" alt="vector" />
          </span>
        </div>
      </div>
    </>
  );
};

export default Hero;
