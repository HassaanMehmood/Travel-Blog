import React, { useState } from "react";
import axios from "axios";
import "./login.component.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:3000/login-user", {
        email,
        password,
      });

      if (response.data.status === "ok") {
        const { userType, token, user } = response.data.data;
        alert("Log-in Successful");
        window.localStorage.setItem("token", token);
        window.localStorage.setItem("userId", user._id);
        window.localStorage.setItem("userType", userType);
        window.localStorage.setItem("loggedin", true);

        window.location.href =
          userType === "admin" ? "/user-admin-details" : "/user-admin-details";
      } else {
        alert(response.data.error || "Something went wrong");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred. Please try again later.");
    }
  };

  return (
    <div className="container-fluid container-grey-background">
      <div className="row justify-content-center">
        <div className="col-md-5">
          <div className="card">
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <h3 className="text-center mb-4">Sign In</h3>

                <div className="mb-3 input-group">
                  <span className="input-group-text" id="basic-addon1">
                    <i className="fas fa-envelope"></i>
                  </span>
                  <input
                    type="email"
                    className="form-control"
                    id="formBasicEmail"
                    placeholder="Enter email"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    required
                  />
                </div>

                <div className="mb-3 input-group">
                  <span className="input-group-text" id="basic-addon2">
                    <i className="fas fa-lock"></i>
                  </span>
                  <input
                    type="password"
                    className="form-control"
                    id="formBasicPassword"
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    required
                  />
                </div>

                <div className="d-grid">
                  <button type="submit" className="btn btn-primary">
                    Log In
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <br />
    </div>
  );
}
