import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updatePost } from "../../../../actions/post.action";
import { shortDateParser, isEmpty } from "../../../utils/Utils";
import DeleteCard from "./Delete.Card";
import LikeButton from "../../Like.Button";
import CommentCard from "../comments/Comment";
import { roleToken } from "../../../../token/Token";

const CardAcutaliter = ({ post }) => {
  const [loadPost, setLoadPost] = React.useState(true);
  const usersData = useSelector((state) => state.usersReducer);
  const userData = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();

  const [isUpdated, setIsUpdated] = React.useState(false);
  const [TextUpdated, setTextUpdatedState] = React.useState(post.message);
  const [postPicture, setPostPicture] = React.useState(post.imageUrl);
  const [file, setFile] = React.useState(null);
  
  const [showComment, setShowComment] = React.useState(false);  

  const handlePicture = (e) => {
    setFile(e.target.files[0]);
    setPostPicture(URL.createObjectURL(e.target.files[0]));    
  };

  const updateItem = (e) => {
    console.log("file "+ file);
    if (TextUpdated || file) {
      
      dispatch(updatePost(post._id, TextUpdated, file));
    }
    setIsUpdated(false);
  };

  useEffect(() => {
    !isEmpty(usersData[0]) && setLoadPost(false);
  }, [usersData]);

  return (
    <div className="postContainer" key={post._id}>
      {loadPost ? (
        <i className="fa fa-spinner fa-spin"></i>
      ) : (
        <>
          <div className="postContainer__header">
            <div className="img-name-time">
              <img
                src={
                  !isEmpty(usersData[0]) &&
                  usersData
                    .map((user) => {
                      if (user._id === post.posterId) {
                        return user.avatar;
                      }
                      return null;
                    })
                    .join("")
                }
                alt="avatar"
              />

              <div className="postContainer__header__name">
                <h4>
                  {!isEmpty(usersData[0]) &&
                    usersData.map((user) => {
                      if (user._id === post.posterId) {
                        return user.name;
                      }
                      return "";
                    })}
                </h4>
                <span>{shortDateParser(post.createdAt)}</span>
              </div>
            </div>

            {/**
             * user est le meme que l'auteur du post || roleToken === "admin"
             */}

            {post.posterId === userData._id ? (
              <div className="update-delete">
                <i
                  className="fa fa-edit"
                  onClick={() => setIsUpdated(!isUpdated)}
                ></i>
                <DeleteCard post={post._id} />
              </div>
            ) : null}

            {roleToken === "admin" && post.posterId !== userData._id ? (
              <div className="update-delete">
                <DeleteCard post={post._id} />
              </div>
            ) : null}

            {/* //////////////////////////// */}
          </div>

          <div className="viewPost">
            {/* text update post!!!!!! */}

            {isUpdated === false && (
              <>
                <p>{post.message}</p>
                {postPicture && <img src={postPicture} alt="post_image" />}              
              </>              
            )}

            {isUpdated === true && (
              <>
                <textarea
                  className="textarea"
                  defaultValue={post.message}
                  onChange={(e) => setTextUpdatedState(e.target.value)}
                />
                {postPicture && <img src={postPicture} alt="post_image" />}
                <div className="iconImgBtn">
                  <label htmlFor="file-input">
                    <i className="fa-solid fa-image"></i>
                  </label>
                  <input
                    type="file"
                    id="file-input"
                    className="file-input"
                    name="file"
                    accept=".jpg, .jpeg, .png"
                    onChange={(e) => handlePicture(e) }
                  />
                  <button className="btn-updateItem Upload" onClick={updateItem}>
                    Valider les modifications
                  </button>
                </div>
                
              </>
            )}

            {/* //////////////////// */}

            
          </div>

          <div className="iconImgAndPost like_comment">
            <div className="like">
              <LikeButton post={post} />
            </div>

            <div className="comment">
              <span>{post.comments.length}</span>
              <i
                className="fa-regular fa-comment"
                onClick={() => {
                  const flou = document.getElementById("flou");
                  flou.classList.toggle("flou-appear");

                  setShowComment(!showComment);
                }}
              ></i>
            </div>
          </div>
          {showComment && (
            <>
              <div className="flou" id="flou"></div>
              <CommentCard post={post} />
            </>
          )}
        </>
      )}
    </div>
  );
};

export default CardAcutaliter;
