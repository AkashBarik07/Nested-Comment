import CommentBox from "./Components/CommentBox";
import CommentsData from "./CommentsData.json";
import "./styles.css";
import { useState } from "react";

export default function App() {
  const [comments, setComments] = useState(CommentsData.comments);
  const addComments = (value, parentId) => {
    const newId = Date.now();
    const newComment = { id: [newId], value, parentId, children: [] };
    setComments((prevComments) => {
      const updatedComments = { ...prevComments, [newId]: newComment };
      updatedComments[parentId].children.push(newId);
      return updatedComments;
    });
  };

  const deleteComments = (id) => {
    const parentId = comments[id].parentId;
    setComments((prevComments) => {
      const updatedComments = { ...prevComments };
      updatedComments[parentId].children = updatedComments[
        parentId
      ].children.filter((childId) => {
        return childId !== id;
      });

      const queue = [id];
      while (queue.length > 0) {
        const nodeToDelete = queue.shift();
        queue.push(...updatedComments[nodeToDelete].children);

        delete updatedComments[nodeToDelete];
      }
      return updatedComments;
    });
  };
  console.log(comments);
  return (
    <div>
      <CommentBox
        comments={comments[1]}
        allComments={comments}
        addComments={addComments}
        deleteComments={deleteComments}
      />
    </div>
  );
}
