import { useState, useEffect } from "react";
import axios from "axios";
import { Board } from "../../types";
import { useAuth0 } from "@auth0/auth0-react";

const usePostNewBoard = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const { user } = useAuth0();
  const token = localStorage.getItem("jwt");

  const postNewBoard = async (board: Board) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/boards`,
        {
          name: board.name,
          email: user?.email ?? "something@wentwronghere.com",
          uuid: board.uuid,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setIsLoading(false);

      return response.data; // Assuming the server responds with the created board object
    } catch (err) {
      // Error specific to board name already in use
      if (axios.isAxiosError(err) && err.response?.status === 400) {
        const errorMessage = err.response.data.error;
        if (errorMessage) {
          setError(errorMessage);
        } else {
          console.log("err.response.data.message"); // Other 400 errors
        }
      } else {
        // Handle other errors (e.g., network errors)
        setError(err instanceof Error ? err : new Error("Unknown error")); // Handle unexpected errors
      }
      setIsLoading(false);
    }
  };
  // clears the error message after 2 seconds
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError(null);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [error]);

  return { postNewBoard, isLoading, error };
};

export default usePostNewBoard;
