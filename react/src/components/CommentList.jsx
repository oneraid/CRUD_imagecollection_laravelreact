import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import ChatBubble from "./ChatBubble"; // Pastikan path sesuai dengan struktur proyek Anda

const CommentList = ({ imageId }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.error("Token tidak ditemukan");
          return;
        }

        const response = await axios.get(
          `http://127.0.0.1:8000/api/comments?image_id=${imageId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (Array.isArray(response.data)) {
          setComments(response.data);
        } else {
          console.error("Format data komentar tidak valid:", response.data);
        }
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };

    fetchComments();
  }, [imageId]);

  const handleAddComment = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("Token tidak ditemukan");
      return;
    }

    try {
      const response = await axios.post(
        `http://127.0.0.1:8000/api/comments`,
        { image_id: imageId, text: newComment },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data && typeof response.data === "object") {
        setComments([...comments, response.data]);
        setNewComment("");
      } else {
        console.error("Format data komentar baru tidak valid:", response.data);
      }
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  return (
    <div className="comments-section">
      <h3 className="text-xl font-bold mb-4">Comments</h3>
      <ul className="comments-list mb-4">
        {Array.isArray(comments) &&
          comments.map((comment) => (
            <ChatBubble
              key={comment.id}
              user={comment.user.name}
              time={new Date(comment.created_at).toLocaleTimeString()}
              message={comment.text}
              status="seen"
              userProfile={`https://api.dicebear.com/9.x/avataaars/svg?seed=default`}
            />
          ))}
      </ul>
      <div className="add-comment">
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          className="textarea textarea-bordered w-full mb-2"
          placeholder="Add a comment..."
        />
        <button onClick={handleAddComment} className="btn btn-primary">
          Add Comment
        </button>
      </div>
    </div>
  );
};

CommentList.propTypes = {
  imageId: PropTypes.string.isRequired,
};

export default CommentList;
