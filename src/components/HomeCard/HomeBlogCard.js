import React from "react";
import HomeCard from "./HomeCard";

const HomeBlogCard = ({ blogPosts }) => {
  return (
    <div className="row">
      {blogPosts.map((post) => (
        <HomeCard key={post._id} post={post} />
      ))}
    </div>
  );
};

export default HomeBlogCard;
