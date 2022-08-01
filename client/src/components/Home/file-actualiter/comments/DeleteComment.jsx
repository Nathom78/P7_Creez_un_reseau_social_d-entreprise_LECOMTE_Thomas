import React from "react";
import { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { deleteComments } from "../../../../actions/post.action";
import { roleToken } from "../../../../token/Token";

const DeleteComment = ({ postId, comment, setLastPostCommented }) => {
  const [isAuthor, setIsAuthor] = React.useState(false);
  const userId = sessionStorage.getItem("uid");
  const dispatch = useDispatch();
  const ref = useRef(null);

  const handleDelete = () => {    
    dispatch(deleteComments(postId, comment._id));    
    setLastPostCommented(postId);
    ref.current.previousSibling.focus();        
  };

  useEffect(() => {
    const checkAuthor = () => {
      if (userId === comment.commenterId) {
        setIsAuthor(true);
      }
    };
    checkAuthor();
  }, [userId, comment.commenterId]);

  return (
    <>
      {isAuthor || roleToken === "admin" ? (
        <i
          className="fa fa-trash"
          ref={ref}
          onClick={() => {
            if (
              window.confirm(
                "vous êtes sur le point de supprimer ce commentaire"
              )
            )
            handleDelete();            
          }}
        ></i>
      ) : null}

    </>
  );
};

export default DeleteComment;
