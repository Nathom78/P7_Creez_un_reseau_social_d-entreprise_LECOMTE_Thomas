import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LoginModal = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  let navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    
    const emailError = document.querySelector(".email.error");
    const passwordError = document.querySelector(".password.error");

    axios({
      method: "POST",
      url: `http://localhost:3000/api/user/login`,

      data: {
        email: email,
        password: password,
      },
    })
      .then((res) => {
        const userId = res.data.userId;
        const tonken = res.data.token;
        sessionStorage.setItem("jwt", tonken);
        sessionStorage.setItem("uid", userId);
        navigate("/home", { replace: true});
        window.location.reload();
      })
      .catch((err) => {
        if (err.response.data.email) {
          emailError.innerHTML = err.response.data.email;
          passwordError.innerHTML = "";
        } else if (err.response.data.password) {
          emailError.innerHTML = "";
          passwordError.innerHTML = err.response.data.password;
        }
      });
  };

  return (
    <div>
      <h1>Log in</h1>
      <br />
      <form
        action=""
        onSubmit={handleLogin}
        id="Login-form"
        className="form__auth"
      >
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <div className="email error"></div>
        <br />

        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className="password error"></div>
        <br />

        <input type="submit" value="Login" className="btn-auth" />
      </form>
    </div>
  );
};

export default LoginModal;
