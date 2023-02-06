import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { login, register } from "../../slices/sessionSlice";
import Navbar from "../../components/Navbar/Navbar";

function LoginSignup() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { sessionUser } = useSelector((state) => state.sessionSlice);

  useEffect(() => {
    if (sessionUser._id) {
      navigate("/");
    }
  }, [sessionUser, navigate]);

  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const handleRegister = (e) => {
    e.preventDefault();
    dispatch(register({ registerEmail, registerPassword }));
  };

  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(login({ loginEmail, loginPassword }));
  };

  return (
    <div className="loginSignup">
      <Navbar />
      <div className="register">
        <form>
          <label>Email Id</label>
          <input name="email" placeholder="Enter Email" value={registerEmail} onChange={(e) => setRegisterEmail(e.target.value)} />
          <label>Password</label>
          <input name="password" placeholder="Enter Password" value={registerPassword} onChange={(e) => setRegisterPassword(e.target.value)} />
          <button onClick={handleRegister}>Register</button>
        </form>
      </div>

      <div className="login">
        <form>
          <label>Email Id</label>
          <input name="email" placeholder="Enter Email" value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)} />
          <label>Password</label>
          <input name="password" placeholder="Enter Password" value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} />
          <button onClick={handleLogin}>Login</button>
        </form>
      </div>
    </div>
  );
}

export default LoginSignup;
