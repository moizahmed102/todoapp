import React, { useState } from "react";
import { loginUser } from "../services/authService";
import { useNavigate } from "react-router-dom";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { email, password } = formData;
  const navigate = useNavigate();

  const onSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError(""); 
    try {
      await loginUser({ email, password }); 
      navigate("/profile");
    } catch (error) {
      console.log(error);
      setError(error.message || "Login failed. Please try again.");
    } finally {
      setLoading(false);
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
            <button className="btn btn-primary" type="submit" disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </button>
        </form>
      </div>
    </>
  );
}

export default Login;
