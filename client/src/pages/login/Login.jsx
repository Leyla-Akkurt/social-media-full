import { useContext, useRef } from "react";
import "./login.css";
import { loginCall } from "../../ApiCalls";
import { AuthContext } from "./../../context/AuthContext";
import { CircularProgress } from "@mui/material";
import { useNavigate } from "react-router";

export default function Login() {
  const email = useRef();
  const password = useRef();
  const { isFetching, dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    loginCall(
      { email: email.current.value, password: password.current.value },
      dispatch
    );
  };
  const handleClick = () => {
    navigate("/register");
  };
  return (
    <div className="login_container">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">Zed Social</h3>
          <span className="loginDesc">
            Connect with friends and the world around you on Zed Social
          </span>
        </div>
        <div className="loginRight">
          <form className="loginBox" onSubmit={handleSubmit}>
            <input
              type="email"
              className="loginInput"
              placeholder="Email"
              ref={email}
              required
            />
            <input
              type="password"
              className="loginInput"
              placeholder="Password"
              ref={password}
              required
              minLength={8}
            />
            <button className="loginButton" disabled={isFetching}>
              {isFetching ? <CircularProgress color="inherit" /> : "Log In"}
            </button>
            <span className="loginForgot">Forgot Password?</span>
            <button
              className="loginRegister"
              onClick={() => {
                handleClick();
              }}
            >
              {isFetching ? (
                <CircularProgress color="inherit" />
              ) : (
                "Create a New Account"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
