// src/components/TopLikedPosts.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import HomeCard from "../components/HomeCard/HomeCard"; // Ensure the correct path to HomeCard

const TopLikedPosts = () => {
  const [topPosts, setTopPosts] = useState([]);

  useEffect(() => {
    fetchTopLikedPosts();
  }, []);

  const fetchTopLikedPosts = async () => {
    try {
      const response = await axios.get("http://localhost:3000/top-liked-posts");
      setTopPosts(response.data.data);
    } catch (error) {
      console.error("Error fetching top liked posts:", error);
    }
  };

  return (
    <div className="container">
      <h3 className="text-center">Top 3 Liked Posts</h3>
      <div className="row">
        {topPosts.length > 0 ? (
          topPosts.map((post, index) => <HomeCard key={index} post={post} />)
        ) : (
          <p>No top liked posts found</p>
        )}
      </div>
    </div>
  );
};

export default TopLikedPosts;
