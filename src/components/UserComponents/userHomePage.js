import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Card from "../UserCard/UserBlogCard";

export default function UserHome({ userData }) {
  const [user, setUser] = useState(userData);
  const [userPosts, setUserPosts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post("http://localhost:3000/userdata", {
          token: window.localStorage.getItem("token"),
        });
        setUser(response.data.data);

        const userId = response.data.data._id;
        fetchUserPosts(userId);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    if (!userData) {
      fetchData();
    } else {
      fetchUserPosts(userData._id);
    }
  }, [userData]);

  const fetchUserPosts = async (userId) => {
    try {
      const result = await axios.get(
        `http://localhost:3000/user-blogs/${userId}`
      );
      setUserPosts(result.data.data);
    } catch (error) {
      console.error("Error fetching user posts:", error);
    }
  };

  const goToEditUser = () => {
    navigate("/edit-user-data", { state: { data: user } });
  };

  const handleDelete = async (postId) => {
    try {
      await axios.post("http://localhost:3000/delete-post", { postId });
      setUserPosts(userPosts.filter((post) => post._id !== postId));
    } catch (error) {
      console.error("Error deleting blog post:", error);
    }
  };

  const handleEdit = (post) => {
    navigate("/add-blog-post", { state: { post } });
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container container-grey-background">
      <div className="row justify-content-center">
        <div className="col-12 col-md-6 mb-4">
          <div className="card">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h4 className="m-0">User Information</h4>
                <div
                  onClick={goToEditUser}
                  className="edit-icon d-flex align-items-center"
                  style={{ cursor: "pointer" }}
                >
                  <FontAwesomeIcon icon={faPen} className="me-1" />
                  <span className="edit-label">Edit</span>
                </div>
              </div>
              <div className="user-details">
                <h6>
                  <strong>First Name:</strong> {user.fname}
                </h6>
                <h6>
                  <strong>Last Name:</strong> {user.lname}
                </h6>
                <h6>
                  <strong>Email:</strong> {user.email}
                </h6>
                {/* <h6>
                  <strong>UserType:</strong> {user.userType}
                </h6> */}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="text-center mt-2">
        <button
          onClick={() => navigate("/add-blog-post")}
          className="btn btn-outline-primary"
        >
          Add Blog Post
        </button>
      </div>

      <div className="mt-4">
        <h3 className="text-center ">Your Blog Posts</h3>
        <div className="row mt-2">
          {userPosts.length > 0 ? (
            userPosts.map((post, index) => (
              <Card
                key={index}
                img={`http://localhost:3000/uploads/${post.image}`}
                title={post.title}
                description={post.description}
                createdAt={post.createdAt}
                showActions={true}
                showReadMore={true}
                onEdit={() => handleEdit(post)}
                onDelete={() => handleDelete(post._id)}
                postId={post._id}
              />
            ))
          ) : (
            <p>No posts found</p>
          )}
        </div>
      </div>
    </div>
  );
}
