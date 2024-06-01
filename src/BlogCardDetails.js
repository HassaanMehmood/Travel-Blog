import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faComment } from "@fortawesome/free-solid-svg-icons";
import { Tooltip, OverlayTrigger } from "react-bootstrap";
import axios from "axios";
import moment from "moment";
import useLikePost from "./components/Hooks/useLikePost";
import useComments from "./components/Hooks/useComments";
import "./BlogCardDetails.css";

function BlogDetails() {
  const { id } = useParams();

  const { liked, likeCount, likeUsers, handleLike, fetchLikeUsers } =
    useLikePost(id);

  const {
    comments,
    commentCount,
    commentText,
    setCommentText,
    handleCommentSubmit,
  } = useComments(id);

  const [blogPost, setBlogPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogPost = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/blog/${id}`);
        setBlogPost(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching blog post:", error);
        setLoading(false);
      }
    };

    fetchBlogPost();
  }, [id]);

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (!blogPost) {
    return <div>Error loading blog post.</div>;
  }

  return (
    <div className="container container-grey-background">
      <div className="row">
        <div className="col-10 mx-auto">
          <h1>{blogPost.title}</h1>
          <img
            src={`http://localhost:3000/uploads/${blogPost.image}`}
            alt={blogPost.title}
            className="img-fluid fixed-image"
          />
          <p>{blogPost.description}</p>
          <p className="text-muted">
            Posted {moment(blogPost.createdAt).fromNow()}
          </p>
          <div className="d-flex justify-content-start align-items-center gap-3">
            <OverlayTrigger
              placement="top"
              overlay={
                <Tooltip>
                  {likeUsers.length > 0
                    ? likeUsers
                        .map((user) => `${user.fname} ${user.lname}`)
                        .join(", ")
                    : "No likes yet"}
                </Tooltip>
              }
              onEnter={fetchLikeUsers}
            >
              <button
                className={`btn btn-link ${liked ? "text-danger" : ""}`}
                onClick={handleLike}
                aria-label="Like post"
              >
                <FontAwesomeIcon icon={faHeart} /> {likeCount}
              </button>
            </OverlayTrigger>
            <button className="btn btn-link" aria-label="Show comments">
              <FontAwesomeIcon icon={faComment} /> {commentCount}
            </button>
          </div>
          <div className="comments-section mt-3">
            <h3>Comments ({commentCount})</h3>
            <textarea
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              className="form-control"
              rows="2"
              placeholder="Add a comment..."
            ></textarea>
            <button
              className="btn btn-primary mt-2"
              onClick={() =>
                handleCommentSubmit(localStorage.getItem("userId"))
              }
            >
              Submit
            </button>
            {comments.length > 0 ? (
              comments.map((comment) => (
                <div key={comment._id} className="border p-2 rounded mb-2">
                  <strong>
                    {comment.userId.fname} {comment.userId.lname}
                  </strong>
                  <p>{comment.commentText}</p>
                  <small className="text-muted">
                    {moment(comment.createdAt).fromNow()}
                  </small>
                </div>
              ))
            ) : (
              <p>No comments yet. Be the first to comment!</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default BlogDetails;
