import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

function Navigation({ isAuthenticated, onLogout }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      onLogout();
      toast.success("Logged out successfully");
    }
  };

  return (
    <nav className="custom-navbar">
      <div className="container">
        <div className="auth_logo_container" onClick={() => navigate("/")}>
          <img src="/images/auth_logo.png" width="50px" height="50px" />

          <div className="navbar-brand">User Management</div>
        </div>
        <div className="nav-links">
          {!isAuthenticated ? (
            <>
              <Link className="nav-link" to="/login">
                Login
              </Link>
              <Link className="nav-link" to="/register">
                Register
              </Link>
            </>
          ) : (
            <>
              <Link className="nav-link" to="/profile">
                Profile
              </Link>
              <button className="nav-link logout-btn" onClick={handleLogout}>
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navigation;
