import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import useLimitText from "../Hooks/useLimitText";
import "./UserBlogCard.css";

function UserCard({
  img,
  title,
  description,
  createdAt,
  showActions,
  showReadMore,
  onEdit,
  onDelete,
  postId,
}) {
  const navigate = useNavigate();

  const handleReadMore = () => {
    navigate(`/blog-details/${postId}`);
  };

  const limitedTitle = useLimitText(title, 35);
  const limitedDescription = useLimitText(description, 135);

  return (
    <div className="col-md-4" style={{ marginBottom: "15px" }}>
      <div className="card">
        <img src={img} className="card-img-top fixed-image" alt={title} />
        <div className="card-body">
          <h5 className="card-title">{limitedTitle}</h5>
          <p className="card-text">{limitedDescription}</p>
          <p className="card-text text-muted">{moment(createdAt).fromNow()}</p>
        </div>
        <div className="card-footer d-flex justify-content-between align-items-center mt-3">
          {showActions && (
            <>
              {onEdit && (
                <button
                  type="button"
                  className="btn btn-warning"
                  onClick={onEdit}
                >
                  <FontAwesomeIcon icon={faPen} />
                </button>
              )}
              <button
                type="button"
                className="btn btn-primary mx-auto"
                onClick={handleReadMore}
              >
                Read More +
              </button>
              {onDelete && (
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={onDelete}
                >
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              )}
            </>
          )}
          {showReadMore && !showActions && (
            <button
              type="button"
              className="btn btn-primary mx-auto"
              onClick={handleReadMore}
            >
              Read More +
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default UserCard;
