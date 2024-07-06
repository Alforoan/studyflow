import axios from "axios";
import { useState } from "react";

const useDeleteBoard = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [successMsg, setSuccessMsg] = useState<string>("");

  const deleteBoard = async (boardId: string, isTemplate: boolean) => {
    setIsLoading(true);
    setError(null);
    const token = localStorage.getItem("jwt");

    const boardType = isTemplate ? "templates" : "boards";
    console.log("ISTEMPLATE", isTemplate);

    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/api/${boardType}/${boardId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setIsLoading(false);
      if (response.status === 200) {
        setSuccessMsg(response?.data?.message);
      }
    } catch (err) {
      if (err instanceof Error) {
        setError(err);
      }
      setIsLoading(false);
    }
  };

  return { deleteBoard, isLoading, error, successMsg, setSuccessMsg };
};

export default useDeleteBoard;
