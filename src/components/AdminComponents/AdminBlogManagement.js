import React, { useState, useEffect } from "react";
import axios from "axios";
import Card from "../UserCard/UserBlogCard"; // Ensure the correct path to UserBlogCard

export default function AdminBlogManagement() {
  const [blogPosts, setBlogPosts] = useState([]);

  useEffect(() => {
    fetchAllBlogPosts();
  }, []);

  const fetchAllBlogPosts = async () => {
    try {
      const response = await axios.get("http://localhost:3000/all-blog-posts");
      setBlogPosts(response.data.data);
    } catch (error) {
      console.error("Error fetching all blog posts:", error);
    }
  };

  const handleDelete = async (postId) => {
    try {
      await axios.post("http://localhost:3000/delete-post", { postId });
      setBlogPosts(blogPosts.filter((post) => post._id !== postId));
      alert("Post deleted successfully");
    } catch (error) {
      console.error("Error deleting blog post:", error);
    }
  };

  return (
    <div className="container container-grey-background">
      <h3 className="text-center">Manage Blog Posts</h3>
      <div className="row">
        {blogPosts.length > 0 ? (
          blogPosts.map((post, index) => (
            <Card
              key={index}
              img={`http://localhost:3000/uploads/${post.image}`}
              title={post.title}
              description={post.description}
              createdAt={post.createdAt}
              showActions={true} // Show both Read More and Delete button
              showReadMore={true}
              onDelete={() => handleDelete(post._id)}
              postId={post._id}
            />
          ))
        ) : (
          <p>No posts found</p>
        )}
      </div>
    </div>
  );
}
