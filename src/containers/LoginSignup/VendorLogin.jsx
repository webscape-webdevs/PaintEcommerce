import React, { useEffect, useState } from "react";
import "./vendorLogin.css";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { googleLogin, login } from "../../slices/sessionSlice";
import Loader from "../../components/Loader/Loader";
import { useGoogleLogin } from "@react-oauth/google";
import FacebookLogin from "@greatsumini/react-facebook-login";
import axios from "axios";
import Navbar from "../../components/Navbar/Navbar";

export default function VendorLogin() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, isAuthenticated } = useSelector((state) => state.sessionSlice);

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    dispatch(login({ email, password }));
  };

  const successFunction = async (data) => {
    console.log(data);
    let email = data.email;
    let firstName = data.given_name;
    let lastName = data.family_name;

    dispatch(googleLogin({ email, firstName, lastName }));
  };

  const handleGoogleLogin = useGoogleLogin({
    onSuccess: async (response) => {
      try {
        const { data } = await axios.get("https://www.googleapis.com/oauth2/v3/userinfo", {
          headers: {
            Authorization: `Bearer ${response.access_token}`,
          },
        });
        successFunction(data);
      } catch (error) {
        console.log(error);
      }
    },
    onError: (error) => console.log(error),
  });

  return loading ? (
    <Loader />
  ) : (
    <div className="memberLogin">
      <Navbar />
      <div className="login mb-28 w-1/2 ml-48 ">
        <h1 className="text-2xl font-semibold">Vendor Login</h1>
        <input type="text" name="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your Email"></input>
        <input
          type="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your Password"
        ></input>
        <button className="p-2 pl-24 pr-24 clicabledivRegsiter bg-blue-500 h-10 rounded-md text-white  text-xl " onClick={handleLogin}>
          Login
        </button>
        <button className="p-2 pl-24 pr-24 clicabledivRegsiter bg-blue-500 h-10 rounded-md text-white  text-xl " onClick={handleGoogleLogin}>
          Google login
        </button>
        <FacebookLogin
          appId="481230550847089"
          onSuccess={(response) => {
            console.log("Login Success!", response);
          }}
          onFail={(error) => {
            console.log("Login Failed!", error);
          }}
          onProfileSuccess={(response) => {
            console.log("Get Profile Success!", response);
          }}
          render={({ onClick, logout }) => (
            <button
              className="p-2 pl-24 pr-24 clicabledivRegsiter bg-blue-500 h-10 rounded-md text-white  text-xl "
              onClick={onClick}
              // onLogoutClick={logout}
            >
              Facebook Login
            </button>
          )}
        />
        <div>OR</div>
        <Link to="/register">
          <button className="p-2 pl-36 pr-28 clicablediv bg-blue-500 h-10 rounded-md text-white  text-xl ">Register</button>
        </Link>
      </div>
    </div>
  );
}
