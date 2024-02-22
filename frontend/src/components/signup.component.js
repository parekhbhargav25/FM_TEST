import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";


function SignUp ({onSignup}) {
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const navigate = useNavigate();
    

    const handleSignInClick = () =>{
        navigate('/sign-in');
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        
        // Check if any field is empty
        if (!firstname || !lastname || !email || !username || !password) {
            setError('Please fill in all fields.');
            return;
        }
    
        try {
          const response = await fetch('http://127.0.0.1:5000/signup', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ firstname, lastname, username, email, password })
          });
    
          const data = await response.json();
          console.log(data.user)
          const success = data.success;
    
          if (success) {
            localStorage.setItem("authenticated", true);
            onSignup(data.user);
            navigate('/products'); // Navigate to the products page
            window.location.reload();
          } else {
            setError(data.message); // Display error message if signup fails
          }
        } catch (error) {
          console.error('Error logging in:', error);
          setError('An unexpected error occurred. Please try again later.');
        }
      };


    return (
      <form onSubmit={handleSubmit}>
        <h3>Sign Up</h3>
        <div className="mb-3">
          <label>First name</label>
          <input
            type="text"
            className="form-control"
            placeholder="First name"
            value={firstname}
            onChange={(e) => setFirstname(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label>Last name</label>
          <input type="text" 
          className="form-control" 
          placeholder="Last name"
          value={lastname}
          onChange={(e) => setLastname(e.target.value)}
          required
          />
        </div>
        <div className="mb-3">
          <label>Username</label>
          <input type="text" 
          className="form-control" 
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          />
        </div>
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
            Sign Up
          </button>
        </div>
        <p className="forgot-password text-center">
        Already registered <span onClick={handleSignInClick} style={{ color: 'blue', textDecoration: 'underline', cursor: 'pointer' }}> 
        sign in?</span>
        
        {error && <p className="error-message text-center" style={{ color: '#ff1744', fontSize: '18px', fontWeight: 'bold' }}>{error}</p>}
        </p>

      </form>
    )
}

export default SignUp;
