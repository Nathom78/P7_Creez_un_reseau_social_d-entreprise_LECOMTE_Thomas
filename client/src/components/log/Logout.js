import React from "react";
import { useNavigate } from "react-router-dom";


const Logout = () => {
  let navigate = useNavigate();
  const logout = () => {
    sessionStorage.removeItem("uid");
    sessionStorage.removeItem("jwt");
    navigate("/home");
    window.location.reload();
  };
  return (
    <>
      <i className="fa-solid fa-arrow-right-from-bracket" onClick={logout}></i>
    </>
  );
};

export default Logout;
