import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updatePost } from "../../../../actions/post.action";
import { shortDateParser, isEmpty } from "../../../utils/Utils";
import DeleteCard from "./Delete.Card";
import LikeButton from "./Like.Button";
import CommentCard from "../comments/Comment";
import { roleToken } from "../../../../token/Token";

const CardAcutaliter = ({ post, commentArray, setPostCommentOn}) => {
  const [loadPost, setLoadPost] = React.useState(true);
  const usersData = useSelector((state) => state.usersReducer);
  const userData = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();

  const [isUpdated, setIsUpdated] = React.useState(false);
  const [TextUpdated, setTextUpdatedState] = React.useState(post.message);
  const [postPicture, setPostPicture] = React.useState(post.imageUrl);
  const [file, setFile] = React.useState(null);   

  const idFlou = "flou" + post._id;
  const divComment = document.getElementById("post"+post._id);
  
  const [lastPostCommented, setLastPostCommented] = React.useState("");
  
  function UseFlou(postId){
    const flouBack = document.getElementById("flou");
    const allreadyOn = flouBack.classList.contains("flou-appear");

    if (commentArray.includes(postId)) {
      const result = commentArray.filter( clé => clé !== postId);      
      setPostCommentOn(result);
      if (result.length === 0 ) flouBack.classList.toggle("flou-appear");
    }
    else if (!commentArray.includes(postId) ) {
      setPostCommentOn([...commentArray, postId ]);
      (!allreadyOn)&&flouBack.classList.toggle("flou-appear"); 
    }     
  }   
  
  const updateItem = (e) => {    
    if (TextUpdated || file) {      
      dispatch(updatePost(post._id, TextUpdated, file));                
    }
    setIsUpdated(false);          
  };
  //Récupération de la fonction de mise à jour
  const [, fctMiseAJour] = React.useState();
  //Encapsulation de l'appel
  const miseAJour = React.useCallback(() => fctMiseAJour({}), []);

  const handleClick = () => {    
    divComment.classList.toggle("see");    
    UseFlou(post._id);    
    //Appel pour forcer le rendu du composant
    miseAJour();    
  };

  const handlePicture = (e) => {    
    setFile(e.target.files[0]);
    setPostPicture(URL.createObjectURL(e.target.files[0]));    
  };

  useEffect(() => {
    !isEmpty(usersData[0]) && setLoadPost(false); /* Test d'un user afin de lire les posts */
  }, [usersData]);

  useEffect(() => { /* Pour remettre les commentaires ouvert aprés un render juste aprés un ajout d'un commentaire ou une supression */
    commentArray.forEach(el => {
      let doc = document.getElementById("post"+el);
      if (!doc.classList.value.includes("see")) doc.classList.toggle("see");          
    });    
    if (!isEmpty(commentArray)) {
      const flouBack = document.getElementById("flou");
      const allreadyOn = flouBack.classList.contains("flou-appear")
      !allreadyOn&&flouBack.classList.toggle("flou-appear");
    }
  },[]);
  
  useEffect(() => miseAJour(),[]);
  
  return (
    <div className="postContainer" key={post._id} id={"post"+post._id} >
      {loadPost ? (
        <i className="fa fa-spinner fa-spin"></i>
      ) : (
        <>{/*// informations user //*/}
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
            
            {roleToken === "admin" || post.posterId === userData._id ? (
              <div className="update-delete">
                <i
                  className="fa fa-edit"
                  onClick={() => setIsUpdated(!isUpdated)}
                ></i>
                <DeleteCard post={post._id} commentArray={commentArray} setPostCommentOn={setPostCommentOn} />
              </div>
            ) : null}            
          </div>

          <div className="viewPost">
            {/*/// Corp du message et update ///*/}

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
          </div>
          {/*/// Icons and comments ////*/ }
          <div className="iconImgAndPost like_comment" >
            <div className="like">
              <LikeButton post={post} />
            </div>

            <div className="comment" >
              <span>{post.comments.length}</span>
              <i
                className="fa-regular fa-comment"
                onClick={handleClick}
              ></i>
            </div>
          </div>
          
          {  (divComment.classList.value.includes("see")) &&(            
            <>
              <div className="flou" id={idFlou} ></div>              
              <CommentCard post={post} lastPostCommented={lastPostCommented} setLastPostCommented={setLastPostCommented} />
            </>
          )}
        </>
      )}
    </div>
  );
};

export default CardAcutaliter;
