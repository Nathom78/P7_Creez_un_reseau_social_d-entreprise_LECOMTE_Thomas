import React from "react";
import Article from "./arcticle.bref-profil/Article";
import AsideUsers from "./aside.All-Users/AllUsers.Aside";
import AllPosts from "./file-actualiter/Main.File-Actualiter";


const Main = () => {
  return (
    <div className="section_container">
      <div className="" id="flou"></div>
      <Article />
      <AllPosts />
      <AsideUsers />
    </div>
  );
};

export default Main;
