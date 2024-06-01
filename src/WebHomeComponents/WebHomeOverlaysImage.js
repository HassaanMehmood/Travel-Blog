import React from "react";
import "./WebHomeOverlaysImage.css"; // Import custom styles
import img1 from "../assets/Overlays1.jpg";
import img2 from "../assets/Overlays2.jpg";
import img3 from "../assets/Overlays3.jpg";

function OverlaysImage() {
  return (
    <div className="overlay-container">
      <div className="container position-relative p-0">
        <div className="row no-gutters">
          <div className="col-md-4 p-0">
            <img
              src={img1}
              className="img-fluid overlay-image"
              alt="Landscape 1"
            />
          </div>
          <div className="col-md-4 p-0">
            <img
              src={img2}
              className="img-fluid overlay-image"
              alt="Landscape 2"
            />
          </div>
          <div className="col-md-4 p-0">
            <img
              src={img3}
              className="img-fluid overlay-image"
              alt="Landscape 3"
            />
          </div>
        </div>
        <div className="overlay-text">
          <h2>FEATURED POST</h2>
          <p>
            Explore the beautiful landscapes of Istanbul with us and Enjoy !!!
          </p>
        </div>
      </div>
    </div>
  );
}

export default OverlaysImage;
