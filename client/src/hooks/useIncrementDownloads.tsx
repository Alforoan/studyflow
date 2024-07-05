import axios from "axios";
import { useState } from "react";

const useIncrementDownloads = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const incrementDownloads = async (templateId: string) => {
    setIsLoading(true);
    setError(null);
    const token = localStorage.getItem("jwt");

    try {
      await axios.put(
        `${
          import.meta.env.VITE_BACKEND_URL
        }/api/templates/${templateId}/increment_downloads`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setIsLoading(false);
    } catch (err) {
      if (err instanceof Error) {
        setError(err);
      }
      setIsLoading(false);
    }
  };

  return { incrementDownloads, isLoading, error };
};

export default useIncrementDownloads;
