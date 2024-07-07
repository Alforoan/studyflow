import { useState, useEffect } from "react";
import axios from "axios";
import { Card } from "../../types";

const usePostTemplateCard = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const postTemplateCard = async (card: Card, boardId: string) => {
    setIsLoading(true);
    setError(null);

    const dateStr =
      card.creationDate instanceof Date
        ? card.creationDate.toISOString()
        : card.creationDate;

    const detailsStr = JSON.stringify(card.details);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/templates/${boardId}`,
        {
          cardId: card.id,
          cardName: card.cardName,
          creationDate: dateStr,
          order: card.order,
          column: card.column,
          details: detailsStr,
        }
      );
      setIsLoading(false);

      return response.data;
    } catch (err) {
      if (err instanceof Error) {
        console.log(err);
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

  return { postTemplateCard, isLoading, error };
};

export default usePostTemplateCard;
