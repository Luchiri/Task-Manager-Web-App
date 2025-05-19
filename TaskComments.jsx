import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";

const TaskComments = ({ taskId, user, initialComments = [], onCommentAdded }) => {
  const [comments, setComments] = useState(initialComments);
  const [comment, setComment] = useState("");
  const [posting, setPosting] = useState(false);

  const localStorageKey = `task-${taskId}-comments`;

  useEffect(() => {
    const storedComments = localStorage.getItem(localStorageKey);
    if (storedComments) {
      setComments(JSON.parse(storedComments));
    } else if (initialComments && initialComments.length > 0) {
      setComments(initialComments);
      localStorage.setItem(localStorageKey, JSON.stringify(initialComments));
    }
  }, [taskId, initialComments, localStorageKey]);

  useEffect(() => {
    localStorage.setItem(localStorageKey, JSON.stringify(comments));
  }, [comments, localStorageKey]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!comment.trim()) return;
    setPosting(true);
    setTimeout(() => {
      const newComment = {
        id: Date.now(),
        author: user?.name || "User",
        text: comment,
        timestamp: new Date().toLocaleString(),
      };
      const updatedComments = [newComment, ...comments];
      setComments(updatedComments);
      setComment("");
      setPosting(false);
      toast.success("Comment posted");
      if (onCommentAdded) {
        onCommentAdded(newComment); 
      }
    }, 500);
  };

  return (
    <div className="card shadow-sm">
      <div className="card-header bg-info text-white py-2">
        <i className="bi bi-chat-dots-fill me-2"></i>
        <b className="fs-6">Comments</b>
      </div>
      <div
        className="card-body"
        style={{ maxHeight: 300, overflowY: "auto", padding: "1rem" }}
      >
        {comments.length === 0 ? (
          <div className="text-muted fst-italic">No comments yet. Be the first to share your thoughts!</div>
        ) : (
          comments.map((c) => (
            <div key={c.id} className="mb-3">
              <div className="d-flex align-items-baseline">
                <span className="fw-bold me-2">{c.author}</span>
                <small className="text-muted">{c.timestamp}</small>
              </div>
              <div className="bg-light rounded p-2 mt-1">
                <p className="mb-0">{c.text}</p>
              </div>
            </div>
          ))
        )}
      </div>
      <div className="card-footer bg-light py-3">
        <form className="d-flex align-items-center" onSubmit={handleSubmit}>
          <input
            type="text"
            className="form-control form-control-sm me-2"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder={user ? "Type your comment..." : "Log in to comment..."}
            disabled={!user}
          />
          <button
            type="submit"
            className="btn btn-primary btn-sm"
            disabled={!user || posting || !comment.trim()}
          >
            {posting ? (
              <span className="spinner-border spinner-border-sm me-1" role="status" aria-hidden="true"></span>
            ) : (
              <i className="bi bi-send-fill me-1"></i>
            )}
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default TaskComments;