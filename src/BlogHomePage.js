import React, { useEffect, useState } from "react";
import axios from "axios";
import HomeBlogCard from "./components/HomeCard/HomeBlogCard";
import "./BlogHomePage.css";

function BlogHomePage() {
  const [blogPosts, setBlogPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBlogPosts = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/all-blog-posts"
        );
        setBlogPosts(response.data.data);
      } catch (error) {
        console.error("Error fetching blog posts:", error);
        setError("Failed to load blog posts. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchBlogPosts();
  }, []);

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <>
      <div className="container container-grey-background">
        <h1 className="text-center">Blog Page</h1>
        <p className="text-center">
          Welcome to the Blog page. Here you will find various articles and
          posts.
        </p>
      </div>

      <div className="container mt-2 container-grey-background">
        <div className="row">
          {blogPosts.length > 0 ? (
            <HomeBlogCard blogPosts={blogPosts} />
          ) : (
            <p className="text-center">No blog posts available.</p>
          )}
        </div>
      </div>
    </>
  );
}

export default BlogHomePage;
