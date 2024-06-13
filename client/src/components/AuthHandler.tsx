import React, { useEffect } from "react";
import { useAuth0, User } from "@auth0/auth0-react";
import axios from 'axios';

const AuthHandler: React.FC = () => {
  const { isAuthenticated, user, getIdTokenClaims } = useAuth0();

  useEffect(() => {
    const handleAuthentication = async () => {
      if (isAuthenticated && user) {
        console.log('User is authenticated:', user);
        
        try {
          // Check if the user's email exists in the backend (api/register)
          const emailExists = await checkEmailExists(user);

          // Determine the endpoint based on email existence
          const endpoint = emailExists
            ? 'http://127.0.0.1:5000/api/signin'
            : 'http://127.0.0.1:5000/api/register';

          // Send data to the backend
          try {
            const response = await axios.post(endpoint, {
              name: user.nickname,
              email: user.email,
            });
            console.log('User data sent to backend:', response.data);
          } catch (error) {
            console.error('Error sending user data to backend:', error);
          }
        } catch (error) {
          console.error('Error checking email existence:', error);
        }
      } else {
        console.log('User not authenticated or user object not available');
      }
    };

    handleAuthentication();
  }, [isAuthenticated, user, getIdTokenClaims]);

  const checkEmailExists = async (user: User | undefined): Promise<boolean> => {
    if (!user || !user.email) {
      throw new Error('User email is missing or undefined');
    }

    try {
      const response = await axios.get(`http://127.0.0.1:5000/api/register?email=${user.email}`);
      return response.data.exists;
    } catch (error) {
      console.error('Error checking email existence:', error);
      throw error;
    }
  };

  return null;
};

export default AuthHandler;
