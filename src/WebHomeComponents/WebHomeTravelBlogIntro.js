import React from "react";
import travel1 from "../assets/travel1.jpg";
import travel2 from "../assets/travel2.jpg";
import travel3 from "../assets/travel3.jpg";
import travel4 from "../assets/travel4.jpg";
import "./WebHomeTravelBlogIntro.css";

function TravelBlogIntro() {
  return (
    <div className="container intro-container">
      <div className="row no-gutters">
        <div className="col-lg-6 mb-4 mb-lg-0">
          <div className="row no-gutters">
            <div className="col-6 p-1">
              <img
                src={travel1}
                className="img-fluid mb-3 intro-image fixed-dimensions"
                alt="Travel 1"
              />
            </div>
            <div className="col-6 p-1">
              <img
                src={travel2}
                className="img-fluid mb-3 intro-image fixed-dimensions"
                alt="Travel 2"
              />
            </div>
          </div>
          <div className="row no-gutters">
            <div className="col-6 p-1">
              <img
                src={travel3}
                className="img-fluid mb-3 intro-image fixed-dimensions"
                alt="Travel 3"
              />
            </div>
            <div className="col-6 p-1">
              <img
                src={travel4}
                className="img-fluid mb-3 intro-image fixed-dimensions"
                alt="Travel 4"
              />
            </div>
          </div>
        </div>
        <div className="col-lg-6 d-flex flex-column justify-content-center">
          <div className="intro-text text-center text-lg-left">
            <h2 className="intro-title">
              Wanderlusting: Share Your Travels, Inspire Others
            </h2>
            <p className="intro-paragraph">
              Welcome to Wanderlust Unleashed, your one-stop shop for all things
              travel! Whether you're a seasoned explorer or a first-time
              adventurer, this platform is designed to ignite your travel
              dreams. Share your travel experiences through engaging blog posts,
              captivating photos, and insightful reviews. Dive into a world of
              diverse destinations, hidden gems, and practical tips from fellow
              travel enthusiasts. Let's embark on a journey together, one
              adventure at a time!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TravelBlogIntro;
