import React from "react";
import { useState } from "react";
import { loginUser } from "../services/authService";
import {useNavigate} from "react-router-dom"

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const {  email, password } = formData;
  const navigate = useNavigate()
  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await loginUser({email, password})
      console.log(response)
      navigate("/profile")
    } catch (error) {
      console.log(error)
    }
  };
  const onChange = (event) => {
    setFormData((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };
  return (
    <>
    <h1 className="heading">Login To Your Account</h1>
      <div>
        <form onSubmit={onSubmit} className="form">
          <div className="form-data"> 
          <input
            type="text"
            name="email"
            value={email}
            id="email"
            placeholder="Enter your email"
            onChange={onChange}
          />
          </div>
          <div className="form-data">
          <input
            type="password"
            name="password"
            value={password}
            id="password"
            placeholder="Enter your password"
            onChange={onChange}
          />
          </div>
          <div className="form-data">
          <button type="submit" onSubmit={onSubmit}>Login</button>
          </div>
        </form>
      </div>
    </>
  );
}

export default Login;
