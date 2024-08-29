import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginUserThunk } from "../features/auth/authSlice";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { status, error, user } = useSelector((state) => state.auth);
  const { email, password } = formData;

  const onSubmit = async (event) => {
    event.preventDefault();
    dispatch(loginUserThunk({ email, password }));
  };

  const onChange = (event) => {
    setFormData((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };
  useEffect(() => {
    console.log("User:", user);
    if (user) {
      console.log("Navigating to profile...");
      navigate("/profile");
    }
  }, [user, navigate]);
  
  return (
    <>
      <div className="container mt-5">
        <h2 className="mb-4">Login To Your Account</h2>
        <form onSubmit={onSubmit}>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              name="email"
              className="form-control"
              value={email}
              id="email"
              placeholder="Enter your email"
              onChange={onChange}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              name="password"
              className="form-control"
              value={password}
              id="password"
              placeholder="Enter your password"
              onChange={onChange}
              required
            />
          </div>
          {error && <div className="alert alert-danger">{error}</div>}
          <button
            className="btn btn-primary"
            type="submit"
            disabled={status === "loading"}
          >
            {status === "loading" ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </>
  );
}

export default Login;
