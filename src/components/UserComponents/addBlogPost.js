import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

export default function AddBlogPost() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [userId, setUserId] = useState(null);
  const [editingPost, setEditingPost] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const token = window.localStorage.getItem("token");
    if (token) {
      axios
        .post("http://localhost:3000/userdata", { token })
        .then((response) => {
          if (response.data.status === "ok") {
            const userId = response.data.data._id;
            setUserId(userId);
            if (location.state && location.state.post) {
              const { post } = location.state;
              setEditingPost(post);
              setTitle(post.title);
              setDescription(post.description);
            }
          } else {
            console.error("Error verifying user:", response.data);
          }
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  }, [location.state]);

  const submitImage = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("image", image);
    formData.append("userId", userId);

    try {
      if (editingPost) {
        const result = await axios.post(
          `http://localhost:3000/update-post/${editingPost._id}`,
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );
        console.log("Post updated successfully:", result.data);
        setEditingPost(null);
      } else {
        const result = await axios.post(
          "http://localhost:3000/upload-image",
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );
        console.log("Image uploaded successfully:", result.data);
      }
      navigate("/user-home-page"); // Navigate back to user home after submission
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  const onInputChange = (e) => {
    setImage(e.target.files[0]);
  };

  return (
    <div className="container container-grey-background">
      {/* <div className="card">
      <div className="card-body"> */}
      <h2>{editingPost ? "Edit Blog Post" : "Add Blog Post"}</h2>
      <form onSubmit={submitImage}>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input
            type="text"
            className="form-control"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <textarea
            className="form-control"
            id="description"
            rows="3"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          ></textarea>
        </div>
        <div className="mb-3">
          <label htmlFor="image" className="form-label">
            Image
          </label>
          <input
            type="file"
            className="form-control"
            id="image"
            onChange={onInputChange}
            required={!editingPost} // Make image required only if not editing
          />
        </div>
        <button type="submit" className="btn btn-primary">
          {editingPost ? "Update" : "Submit"}
        </button>
      </form>
      {/* </div>
     </div> */}
    </div>
  );
}
