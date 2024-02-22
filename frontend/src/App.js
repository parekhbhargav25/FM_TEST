import { useEffect, useState } from "react";
import React from 'react';
// import { useNavigate } from 'react-router-dom';

import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom'
import Login from './components/login.component'
import Users from './components/UserList.component'
import Products from './components/ProductList.component'
import UserComponent from './components/UserInfo.component'
import SignUp from "./components/signup.component";
import ChangePassword from "./components/ChangePassword.component"

function App() {
  const [authenticated, setAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [logoutSuccess, setLogoutSuccess] = useState(false);
  // const navigate = useNavigate();

  useEffect(() => {
    // Check if the user is authenticated (e.g., by checking a token in local storage)
    const loggedInUser = localStorage.getItem("authenticated");
    const loggedInUserInfo = JSON.parse(localStorage.getItem("user"));

    if (loggedInUser) {
      setAuthenticated(true);
      setUser(loggedInUserInfo);
    }
  }, []);

  const handleLogin = (userData) => {
    setAuthenticated(true); // Update authentication state
    setUser(userData);
    console.log(userData)
    localStorage.setItem("user", JSON.stringify(userData));
  };

  const handleSignup = (userData) => {
    setAuthenticated(true); // Update authentication state
    setUser(userData);
    console.log(userData)
    localStorage.setItem("user", JSON.stringify(userData));
  };


  const handleLogout = () => {
    // Clear authentication state and local storage
    setAuthenticated(false);
    localStorage.removeItem("authenticated");
    setUser(null);
    // navigate('/sign-in');
    window.location.href = '/sign-in';
    localStorage.removeItem("user");

  };

  


  return (
    <Router>
      <div className="App">
      <nav className="navbar navbar-expand-sm navbar-dark bg-dark fixed-top">
    <div className="container">
        <Link className="navbar-brand" to="/products">
            Bhargav
        </Link>
        <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
            <ul className="navbar-nav ml-auto">
                {!authenticated ? (
                    <>
                        <li className="nav-item">
                            <Link className="nav-link" to="/sign-in">
                                Login
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/sign-up">
                                Sign up
                            </Link>
                        </li>
                    </>
                ) : (
                    <>
                        <li className="nav-item">
                            <Link className="nav-link" to="/products">
                                Home
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/user_list">
                                Admin
                            </Link>
                        </li>
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                User
                            </a>
                            <div className="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdownMenuLink">
                                <a className="dropdown-item" href="/user_info">Profile</a>
                                <a href="#" className="dropdown-item" onClick={handleLogout}>Logout</a>
                            </div>
                        </li>
                    </>
                )}
            </ul>
        </div>
    </div>
</nav>
        <div className="auth-wrapper">
          <div className="auth-inner">
            {/* Render Routes conditionally based on authentication status */}
            <Routes>
              <Route path="/" element={<Login onLogin={handleLogin} />} />
              <Route path="/sign-in" element={<Login onLogin={handleLogin} />} />
              <Route path="/sign-up" element={<SignUp onSignup={handleSignup} />} />
              {authenticated && <Route path="/products" element={<Products />} />}
              {authenticated && <Route path="/user_info" element={<UserComponent user={user} />} />}
              {authenticated && <Route path="/user_list" element={<Users />} />}
              {authenticated && <Route path="/change_pass" element={<ChangePassword user={user} />} />}
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;