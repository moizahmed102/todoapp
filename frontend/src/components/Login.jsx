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
      const response = await loginUser({ email, password });
      console.log("User logged in:", response);
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
      <h1 className="heading">Login To Your Account</h1>
      <div>
        <form onSubmit={onSubmit} className="form">
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
          {error && <p className="error">{error}</p>}
          <div className="form-data">
            <button type="submit" disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default Login;
