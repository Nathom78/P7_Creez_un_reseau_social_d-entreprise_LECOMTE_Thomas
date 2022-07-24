import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Profil from "../pages/Profil";
import NewPost from "../pages/MyPost";
import { Navigate  } from "react-router-dom";

const index = () => {
  return (
    <Router>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/profil" element={<Profil />} />
        <Route path="/my-post" element={<NewPost />} />
        <Route path="*" element={<Navigate replace to="/home" />} />
      </Routes>
    </Router>
  );
};

export default index;
