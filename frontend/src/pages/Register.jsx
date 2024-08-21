import React from "react";
import { useState } from "react";

function Mainpage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const { name, email, password } = formData;

  const onSubmit = (event) => {
    event.preventDefault();
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
          <button type="submit" onSubmit={onSubmit}>Register</button>
          </div>
        </form>
      </div>
    </>
  );
}

export default Mainpage;
