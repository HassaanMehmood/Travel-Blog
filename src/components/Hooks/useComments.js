import { useState, useEffect } from "react";
import axios from "axios";

const useComments = (postId) => {
  const [comments, setComments] = useState([]);
  const [commentCount, setCommentCount] = useState(0);
  const [commentText, setCommentText] = useState("");

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/comments/${postId}`
        );
        setComments(response.data);
        setCommentCount(response.data.length);
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };

    fetchComments();
  }, [postId]);

  const handleCommentSubmit = async (userId) => {
    if (!userId) {
      alert("Sign in required to comment on posts.");
      return;
    }
    try {
      const response = await axios.post(
        `http://localhost:3000/comment/${postId}`,
        {
          userId,
          commentText,
        }
      );
      if (response.data.message === "Comment added successfully") {
        setComments((prevComments) => [...prevComments, response.data.comment]);
        setCommentText("");
        setCommentCount((prevCount) => prevCount + 1);
      }
    } catch (error) {
      console.error("Error adding comment:", error);
      alert("An error occurred. Please try again later.");
    }
  };

  return {
    comments,
    commentCount,
    commentText,
    setCommentText,
    handleCommentSubmit,
  };
};

export default useComments;
