import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Profile from "./components/Profile";
import Dashboard from "./components/Dashboard";
import Navigation from "./components/Navigation";
import { Toaster } from "react-hot-toast";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  // Initialize authentication state from localStorage
  useEffect(() => {
    const user = localStorage.getItem("currentUser");
    if (user) {
      setIsAuthenticated(true);
      setCurrentUser(JSON.parse(user));
    }
  }, []);

  // Login handler
  const handleLogin = (credentials) => {
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const user = users.find(
      (u) =>
        u.email === credentials.email && u.password === credentials.password
    );

    if (user) {
      setIsAuthenticated(true);
      setCurrentUser(user);
      localStorage.setItem("currentUser", JSON.stringify(user));
      return true;
    }
    return false;
  };

  // Register handler
  const handleRegister = (userData) => {
    const users = JSON.parse(localStorage.getItem("users") || "[]");

    if (users.some((user) => user.email === userData.email)) {
      return false;
    }

    users.push(userData);
    localStorage.setItem("users", JSON.stringify(users));
    setIsAuthenticated(true);
    setCurrentUser(userData);
    localStorage.setItem("currentUser", JSON.stringify(userData));
    return true;
  };

  // Logout handler
  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentUser(null);
    localStorage.removeItem("currentUser");
  };

  return (
    <>
      <Toaster position="top-right" />

      <Router>
        {isAuthenticated && (
          <Navigation
            isAuthenticated={isAuthenticated}
            onLogout={handleLogout}
          />
        )}

        <Routes>
          <Route
            path="/login"
            element={
              !isAuthenticated ? (
                <Login onLogin={handleLogin} />
              ) : (
                <Navigate to="/dashboard" />
              )
            }
          />
          <Route
            path="/register"
            element={
              !isAuthenticated ? (
                <Register onRegister={handleRegister} />
              ) : (
                <Navigate to="/dashboard" />
              )
            }
          />
          <Route
            path="/dashboard"
            element={
              isAuthenticated ? (
                <Dashboard user={currentUser} />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/profile"
            element={
              isAuthenticated ? (
                <Profile user={currentUser} setCurrentUser={setCurrentUser} />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/"
            element={
              <Navigate to={isAuthenticated ? "/dashboard" : "/login"} />
            }
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
