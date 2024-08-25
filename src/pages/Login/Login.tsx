import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoPerson } from "react-icons/io5";
import { FaKey } from "react-icons/fa6";
// import { loginUser } from "../../services/authService";
import Logo from "../../assets/full_logo.png";
import Img1 from "../../assets/Group 27430.png";
import "./Login.css";
import { Link } from "react-router-dom";
// import axios from "axios";
import authData from "../../data/login.json";
import { useAuth } from "../../contexts/AuthContext";
import { ApiResponse } from "../../types/Login";

const Login: React.FC = () => {
  const { login } = useAuth();
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const responseData: ApiResponse = authData as ApiResponse;

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // const response = await loginUser({ username, password });
      // console.log("Login successful:", response);
      // const res = await axios.post("http://localhost:5000/students");

      const { data, result } = responseData;
      console.log(data);
      login();
      navigate("/home");
    } catch (error) {
      setError("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login">
      <div className="left__bar">
        <img className="logo" src={Logo} alt="logo" />
        <img className="img1" src={Img1} alt="one" />
        <div className="welcome">
          <h4>Welcome to Top School</h4>
          <span className="text">
            Your one stop platform to create curriculum plans, set up school
            admin, view progress analytics and much more
          </span>
        </div>
      </div>
      <div className="right__bar">
        <h2>Hello Student</h2>
        <span>
          Please login to your account using your username or phone number
        </span>
        <form id="login" onSubmit={handleLogin}>
          <div className="input__div">
            <IoPerson className="icon" />
            <input
              className="input__box"
              type="text"
              name="username"
              id="username"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="input__div">
            <FaKey className="icon" />
            <input
              className="input__box"
              type="password"
              name="password"
              id="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {error && <p className="error">{error}</p>}
          <div className="forgot__password">
            <div>
              <input type="checkbox" name="remember" id="remember" />
              <span className="remember">Remember me</span>
            </div>
            <Link to="">Forgot Password?</Link>
          </div>
          <div className="submit">
            <button className="login-btn" type="submit" disabled={loading}>
              {loading ? "Logging In..." : "Log In"}
            </button>
            <span>Or</span>
            <button
              onClick={(e) => handleLogin(e)}
              className="login__phone"
              type="button"
            >
              Log In with Phone Number
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
