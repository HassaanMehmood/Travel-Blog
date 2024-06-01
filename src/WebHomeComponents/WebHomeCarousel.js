import React, { useEffect } from "react";
import pic1 from "../assets/pic_1.jpg";
import pic2 from "../assets/pic_2.jpg";
import pic3 from "../assets/pic_3.jpg";
import "./WebHomeCarousel.css";
import { useNavigate } from "react-router-dom";

const WebHomeCarousel = () => {
  const navigate = useNavigate();

  const handleStartExplore = () => {
    navigate("/explore");
  };

  useEffect(() => {
    const carouselElement = document.getElementById(
      "carouselExampleAutoplaying"
    );
    if (window.bootstrap && window.bootstrap.Carousel) {
      const carouselInstance = new window.bootstrap.Carousel(carouselElement, {
        interval: 100,
        ride: "carousel",
        pause: false,
      });
      carouselInstance.cycle(); // Ensure it starts cycling
    }
  }, []);

  return (
    <div
      id="carouselExampleAutoplaying"
      className="carousel slide carousel-fade"
      data-bs-ride="carousel"
    >
      <div className="carousel-inner">
        <div className="carousel-item active">
          <img src={pic1} className="d-block w-100" alt="First slide" />
          <div className="carousel-caption">
            <button onClick={handleStartExplore} className="explore-button">
              START EXPLORE
            </button>
          </div>
        </div>
        <div className="carousel-item">
          <img src={pic2} className="d-block w-100" alt="Second slide" />
          <div className="carousel-caption">
            <button onClick={handleStartExplore} className="explore-button">
              START EXPLORE
            </button>
          </div>
        </div>
        <div className="carousel-item">
          <img src={pic3} className="d-block w-100" alt="Third slide" />
          <div className="carousel-caption">
            <button onClick={handleStartExplore} className="explore-button">
              START EXPLORE
            </button>
          </div>
        </div>
      </div>
      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#carouselExampleAutoplaying"
        data-bs-slide="prev"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#carouselExampleAutoplaying"
        data-bs-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
};

export default WebHomeCarousel;
