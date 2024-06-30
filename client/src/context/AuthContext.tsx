import React, { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";

interface AuthContextType {
  token: string | null;
  isAuthenticated: boolean;
  setToken: React.Dispatch<React.SetStateAction<string | null>>;
}

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const { isAuthenticated, user, getAccessTokenSilently } = useAuth0();
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("jwt")
  );

  useEffect(() => {
    const getToken = async () => {
      try {
        handleAuthentication();
      } catch (error) {
        console.log("Error getting access token:", error);
      }
    };

    if (isAuthenticated) {
      getToken();
    }
  }, [isAuthenticated]);

  const handleAuthentication = async () => {
    if (isAuthenticated && user) {

      try {
        const endpoint = `${import.meta.env.VITE_BACKEND_URL}/api/signin`;

        const response = await axios.post(
          endpoint,
          {
            email: user.email,
          },
        );
        console.log('response from signing in', response);
        
        try {
          localStorage.setItem("jwt", response.data.access_token);
          console.log("Token set in localStorage:", response.data.access_token);
          setToken(response.data.access_token);
        } catch (localStorageError) {
          console.error(
            "Error setting token in localStorage:",
            localStorageError
          );
        }
      } catch (error) {
        console.error("Error sending user data to backend:", error);
      }
    }
  };

  return (
    <AuthContext.Provider 
    value={{ token, isAuthenticated, setToken }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};