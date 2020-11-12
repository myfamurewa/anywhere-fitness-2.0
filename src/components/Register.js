import React, { useState, useEffect } from "react";
import axiosWithAuth from "./clients/API/axiosWithAuth";
import {withFormik, Form, Field} from "formik"
import * as Yup from 'yup'
import {Link, useHistory} from "react-router-dom"
import axios from 'axios'

const UserForm = ({ values, errors, touched, status}) => {
  const history = useHistory()
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    role: ""
  });
  useEffect(() => {
    console.log("status has changed", status);
    status && setUser(user => [...user, status]);
  }, [status]);

  const handleChange = e => {
    setUser({
      ...user,
      [e.target.name]: e.target.value
    });
  };



  const onSubmit = e => {
    e.preventDefault();
    console.log(user, values)
    axios
      .post("https://anywhere-fitness-api.herokuapp.com/api/auth/register", user)
      .then(res => {
        let newUser = {email: user.email, password: user.password}
        axios
      .post(`https://anywhere-fitness-api.herokuapp.com/api/auth/login`, newUser)
      .then(res => {
        localStorage.setItem("token", res.data.token);
        console.log(res.data.token);
        history.push("/clienthome");
      })
      .catch(error => console.log(error));
      })
      .catch(error => console.log(error));
  };
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
      <Form onSubmit={onSubmit}>
      <h1>Register Here</h1>
        <Field
          type="text"
          name="firstName"
          placeholder="First Name"
          value={user.firstName}
          onChange={handleChange}
        />
        <Field
          type="text"
          name="lastName"
          placeholder="Last Name"
          value={user.lastName}
          onChange={handleChange}
        />
        <Field
          type="text"
          name="email"
          placeholder="email"
          value={user.email}
          onChange={handleChange}
        />
        {touched.email && errors.email}
        <Field
          type="password"
          name="password"
          placeholder="password"
          value={user.password}
          onChange={handleChange}
        />
        <Field
          type="text"
          name="role"
          placeholder="role"
          value={user.role}
          onChange={handleChange}
        />
        <button className="register-btn" type="submit">
          Create Your Account
        </button>
        <br></br>
      <span><Link to="/">Already have an account?</Link></span>
      </Form>
    </div>
    </div>
    </>
  );
};

const ValidatedUserForm = withFormik ({
  mapPropsToValues({ FirstName, lastName, email, password, role }) {
    return{
      firstName: "",
          lastName: "",
          email: "",
          password: "",
          role: ""
    };
  },
  validationSchema: Yup.object().shape({
    name: Yup.string().required(),
    email: Yup.string().email("invalid Email").required(),
    password: Yup.string().required(),
    role: Yup.string().required("Please specify a role"),
  }),
handleSubmit(values, { setStatus, resetForm}) {
  console.log("submitting", values);
  axiosWithAuth
    .post("/api/auth/register", values)
    .then(res => {
      console.log("Sucessful post, new user registered", res);
      setStatus(res.data);
      resetForm()
    })
    .catch(err => console.log(err.response))
  }
})(UserForm);


export default ValidatedUserForm;