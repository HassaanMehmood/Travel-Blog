// src/components/Home.js
import React from "react";
import "../App.css";
import Carousel from "./WebHomeCarousel";
import OverlaysImage from "./WebHomeOverlaysImage";
import Overlays1 from "../assets/Overlays1.jpg";
import Overlays2 from "../assets/Overlays2.jpg";
import Overlays3 from "../assets/Overlays3.jpg";
import TravelBlogIntro from "./WebHomeTravelBlogIntro";
import TopLikedPosts from "./TopLikedPosts"; // Import the new component

function Home() {
  return (
    <>
      <Carousel />
      <br />
      <OverlaysImage img1={Overlays1} img2={Overlays2} img3={Overlays3} />
      <br />
      <TravelBlogIntro />
      <br />
      <TopLikedPosts />
      <br />
    </>
  );
}

export default Home;
