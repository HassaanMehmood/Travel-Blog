import { useState, useEffect } from "react";
import axios from "axios";

const useLikePost = (postId) => {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [likeUsers, setLikeUsers] = useState([]);

  useEffect(() => {
    const fetchInitialData = async () => {
      const userId = localStorage.getItem("userId");
      if (userId) {
        try {
          const response = await axios.get(
            `http://localhost:3000/user-reaction/${postId}/${userId}`
          );
          setLiked(response.data.liked);
        } catch (error) {
          console.error("Error fetching liked status:", error);
        }
      }
      const likeCountResponse = await axios.get(
        `http://localhost:3000/likes/${postId}/count`
      );
      setLikeCount(likeCountResponse.data.count);
    };

    fetchInitialData();
  }, [postId]);

  const handleLike = async () => {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      alert("Sign in required to like posts.");
      return;
    }
    try {
      const response = await axios.post(
        `http://localhost:3000/like-post/${postId}`,
        { userId }
      );
      if (response.data.status === "ok") {
        setLiked(response.data.liked);
        setLikeCount(response.data.data);
      }
    } catch (error) {
      console.error("Error liking/disliking the post:", error);
      alert("An error occurred. Please try again later.");
    }
  };

  const fetchLikeUsers = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/likes/${postId}`);
      setLikeUsers(response.data);
    } catch (error) {
      console.error("Error fetching like users:", error);
    }
  };

  return { liked, likeCount, likeUsers, handleLike, fetchLikeUsers };
};

export default useLikePost;
