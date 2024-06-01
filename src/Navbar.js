import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";
import logo from "../src/WebLogo.jpeg";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const loggedInStatus = window.localStorage.getItem("loggedin") === "true";
    setIsLoggedIn(loggedInStatus);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = (event) => {
    event.preventDefault(); // Prevent default form submission
    window.localStorage.clear();
    setIsLoggedIn(false);
    navigate("/sign-in");
    // window.location.href = "/sign-in";
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light sticky-top">
      <Link className="navbar-brand" to="/">
        <img src={logo} className="d-inline-block align-top" alt="Logo" />{" "}
        <span>Wanderlusting</span>
      </Link>
      <button className="navbar-toggler" type="button" onClick={toggleMenu}>
        <span className="navbar-toggler-icon"></span>
      </button>
      <div
        className={`collapse navbar-collapse ${isMenuOpen ? "show" : ""}`}
        id="navbarNav"
      >
        <ul className="navbar-nav mx-auto">
          <li className="nav-item">
            <Link className="nav-link" to="/">
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/blog-post-home">
              Blog
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/user-admin-details">
              User Details
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/explore">
              Explore
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/about">
              About us
            </Link>
          </li>
          <form className="d-flex">
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <button className="btn btn-outline-success" type="submit">
              Search
            </button>
          </form>
        </ul>

        <ul className="navbar-nav ml-auto">
          {isLoggedIn ? (
            <form className="d-flex">
              <button
                className="btn btn-outline-danger"
                type="button"
                onClick={handleLogout}
              >
                Logout
              </button>
            </form>
          ) : (
            <form className="d-flex">
              <button
                className="btn btn-outline-primary me-2"
                formAction="/sign-in"
                type="submit"
              >
                Login
              </button>
              <button
                className="btn btn-outline-success"
                formAction="/sign-up"
                type="submit"
              >
                Signup
              </button>
            </form>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
