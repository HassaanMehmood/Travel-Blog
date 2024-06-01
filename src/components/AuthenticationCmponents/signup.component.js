import React, { useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";
import "./signup.component.css";

export default function SignUp() {
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!fname || !lname || !email || !password) {
      alert("All fields are required");
      return;
    }

    // Check if email contains exactly "@gmail.com"
    if (!/@gmail\.com$/.test(email)) {
      alert("Email must be a Gmail address (example@gmail.com)");
      return;
    }

    try {
      const response = await axios.post("http://localhost:3000/register", {
        fname,
        lname,
        email,
        password,
        userType: "user",
      });

      if (response.data.status === "ok") {
        alert("Registration Successful");
        window.location.href = "/sign-in";
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
          <div className="card signup-margin-top">
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <h3 className="text-center mb-4">Sign Up</h3>

                <div className="mb-3">
                  <div className="input-group">
                    <span className="input-group-text">
                      <FontAwesomeIcon icon={faUser} />
                    </span>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="First name"
                      value={fname}
                      onChange={(e) => setFname(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="mb-3">
                  <div className="input-group">
                    <span className="input-group-text">
                      <FontAwesomeIcon icon={faUser} />
                    </span>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Last name"
                      value={lname}
                      onChange={(e) => setLname(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="mb-3">
                  <div className="input-group">
                    <span className="input-group-text">
                      <FontAwesomeIcon icon={faEnvelope} />
                    </span>
                    <input
                      type="email"
                      className="form-control"
                      placeholder="Enter email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="mb-3">
                  <div className="input-group">
                    <span className="input-group-text">
                      <FontAwesomeIcon icon={faLock} />
                    </span>
                    <input
                      type="password"
                      className="form-control"
                      placeholder="Enter password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="d-grid">
                  <button className="btn btn-primary" type="submit">
                    Sign Up
                  </button>
                </div>

                <p className="forgot-password text-right">
                  Already registered <a href="/sign-in">sign in?</a>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
      <br />
    </div>
  );
}
