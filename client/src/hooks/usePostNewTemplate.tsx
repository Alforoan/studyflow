import { useState, useEffect } from "react";
import axios from "axios";
import { Board } from "../types";
import { useAuth0 } from "@auth0/auth0-react";

const usePostNewTemplate = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const { user } = useAuth0();

  const username: string = user?.email ?? "anonymous@mail.com";

  const postNewTemplate = async (template: Board) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/templates`,
        {
          name: template.name,
          author: username,
          uuid: template.uuid,
          downloads: 0,
          uploaded_at: new Date(),
        }
      );
      setIsLoading(false);

      return response.data;
    } catch (err) {
      if (axios.isAxiosError(err) && err.response?.status === 400) {
        const errorMessage = err.response.data.error;
        if (errorMessage) {
          setError(errorMessage);
        } else {
          console.log("err.response.data.message");
        }
      } else {
        setError(err instanceof Error ? err : new Error("Unknown error"));
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

  return { postNewTemplate, isLoading, error };
};

export default usePostNewTemplate;
