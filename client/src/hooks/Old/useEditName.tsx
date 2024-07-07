import axios from "axios";
import { useState } from "react";

const useEditName = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string>("");

  const editName = async (
    name: string,
    boardId: string,
    isTemplate: boolean
  ) => {
    setIsLoading(true);
    setError(null);
    const token = localStorage.getItem("jwt");
    const boardType = isTemplate ? "templates" : "boards";
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/${boardType}/${boardId}`,
        { name: name },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Board name changed successfully:", response.data);
      setIsLoading(false);
      if (response.status === 200) {
        setSuccessMsg(response?.data?.message);
      }
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      }
      if (axios.isAxiosError(err)) {
        if (err.response?.status === 400) {
          setError("Board name already exists, please try another.");
          return;
        } else {
          setError("Failed to update board name. Please try again later.");
        }
      } else {
        console.log("Network error.");
      }
      setIsLoading(false);
    }
  };

  return { editName, isLoading, error, successMsg, setSuccessMsg };
};

export default useEditName;
