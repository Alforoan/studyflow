import React, { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import axios from 'axios';

const AuthHandler: React.FC = () => {
  const { isAuthenticated, user, getAccessTokenSilently,  } = useAuth0();
  
  useEffect(() => {
    const getToken = async () => {
      try {
        const token = await getAccessTokenSilently();
        console.log('CHECKING TEH VALUE OF TOKEN ', token);
        
        handleAuthentication(token);
      } catch (error) {
        console.log('Error getting access token:', error);
      }
    };

    if (isAuthenticated) {
      getToken();
    }
  }, [isAuthenticated]);

  const handleAuthentication = async (token: string) => {
    if (isAuthenticated && user) {
      console.log("User is authenticated:", user);

      try {
        const endpoint = `${import.meta.env.VITE_BACKEND_URL}/api/signin`;
        console.log({ endpoint });

        try {
          const response = await axios.post(
            endpoint,
            {
              email: user.email,
              token: token,
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          console.log('checking token', token);
          console.log('checking response', response);
          
          try {
            localStorage.setItem("jwt", response.data.access_token);
            console.log(
              "Token set in localStorage:",
              response.data.access_token
            );
          } catch (localStorageError) {
            console.error(
              "Error setting token in localStorage:",
              localStorageError
            );
          }

        } catch (error) {
          console.error("Error sending user data to backend:", error);
        }
      } catch (error) {
        console.error("Error checking email existence:", error);
      }
    } else {
      console.log("User not authenticated or user object not available");
    }
  };

  return null;
};

export default AuthHandler;
