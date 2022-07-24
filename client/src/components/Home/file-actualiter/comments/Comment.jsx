import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addComment, getPosts } from "../../../../actions/post.action";
import { timeStampParser } from "../../../utils/Utils";
import { isEmpty } from "../../../utils/Utils";
import DeleteComment from "./DeleteComment";

const Comment = ({ post }) => {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.userReducer);
  const usersData = useSelector((state) => state.usersReducer);
  const [text, setText] = React.useState("");

  const handleComment = (e) => {
    e.preventDefault();
    if (text) {
      dispatch(addComment(post._id, userData._id, text, userData.name));
      dispatch(getPosts());
      setText("");
    }
  };

  return (
    <>
      <div className="comment-card">
        {post.comments.map((comment, index) => {
          return (
            <li
              key={comment._id}
              className={
                userData._id === comment.commenterId
                  ? "each-user-comment is-author"
                  : "each-user-comment"
              }
            >
              <div className="avatar-name-time">
                <div className="avatar-name">
                  <img
                    src={
                      !isEmpty(usersData[0]) &&
                      usersData
                        .map((user) => {
                          if (user._id === comment.commenterId) {
                            return user.avatar;
                          }
                          return null;
                        })
                        .join("")
                    }
                    alt="avatar"
                  />

                  <h4>
                    {!isEmpty(usersData[0]) &&
                      usersData.map((user) => {
                        if (user._id === comment.commenterId) {
                          return user.name;
                        }
                        return "";
                      })}
                  </h4>
                </div>

                <span className="author">
                  {timeStampParser(comment.timestamp)}
                </span>
              </div>

              <div className="comment-text">
                <p>{comment.text}</p>
                <DeleteComment postId={post._id} comment={comment} />
              </div>
            </li>
          );
        })}
        <br />

        <form className="comment-form" action="" onSubmit={handleComment}>
          <textarea
            className="textarea"
            id="textareaComment"
            placeholder="Ajouter un commentaire"
            onChange={(e) => setText(e.target.value)}
            value={text}
          />
          <button className="btn-updateItem Upload" type="submit">
            Ajouter un commentaire
          </button>
        </form>
      </div>
    </>
  );
};

export default Comment;
