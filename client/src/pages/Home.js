import React from "react";
import Auth from "../components/log/Auth";
import { UidContext } from "../components/AppContex";

// component for the home page
import Header from "../components/Home/Header";
import Main from "../components/Home/Main";

const Home = () => {
  const uid = React.useContext(UidContext);


  return (
    <>
      {uid ? (
        <div className="main_container">
          <Header />
          <Main />
        </div>
      ) : (
        <Auth />
      )}
    </>
  );
};

export default Home;
