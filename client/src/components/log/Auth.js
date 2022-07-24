import React, { useState } from "react";
import background from "../../img/Logos/icon-left-font.svg";
import SignupForm from "./SignupModal";
import LoginForm from "./LoginModal";
import logo from "../../img/Logos/icon-left-font-monochrome-black.png";
import { NavLink } from "react-router-dom";

const Auth = () => {
  const [Signup, setSignupModal] = useState(false);
  const [Login, setLoginModal] = useState(true);

 

  const handleModals = (e) => {
    if (e.target.id === "signup") {
      setSignupModal(true);
      setLoginModal(false);
    } else if (e.target.id === "login") {
      setSignupModal(false);
      setLoginModal(true);
    }
  };

  return (
    <>
      <div className="container">
        <header className="headerAuth">
          <div className="header__img">
            <NavLink to="/home">
              <img src={logo} alt="img_Logo" className="imgLogo" />
            </NavLink>
          </div>
        </header>
        <br />

        <div className="main__div__container">
          <div className="back-ground">
            <img src={background} alt="" />
          </div>

          <main className="mainAuth">
            <div className="containerNavAuth">
              <ul className="auth__nav">
                <li
                  onClick={handleModals}
                  id="signup"
                  className={Signup ? "nav-active" : ""}
                >
                  Signup
                </li>
                <li
                  onClick={handleModals}
                  id="login"
                  className={Login ? "nav-active" : ""}
                >
                  Login
                </li>
              </ul>
            </div>
            <br />

            {Signup && <SignupForm />}
            {Login && <LoginForm />}
          </main>
        </div>
      </div>
    </>
  );
};

export default Auth;
