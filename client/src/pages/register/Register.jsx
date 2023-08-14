import { useRef } from "react";
import "./register.css";
import axios from "axios";
import {useNavigate } from "react-router";

function Register() {
  const username = useRef();
  const email = useRef();
  const password = useRef();
  const passwordAgain = useRef();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (passwordAgain.current.value !== password.current.value) {
      password.current.setCustomValidity("Passwords don't match ");
    } else {
      const user = {
        username: username.current.value,
        email: email.current.value,
        password: password.current.value,
      };
      try {
        await axios.post("http://localhost:8800/api/auth/register",user);
        navigate("/login");
      } catch (err) {
        console.log(err);
      }
    }
  };
  const handleClick=()=>{
    navigate("/login");
  }

  return (
    <div className="register_container">
      <div className="registerWrapper">
        <div className="registerLeft">
          <h3 className="registerLogo">Zed Social</h3>
          <span className="registerDesc">
            Connect with friends and the world around you on Zed Social
          </span>
        </div>
        <div className="registerRight">
          <form className="registerBox" onSubmit={handleSubmit}>
            <input
              type="text"
              className="registerInput"
              placeholder="Username"
              ref={username}
              required
            />
            <input
              type="email"
              className="registerInput"
              placeholder="Email"
              ref={email}
              required
            />
            <input
              type="password"
              className="registerInput"
              placeholder="Password"
              ref={password}
              required
              minLength={8}
            />
            <input
              type="password"
              className="registerInput"
              placeholder="Password Again"
              ref={passwordAgain}
              required
              minLength={8}
            />
            <button className="registerButton" type="submit">
              Sign Up
            </button>
            <button className="logIntoAccount" onClick={()=>handleClick()}>Log Into Account</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
