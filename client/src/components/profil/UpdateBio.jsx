import React from "react";
import { useSelector } from "react-redux";
import Logo from "../Logo";
import Nav from "../Nav";
import UpdateImg from "./UploadImg";
import { useDispatch } from "react-redux";
import { updateBio } from "../../actions/user.action";
import { dateParser } from "../utils/Utils";

const UpdateBio = () => {
  const [bio, setMessage] = React.useState("");

  const userData = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    const bioError = document.getElementById("bioError");

    if (bio.length === null || bio.length === 0)
      return (
        (bioError.innerHTML = "Veuillez entrer votre biographie"),
        (bioError.style.color = "red")
      );

    if (bio.length < 5)
      return (
        (bioError.innerHTML =
          "Votre biographie doit contenir au moins 5 caractères"),
        (bioError.style.color = "red")
      );

    dispatch(updateBio(userData._id, bio));
    window.location = "/home";
  };

  return (
    <div className="mainContainer__100vh">
      <header>
        <Logo />
        <Nav />
      </header>

      <main className="main-profil">
        <div className="my-profil">
          <h1>
            Profil de <span>{userData.name} </span>
          </h1>

          <div className="displayBottom">
            <div className="conatainer_name_profilImg">
              <div className="containerImg">
                <img src={userData.avatar} alt="" />
              </div>

              <UpdateImg />
              <br />
            </div>

            <form className="forContainer" onSubmit={handleSubmit}>
              <h3 className="time_of_inscription">
                membre depuis le : <span>{dateParser(userData.createdAt)}</span>
              </h3>

              <div className="bioInput-container">
                <textarea
                  name="text"
                  rows="14"
                  cols="10"
                  wrap="soft"
                  className="bio"
                  value={bio}
                  placeholder="Votre biographie"
                  onChange={(e) => setMessage(e.target.value)}
                ></textarea>
                <span id="bioError" className="error"></span>
              </div>
              <br />

              <div className="iconImgAndPost">
                <button type="submit" id="btn-submit-bio">
                  <i className="fa-solid fa-paper-plane"></i>
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
};

export default UpdateBio;
