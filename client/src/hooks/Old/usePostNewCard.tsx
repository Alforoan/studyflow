import { useState, useEffect } from "react";
import axios from "axios";
import { Card } from "../../types";

const usePostNewCard = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const postNewCard = async (card: Card, boardId: string) => {
    setIsLoading(true);
    setError(null);

    const token = localStorage.getItem("jwt");
    const detailsStr = JSON.stringify(card.details);
    const dateStr =
      card.creationDate instanceof Date
        ? card.creationDate.toISOString()
        : card.creationDate;
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/boards/${boardId}`,
        {
          cardId: card.id,
          cardName: card.cardName,
          creationDate: dateStr,
          order: card.order,
          column: card.column,
          details: detailsStr,
        },

        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setIsLoading(false);
      console.log(`post response ${response.data}`);
      return response.data;
    } catch (err) {
      if (err instanceof Error) {
        console.log("ERR POSTING CARD", err);
      }
      // Error specific to board name already in use

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

  return { postNewCard, isLoading, error };
};

export default usePostNewCard;