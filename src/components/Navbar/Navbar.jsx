import React from "react";
import "./navbar.css";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../slices/sessionSlice";

function Navbar() {
  const { sessionUser } = useSelector((state) => state.sessionSlice);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  const Options = () => {
    return (
      <div className="navbar-options">
        <Link to="/"> Home </Link>
        <Link to="/productSection"> Products </Link>
        {sessionUser._id ? (
          <>
            {/* <Link to="/profile"> Profile </Link>*/}
            <Link to="/myOrders"> Orders </Link>
            <Link to="/cart"> Cart </Link>
            {sessionUser.role === "admin" && <Link to="/dasboard">Dashboard</Link>}
            {sessionUser.role === "vendor" && <Link to="/vendorDashboard">Dashboard</Link>}
            <span style={{ cursor: "pointer" }} onClick={handleLogout}>
              Logout
            </span>
          </>
        ) : (
          <Link to="/login"> Login / Signup </Link>
        )}
      </div>
    );
  };

  return (
    <div className="navbar">
      <div className="navbar-container">
        <Options />
      </div>
    </div>
  );
}

export default Navbar;
