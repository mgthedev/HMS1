import React, { createContext, useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import axios from "axios";

export const Context = createContext({ isAuthenticated: true });

const AppWrapper = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [admin, setAdmin] = useState(null);

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        const { data } = await axios.get("https://hmsback.vercel.app/api/v1/user/admin/me", {
          withCredentials: true,
        });
        setAdmin(data.admin);
        setIsAuthenticated(true);
      } catch (error) {
        setIsAuthenticated(false);
        console.error("Failed to fetch admin data:", error);
      }
    };

    fetchAdminData();
  }, []);

  return (
    <Context.Provider value={{ isAuthenticated, admin }}>
      <App />
    </Context.Provider>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(
  
    <AppWrapper />
);
