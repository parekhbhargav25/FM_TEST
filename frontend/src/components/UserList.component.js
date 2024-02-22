import React, { useState, useEffect } from 'react';

function Users() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('http://127.0.0.1:5000/allUsers'); // Adjust the endpoint according to your backend route
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error('Error fetching data:', error);
      setError('An unexpected error occurred. Please try again later.');
    }
  };

      return (
        <div style={{ maxHeight: '500px', overflowY: 'auto' }}>
          <h3 style={{color: "#f44336"}}>User List</h3>
          {error && <div className="text-danger">{error}</div>}
          <table className="table">
            <thead>
              <tr>
                <th scope="col">ID</th>
                <th scope="col">Firstname</th>
                <th scope="col">Lastname</th>
                <th scope="col">username</th>
                <th scope="col">email</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={index}>
                  <td>{user.id}</td>
                  <td>{user.firstName}</td>
                  <td>{user.lastName}</td>
                  <td>{user.userName}</td>
                  <td>{user.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    }

export default Users;