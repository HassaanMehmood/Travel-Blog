import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faComment } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { Tooltip, OverlayTrigger } from "react-bootstrap";
import moment from "moment";
import classNames from "classnames";
import useLikePost from "../Hooks/useLikePost";
import useComments from "../Hooks/useComments";
import useLimitText from "../Hooks/useLimitText";
import "./HomeCard.css";

const HomeCard = ({ post }) => {
  const { liked, likeCount, likeUsers, handleLike, fetchLikeUsers } =
    useLikePost(post._id);
  const {
    comments,
    commentCount,
    commentText,
    setCommentText,
    handleCommentSubmit,
  } = useComments(post._id);
  const [showComments, setShowComments] = useState(false);

  const navigate = useNavigate();

  const handleReadMore = () => {
    navigate(`/blog-details/${post._id}`);
  };

  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      {likeUsers.length > 0
        ? likeUsers.map((user) => `${user.fname} ${user.lname}`).join(", ")
        : "No likes yet"}
    </Tooltip>
  );

  const toggleComments = () => {
    setShowComments(!showComments);
  };

  const limitedTitle = useLimitText(post.title, 35);
  const limitedDescription = useLimitText(post.description, 135);

  return (
    <div className="col-md-4" style={{ marginBottom: "15px" }}>
      <div className="card mb-4 shadow-sm">
        <img
          src={`http://localhost:3000/uploads/${post.image}`}
          alt={post.title}
          className="card-img-top fixed-image"
        />
        <div className="card-body">
          <h5 className="card-title">{limitedTitle}</h5>
          <p className="card-text">{limitedDescription}</p>
          <p className="card-text text-muted">
            {moment(post.createdAt).fromNow()}
          </p>
        </div>
        <div className="card-footer">
          <OverlayTrigger
            placement="top"
            overlay={renderTooltip}
            onEnter={fetchLikeUsers}
          >
            <button
              className={classNames("btn btn-link", { "text-danger": liked })}
              onClick={handleLike}
            >
              <FontAwesomeIcon icon={faHeart} /> {likeCount}
            </button>
          </OverlayTrigger>
          <button className="btn btn-link" onClick={toggleComments}>
            <FontAwesomeIcon icon={faComment} /> {commentCount}
          </button>
          <button
            type="button"
            className="btn btn-primary"
            onClick={handleReadMore}
          >
            Read More +
          </button>
        </div>
        {showComments && (
          <div className="mt-3">
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
          </div>
        )}
        {showComments && (
          <div className="mt-3">
            {comments.map((comment) => (
              <div key={comment._id} className="border p-2 rounded mb-2">
                <strong>
                  {comment.userId.fname} {comment.userId.lname}
                </strong>
                <p>{comment.commentText}</p>
                <small className="text-muted">
                  {moment(comment.createdAt).fromNow()}
                </small>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default HomeCard;
