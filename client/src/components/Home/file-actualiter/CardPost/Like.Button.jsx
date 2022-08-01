import React from "react";
import { useContext } from "react";
import { useEffect } from "react";
import { UidContext } from "../../../AppContex";
import { useDispatch } from "react-redux";
import { likePost, unlikePost } from "../../../../actions/post.action";

const LikeButton = ({ post }) => {
  const [liked, setLiked] = React.useState(false);
  const userId = useContext(UidContext);
  const dispatch = useDispatch();

  const like = () => {
    dispatch(likePost(post._id, userId));
    setLiked(true);
  };

  const unlike = () => {
    dispatch(unlikePost(post._id, userId));
    setLiked(false);
  };

  useEffect(() => {
    if (post.usersLiked.includes(userId)) return setLiked(true);
    setLiked(false);
  }, [userId, liked, post.usersLiked]);

  return (
    <>
      <span>{post.usersLiked.length}</span>
      {liked === false && (
        <>
          <i className="fa-regular fa-heart" onClick={like}></i>
        </>
      )}

      {liked === true && (
        <>
          <i className="fa-solid fa-heart" onClick={unlike}></i>
        </>
      )}
    </>
  );
};

export default LikeButton;
