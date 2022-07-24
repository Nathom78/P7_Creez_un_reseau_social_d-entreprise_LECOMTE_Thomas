import React from "react";
import axios from "axios";

const SignupModal = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [name, setName] = React.useState("");

  const handleSignup = (e) => {
    e.preventDefault();

    const nameError = document.querySelector(".name.error");
    const emailError = document.querySelector(".email.error");

    axios({
      method: "POST",
      url: `http://localhost:3000/api/user/signup`,

      data: {
        name: name,
        email: email,
        password: password,
      },
    })
      .then(() => {
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
            localStorage.setItem("jwt", tonken);
            localStorage.setItem("uid", userId);
            window.location = "/home";
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        if (err.response.data.name) {
          nameError.innerHTML = err.response.data.name;
          emailError.innerHTML = "";
        } else if (err.response.data.email) {
          nameError.innerHTML = "";
          emailError.innerHTML = err.response.data.email;
        }
      });
  };

  return (
    <div>
      <h1>Sign up</h1>
      <br />
      <form
        action=""
        onSubmit={handleSignup}
        id="signup-form"
        className="form__auth"
      >
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <div className="name error"></div>

        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <div className="email error"></div>

        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />

        <input type="submit" value="Signup" className="btn-auth" />
      </form>
    </div>
  );
};

export default SignupModal;
