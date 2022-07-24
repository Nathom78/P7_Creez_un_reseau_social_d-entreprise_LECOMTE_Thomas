import React from "react";
import Auth from "../components/log/Auth";
import { UidContext } from "../components/AppContex";
import UpdateBio from "../components/profil/UpdateBio";

const Profil = () => {
  const uid = React.useContext(UidContext);

  return <>{uid ? <UpdateBio /> : <Auth />}</>;
};

export default Profil;
