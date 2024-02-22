import React from 'react';
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';

function UserComponent({ user }) {
    const navigate = useNavigate();

  const handleLogout = () => {
    // Clear authentication state and local storage
    localStorage.removeItem("authenticated");
    navigate('/sign-in'); // Redirect to the login page
    window.location.reload();
    localStorage.removeItem("user");
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2 style={{ color: '#2196f3' }} >Welcome {user.first_name}</h2>
      <p>First name: {user.first_name}</p>
      <p>Last name: {user.last_name}</p>
      <p>Username: {user.username}</p>
      <p>Email: {user.email}</p>
      {/* <button onClick={handleLogout}>Logout</button> */}
      <button onClick={handleLogout} type="button" class="btn btn-danger">Logout</button>
      <div>
      <Link to="/change_pass">
        {/* <button style={{ marginTop: '10px' }}>Change Password</button> */}
        <button style={{ marginTop: '10px' }} type="button" class="btn btn-primary">Change Password</button>
      </Link>   
      </div>
    </div>
  );
}

export default UserComponent;