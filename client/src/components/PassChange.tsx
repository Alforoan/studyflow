// src/components/PassChange.tsx
import React, { useState } from "react";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import { Box, Button, Text } from "@chakra-ui/react";

const PassChange: React.FC = () => {
  const { user } = useAuth0();
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handlePasswordReset = async () => {
    setMessage("");
    setError("");

    try {
      await axios.post(
        `https://${
          import.meta.env.VITE_AUTH0_DOMAIN
        }/dbconnections/change_password`,
        {
          client_id: import.meta.env.VITE_AUTH0_CLIENT_ID,
          email: user?.email, // Use the authenticated user's email
          connection: "Username-Password-Authentication",
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      setMessage("Password reset email sent!");
      // clear message after 4 seconds
      setTimeout(() => {
        setMessage("");
      }, 4000);
    } catch (err) {
      setError("Unable to reset password.");
    }
  };

  return (
    <Box className="password-reset-container" w="100%" textAlign={"center"}>
      <Button
        color="gray.800"
        _hover={{ color: "gray.600" }}
        p={2}
        borderRadius="md"
        onClick={handlePasswordReset}
        textDecoration="underline"
      >
        Reset Password
      </Button>
      {message && (
        <Text className="success-message" color="green.500" mt={2}>
          {message}
        </Text>
      )}
      {error && (
        <Text className="error-message" color="red.500" mt={2}>
          {error}
        </Text>
      )}
    </Box>
  );
};

export default PassChange;
