import React from "react";
import { useDispatch } from "react-redux";
import { deletePost } from "../../../../actions/post.action";
import { isEmpty } from "../../../utils/Utils";

const DeleteCard = ({ post, commentArray, setPostCommentOn}) => {
  const dispatch = useDispatch();

  const deleteItem = () => {
    setPostCommentOn(commentArray.filter(postid => postid !== post));
    const flouBack = document.getElementById("flou");
    const allreadyOn = flouBack.classList.contains("flou-appear")
    allreadyOn&&flouBack.classList.toggle("flou-appear");
    commentArray.forEach(el => {
      let doc = document.getElementById("post"+el);
      if (doc.classList.value.includes("see")) doc.classList.toggle("see");          
    });  
    dispatch(deletePost(post));
  };

  return ( 
    <>
      <i
        className="fa fa-trash"
        onClick={() => {
          if (window.confirm("Voulez-vous supprimer ce post?")) {
            deleteItem();
          }
        }}
      ></i>
    </>
  );
};

export default DeleteCard;
