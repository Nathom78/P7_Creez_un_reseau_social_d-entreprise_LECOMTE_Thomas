import React from "react";

const Logout = () => {
  const logout = () => {
    sessionStorage.removeItem("uid");
    sessionStorage.removeItem("jwt");

    window.location.reload();
  };
  return (
    <>
      <i className="fa-solid fa-arrow-right-from-bracket" onClick={logout}></i>
    </>
  );
};

export default Logout;
