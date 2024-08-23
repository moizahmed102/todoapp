import React, { useState } from "react";
import { signupUser } from "../services/authService";
import { useNavigate } from "react-router-dom";

function Signup() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const { name, email, password, confirmPassword } = formData;
  const navigate = useNavigate();

  const onSubmit = async (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const response = await signupUser({ name, email, password });
      console.log("Registered user:", response);
      navigate("/profile");
    } catch (error) {
      console.log(error);
      alert("Signup failed: " + error.message);
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
              required
            />
          </div>
          <div className="form-data">
            <input
              type="email"
              name="email"
              value={email}
              id="email"
              placeholder="Enter your email"
              onChange={onChange}
              required
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
              required
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
              required
            />
          </div>
          <div className="form-data">
            <button type="submit">Signup</button>
          </div>
        </form>
      </div>
    </>
  );
}

export default Signup;
