import React, { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import axios from 'axios';

const AuthHandler: React.FC = () => {
  const { isAuthenticated, user, getIdTokenClaims } = useAuth0();

  useEffect(() => {
    const handleAuthentication = async () => {
      if (isAuthenticated && user) {
        console.log('User is authenticated:', user);
        
        try {
          const endpoint = `${
            import.meta.env.VITE_BACKEND_URL
          }/api/signin`;
          console.log({endpoint});
          
          // Send data to the backend
          try {
            const response = await axios.post(endpoint, {
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

  return null;
};

export default AuthHandler;
