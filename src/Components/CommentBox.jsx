import { useState } from "react";
import ReplyComment from "./ReplyComment";

export default function CommentBox({
  comments,
  allComments,
  addComments,
  deleteComments,
}) {
  const [showReplyBox, setShowReplyBox] = useState(false);
  const handleShow = () => {
    setShowReplyBox(!showReplyBox);
  };
  return (
    <div className="comment-container">
      <div className="comment-header">
        <p className="comment-value">{comments.value}</p>
        <div className="comment-action">
          <button className="reply-btn" onClick={handleShow}>
            {showReplyBox ? "Cancel" : "Reply"}
          </button>
          <button
            className="delete-btn"
            onClick={() => deleteComments(comments.id)}
          >
            Delete
          </button>
        </div>
      </div>
      {showReplyBox && (
        <ReplyComment
          setShowReplyBox={setShowReplyBox}
          addComments={addComments}
          id={comments.id}
        />
      )}

      <div className="nested-comments">
        {comments.children.map((childId, index) => {
          return (
            <CommentBox
              key={index}
              comments={allComments[childId]}
              allComments={allComments}
              addComments={addComments}
              deleteComments={deleteComments}
            />
          );
        })}
      </div>
    </div>
  );
}
