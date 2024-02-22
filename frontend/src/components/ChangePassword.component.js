import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


function ChangePassword({ user }) {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();
//   console.log(user.password)
  const email = user.email

  const handleChangePassword = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');

    // Validate input
    if (!currentPassword || !newPassword || !confirmNewPassword) {
      setError('Please fill in all fields');
      return;
    }

    if (newPassword !== confirmNewPassword) {
      setError('New password and confirm password must match');
      return;
    }

    if (currentPassword !== user.password) {
        setError('Current password is incorrect');
        return;
      }

    try {
      // Send request to update password
      const response = await fetch('http://127.0.0.1:5000/change_password', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ currentPassword, newPassword, confirmNewPassword, email  })
      });
      const data = await response.json();
      const success = data.success;
      console.log(success)
      if (success) {
        setSuccessMessage('Password updated successfully');
        // Clear form fields
        setCurrentPassword('');
        setNewPassword('');
        setConfirmNewPassword('');
        await new Promise(resolve => setTimeout(resolve, 3000)); // 
        navigate('/user_info');
      } else {
        setError(response.data.message || 'Failed to update password');
      }
    } catch (error) {
      setError('An error occurred. Please try again.');
    }
  };

  return (
    <div>
      <h3 style={{color:"#66bb6a"}}>Change Password</h3>
      <form onSubmit={handleChangePassword}>
      <div className="mb-3">
          <label htmlFor="currentPassword">Current Password</label>
          <input
            type="password"
            className="form-control"
            id="currentPassword"
            placeholder="current password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="newPassword">New Password</label>
          <input
            type="password"
            id="newPassword"
            className="form-control"
            placeholder="new password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="newPassword">Confirm Password</label>
          <input
            type="password"
            id="confirmNewPassword"
            className="form-control"
            placeholder="confirm password"
            value={confirmNewPassword}
            onChange={(e) => setConfirmNewPassword(e.target.value)}
            required
          />
        </div>

        <div className="d-grid">
          <button type="submit" className="btn btn-primary">
          Change Password
          </button>
        </div>

      </form>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      {successMessage && <div style={{ color: 'green',fontSize: '20px' }}>{successMessage}</div>}
    </div>
  );
}

export default ChangePassword;
