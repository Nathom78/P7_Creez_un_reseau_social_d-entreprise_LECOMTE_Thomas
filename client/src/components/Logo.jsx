import React from "react";
import logo from "../img/Logos/icon-left-font-monochrome-white.png";
import {NavLink} from 'react-router-dom';


const Logo = ({white, black}) => {
  return (
    <div className="header__img">
      <NavLink to='/home'>
      <img src={logo} alt="img_Logo" className="imgLogo" />
      </NavLink>
    </div>
  );
};

export default Logo;
