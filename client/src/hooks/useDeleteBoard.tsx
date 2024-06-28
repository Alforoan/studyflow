import axios from 'axios';
import { useState } from 'react';

const useDeleteBoard = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [successMsg, setSuccessMsg] = useState<string>('');

  const deleteBoard = async (boardId: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/api/boards/${boardId}`
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
