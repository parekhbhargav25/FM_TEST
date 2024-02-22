import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";


function Login({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('http://127.0.0.1:5000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();
      // console.log(data.user)
      const success = data.success;

      if (success) {
        localStorage.setItem("authenticated", true);
        onLogin(data.user);
        navigate('/products'); // Navigate to the products page
      } else {
        setError(data.message); // Display error message if login fails
      }
    } catch (error) {
      console.error('Error logging in:', error);
      setError('An unexpected error occurred. Please try again later.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Sign In</h3>
      <div className="mb-3">
        <label>Email address</label>
        <input
          type="email"
          className="form-control"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div className="mb-3">
        <label>Password</label>
        <input
          type="password"
          className="form-control"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <div className="d-grid">
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </div>
      {error && <div className="text-danger">{error}</div>}
    </form>
  );
}

export default Login;