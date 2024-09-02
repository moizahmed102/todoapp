import React, { useEffect, useState } from "react";
import { signupUserThunk } from "../features/auth/authSlice";
import {useSelector, useDispatch} from "react-redux"
import { useNavigate } from "react-router-dom";

function Signup() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const { name, email, password, confirmPassword } = formData;

  const dispatch = useDispatch()
  const navigate = useNavigate();

  const {status, error, user} = useSelector((state) => state.auth)

  const onSubmit = async (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;}
      dispatch(signupUserThunk({name, email, password}))
    }

  const onChange = (event) => {
    setFormData((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };
  useEffect(() => {
    if(user) {
      navigate("/profile")
    }
  },[user, navigate])
  return (
    <>
     <div className="d-flex justify-content-center align-items-center vh-100">
  <div className="w-50 p-4 shadow-lg rounded bg-light">
    <h1 className="text-center mb-4">Registration Page</h1>
    <form onSubmit={onSubmit} className="mx-auto">
    {error && (
              <div className="alert alert-danger" role="alert">
                {error.message || "An error occurred during signup."}
              </div>
            )}
      <div className="form-group mb-3">
        <label htmlFor="name">Name</label>
        <input
          type="text"
          name="name"
          value={name}
          id="name"
          className="form-control"
          placeholder="Enter your name"
          onChange={onChange}
          required
        />
      </div>
      <div className="form-group mb-3">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          value={email}
          id="email"
          className="form-control"
          placeholder="Enter your email"
          onChange={onChange}
          required
        />
      </div>
      <div className="form-group mb-3">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          value={password}
          id="password"
          className="form-control"
          placeholder="Enter your password"
          onChange={onChange}
          required
        />
      </div>
      <div className="form-group mb-3">
        <label htmlFor="confirmPassword">Confirm Password</label>
        <input
          type="password"
          name="confirmPassword"
          value={confirmPassword}
          id="confirmPassword"
          className="form-control"
          placeholder="Confirm your password"
          onChange={onChange}
          required
        />
      </div>
      <div className="form-group">
      <button type="submit" className="btn btn-primary w-100" disabled={status === 'loading'}>
                {status === 'loading' ? "Signing up..." : "Signup"}
      </button>
      </div>
    </form>
  </div>
</div>

    </>
  );
}

export default Signup;
