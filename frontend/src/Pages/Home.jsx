import React, { useContext } from "react";
import Hero from "../components/Hero";
import Biography from "../components/Biography";
import MessageForm from "../components/MessageForm";
import Departments from "../components/Departments";

const Home = () => {
  return (
    <>
      <Hero
        title={
          "Hospital Management System"
        }
        imageUrl={"/h1.png"}
      />
      <Biography imageUrl={"/aboutus.jpg"} />
      <Departments />
      <MessageForm />
    </>
  );
};

export default Home;
