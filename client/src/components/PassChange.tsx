// src/components/PassChange.tsx
import React, { useState } from 'react';
import axios from 'axios';
import { useAuth0 } from '@auth0/auth0-react';

const PassChange: React.FC = () => {
  const { user } = useAuth0();
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handlePasswordReset = async () => {
    setMessage('');
    setError('');

    try {
      await axios.post(
        `https://${import.meta.env.VITE_AUTH0_DOMAIN}/dbconnections/change_password`,
        {
          client_id: import.meta.env.VITE_AUTH0_CLIENT_ID,
          email: user?.email, // Use the authenticated user's email
          connection: 'Username-Password-Authentication'
        },
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
  
      setMessage('Password reset email sent!');
      // clear message after 4 seconds
      setTimeout(() => {
        setMessage('');
      }, 4000);
    } catch (err) {
      setError('Unable to reset password.');
    }
  };

  return (
    <div className="password-reset-container">
      <button className="font-primary text-primaryText hover:text-primaryTextLighter p2 border rounded" onClick={handlePasswordReset}>Reset Password</button>
      {message && <p className="success-message font-primary text-primaryText">{message}</p>}
      {error && <p className="error-message font-primary text-primaryText">{error}</p>}
    </div>
  );
};

export default PassChange;
