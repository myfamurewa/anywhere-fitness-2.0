import React, { useState } from "react";
import axios from 'axios' //Michael: imported axios
import {Link} from "react-router-dom"
const Login = props => {
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the Client route
  const [user, setUser] = useState({ email: "", password: "" });

  const handleChange = event => {
    setUser({
      ...user,
      [event.target.name]: event.target.value
    });
  };

  const login = event => {
    event.preventDefault();
    axios // Michael: changed axios with auth to axios
      .post(`https://anywhere-fitness-api.herokuapp.com/api/auth/login`, user)
      .then(res => {
        localStorage.setItem("token", res.data.token);
        console.log(res.data.token);
        props.history.push("/clienthome");
      })
      .catch(error => console.log(error));
  };
  console.log(user)
  return (
    <>
      <div className="signup-band">
        <span>Anywhere Fitness</span>
      </div>
      <div className="signup-container">
        <div className="image-half">
        {/* <img src={mountainyoga} alt="Woman doing Yoga on a beach at sunset"></img> */}
        </div>
      <div className="form-half">
      <form className="login" onSubmit={login}>
        <h2>Login Here</h2>
        <input
          type="email"
          name="email"
          value={user.email}
          onChange={handleChange}
          placeholder="email"
        />
        <input
          type="password"
          name="password"
          value={user.password}
          onChange={handleChange}
          placeholder="password"
        />
        <button type="submit">Log in</button>
        <br></br>
      <span><Link to="/register">Create an account here</Link></span>
      </form>
      </div>
      </div>
    </>
  );
};

export default Login;
