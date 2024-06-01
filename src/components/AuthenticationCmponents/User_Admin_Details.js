import React, { useState, useEffect } from "react";
import axios from "axios";
import UserHomePage from "../UserComponents/userHomePage";
import AdminHomePage from "../AdminComponents/adminHomePage";

export default function UserAdminDetails() {
  const [userData, setUser] = useState(null);
  const [admin, setAdmin] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post("http://localhost:3000/userdata", {
          token: window.localStorage.getItem("token"),
        });
        console.log(response.data, "userData");

        if (response.data.data.userType === "admin") {
          setAdmin(true);
        }

        // Check for expired token before setting the state
        if (response.data.data === "token expired") {
          handleTokenExpiration();
          return; // Exit early to prevent setting state
        }

        setUser(response.data.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchData();
  }, []);

  const handleTokenExpiration = () => {
    window.localStorage.clear();
    window.localStorage.setItem("loggedin", "false");
    alert("Token Expired. Please log in again.");
    window.location.href = "/sign-in";
  };

  return (
    <div>
      {admin ? (
        <AdminHomePage userData={userData} />
      ) : (
        <UserHomePage userData={userData} />
      )}
    </div>
  );
}
