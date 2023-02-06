import React, { useEffect, useState } from "react";
import "./vendorRegister.css";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../../slices/sessionSlice";
import { useParams } from "react-router-dom";
import Loader from "../../components/Loader/Loader";
import SellerForm from "../../components/CheckoutForms/SellerForm";
import Navbar from "../../components/Navbar/Navbar";

export default function VendorRegister() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, isAuthenticated } = useSelector((state) => state.sessionSlice);
  // const { referedByMemberId } = useParams();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  }, [isAuthenticated]);

  const [user, setUser] = useState({
    email: "",
    password: "",
    reEnterPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleRegister = (e) => {
    const { email, password, reEnterPassword } = user;

    e.preventDefault();

    const myForm = new FormData();

    myForm.set("email", email);

    myForm.set("password", password);

    if (password === reEnterPassword) {
      dispatch(register({ myForm }));
    } else {
      alert("Password and Re-entered Password does not match");
    }
  };

  return loading ? (
    <Loader />
  ) : (
    <div className="memberRegister">
      <Navbar />
      <div className="register mb-28 w-1/2 ml-48 ">
        <h1 className="text-2xl font-semibold">Vendor Register</h1>
        <input type="text" name="email" value={user.email} placeholder="Enter Email" onChange={handleChange}></input>
        <input type="password" name="password" value={user.password} placeholder="Password" onChange={handleChange}></input>
        <input type="password" name="reEnterPassword" value={user.reEnterPassword} placeholder="Re-enter Password" onChange={handleChange}></input>
        <button className="p-2 pl-24 pr-24 clicabledivRegsiter bg-blue-500 h-10 rounded-md text-white  text-xl " onClick={handleRegister}>
          Register
        </button>

        <div>OR</div>
        <Link to="/login">
          <button className="p-2 pl-36 pr-28 clicablediv bg-blue-500 h-10 rounded-md text-white  text-xl ">Login</button>
        </Link>
      </div>
    </div>
  );
}
