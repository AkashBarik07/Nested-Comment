import { useState } from "react";

export default function ReplyComment({ id, setShowReplyBox, addComments }) {
  const [reply, setReply] = useState("");
  const handlePostReply = () => {
    addComments(reply, id);
    setReply("");
    setShowReplyBox(false);
  };
  return (
    <div className="reply-form">
      <textarea
        value={reply}
        onChange={(e) => setReply(e.target.value)}
        placeholder="Write the reply here..."
        className="reply-textarea"
      ></textarea>
      <button className="post-reply-btn" onClick={handlePostReply}>
        Post Reply
      </button>
    </div>
  );
}
