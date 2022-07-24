import React from "react";
import { useDispatch } from "react-redux";
import { deletePost } from "../../../../actions/post.action";

const DeleteCard = ({ post }) => {
  const dispatch = useDispatch();

  const deleteItem = (e) => {
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
