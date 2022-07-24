import React from "react";
import Auth from "../components/log/Auth";
import { UidContext } from "../components/AppContex";

//?================= Components    ============================
import Header from "../components/MyPost/Header";
import Main from "../components/MyPost/Main.Send";

const NewPost = () => {
  const uid = React.useContext(UidContext);

  return (
    <div>
      {uid ? (
        <div className="mainContainer__100vh">
          <Header />
          <Main />
        </div>
      ) : (
        <Auth />
      )}
    </div>
  );
};

export default NewPost;
