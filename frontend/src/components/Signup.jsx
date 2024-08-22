import React from "react";
import { useState } from "react";
import { signupUser } from "../services/authService";
import {useNavigate} from "react-router-dom"

function Signup() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const { name, email, password, confirmPassword } = formData;
  const navigate = useNavigate()

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await signupUser({name, email, password})
      console.log('register user:', response)
      navigate('/profile')
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
    <h1 className="heading">Registration Page</h1>
      <div>
        <form onSubmit={onSubmit} className="form">
            <div className="form-data">
          <input
            type="text"
            name="name"
            value={name}
            id="name"
            placeholder="Enter your name"
            onChange={onChange}
          />
          </div>
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
          <input
            type="password"
            name="confirmPassword"
            value={confirmPassword}
            id="confirmPassword"
            placeholder="Confirm your password"
            onChange={onChange}
          />
          </div>
          <div className="form-data">
          <button type="submit" onSubmit={onSubmit}>Signup</button>
          </div>
        </form>
      </div>
    </>
  );
}

export default Signup;
