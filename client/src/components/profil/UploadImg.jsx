import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { uploadAvatar } from "../../actions/user.action";

const UpdateImg = () => {
  const [file, setFile] = React.useState(null);
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.userReducer);

  const handlePicture = (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("file", file);
    data.append("userId", userData._id);

    dispatch(uploadAvatar(data, userData._id));
  };

  return (
    <>
      <div>
        <input
          type="text"
          disabled
          className="injected_img_path desappear"
          placeholder="Changer d'image"
          value={file ? file.name : ""}
        />
      </div>
      <form action="" className="upload_img" onSubmit={handlePicture}>
        <div className="icon_UpdateImg">
          <label htmlFor="file-input">
            <i className="fa-solid fa-image"></i>
          </label>
          <input
            type="file"
            id="file-input"
            className="file-input"
            name="file"
            accept=".jpg, .jpeg, .png"
            onChange={(e) => setFile(e.target.files[0])}
          />
        </div>
        <input type="submit" value="Envoyer" className="Upload" />
      </form>
    </>
  );
};

export default UpdateImg;
