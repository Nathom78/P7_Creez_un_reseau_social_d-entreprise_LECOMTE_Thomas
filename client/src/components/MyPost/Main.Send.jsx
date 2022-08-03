import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { addPost, getPosts } from "../../actions/post.action";

const MainSend = () => {
  const [message, setMessage] = React.useState("");
  const [postPicture, setPostPicture] = React.useState("");
  const [file, setFile] = React.useState(null);
  const userData = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();

  

  const handlePost = (e) => {
    const data = new FormData();
    data.append("posterId", userData._id);
    data.append("message", message);
    if (file) data.append("file", file);

    if (message.length > 0) {
      dispatch(addPost(data, userData._id));
      dispatch(getPosts());      
    }
  };

  const handlePicture = (e) => {
    setFile(e.target.files[0]);
    setPostPicture(URL.createObjectURL(e.target.files[0]));    
  };

  const changeMessage = (e) => {
    setMessage(e.target.value);    
  };

  

  return (
    <main className="mainContainer__new_post">
      <div className="myPost">
        <h1>Ajouter une publication</h1>
        <br />

        <div className="forContainer">
          <textarea
            name="text"
            rows="14"
            cols="10"
            wrap="soft"
            className="message"
            placeholder="message"
            value={message}
            onChange={(e) => changeMessage(e)}
          ></textarea>
          <br />
          <br />

          {postPicture && (
            <div className="containerImg">
              <img
                src={postPicture}
                alt="postPicture"
                className="postPicture"
              />
            </div>
          )}

          <div className="iconImgAndPost">
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

            {((message && file) ) && (
              <NavLink to="/home">
                <button onClick={handlePost}>
                  <i className="fa-solid fa-paper-plane"></i>
                </button>                
              </NavLink>
            )}

            {(!message || !file ) && (
              <button onClick={handlePost} disabled>
                <i
                  className="fa-solid fa-paper-plane"
                  //style={{ color: "grey" }}
                ></i>
              </button>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default MainSend;
