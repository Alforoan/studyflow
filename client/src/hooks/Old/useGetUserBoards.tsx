import { useState } from "react";
import axios from "axios";
import { Board } from "../../types"; // Ensure Card is also imported if it's a separate type
import { useAuth0 } from "@auth0/auth0-react";

const useGetUserBoards = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const { user } = useAuth0();
  const getUserBoards = async (): Promise<Board[]> => {
    setIsLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem("jwt");
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/boards`,
        {
          params: { email: user?.email ?? "something@wentwronghere.com" },
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setIsLoading(false);
      const boards: Board[] = response.data.map((board: Board) => ({
        ...board,
        cards: [],
      }));
      return boards;
    } catch (err) {
      if (err instanceof Error) {
        setError(err);
        setIsLoading(false);
      }
      return [];
    }
  };

  const getAllBoards = async (): Promise<Board[]> => {
    setIsLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem("jwt");
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/boards/admin`,
        {
          params: { email: user?.email ?? "something@wentwronghere.com" },
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setIsLoading(false);
      const boards: Board[] = response.data.map((board: Board) => ({
        ...board,
        cards: [],
      }));
      return boards;
    } catch (err) {
      if (err instanceof Error) {
        setError(err);
        setIsLoading(false);
      }
      return [];
    }
  };

  return { getUserBoards, getAllBoards, isLoading, error };
};

export default useGetUserBoards;