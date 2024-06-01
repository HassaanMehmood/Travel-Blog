import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

function EditUserData() {
  const location = useLocation();
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (location.state && location.state.data) {
      console.log("Location state data:", location.state.data); // Check the data
      setFname(location.state.data.fname || "");
      setLname(location.state.data.lname || "");
      setEmail(location.state.data.email || "");
    }
  }, [location.state]); // Correctly add location.state to the dependency array

  const updateData = async () => {
    console.log("Updated Data:", { fname, lname, email });
    try {
      const response = await axios.post("http://localhost:3000/updateUser", {
        id: location.state.data._id, // Ensure you're sending the correct id
        fname: fname,
        lname: lname,
        email: email,
      });
      console.log("Response:", response.data);

      window.location.href = "/user-home-Page";
    } catch (error) {
      console.error("Error updating user data:", error);
    }
  };

  return (
    <div className="container container-grey-background">
      {/* <div className="card">
        <div className="card-body"> */}
      <h2>Edit User Data</h2>
      <form>
        <div className="mb-3">
          <label htmlFor="fname" className="form-label">
            First Name
          </label>
          <input
            type="text"
            className="form-control"
            id="fname"
            value={fname}
            onChange={(e) => setFname(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="lname" className="form-label">
            Last Name
          </label>
          <input
            type="text"
            className="form-control"
            id="lname"
            value={lname}
            onChange={(e) => setLname(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email Address
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <button type="button" className="btn btn-primary" onClick={updateData}>
          Update
        </button>
      </form>
      {/* </div>
      </div> */}
    </div>
  );
}

export default EditUserData;
