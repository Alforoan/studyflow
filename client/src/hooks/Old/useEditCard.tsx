import { useState, useEffect } from "react";
import axios from "axios";
import { Card } from "../../types";

const useEditCard = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const editCard = async (card: Card, isTemplate: boolean) => {
    setIsLoading(true);
    setError(null);

    const cardType = isTemplate ? "template_cards" : "cards";

    const detailsStr = JSON.stringify(card.details);
    const creationDate = new Date(card.creationDate);
    const token = localStorage.getItem("jwt");
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/${cardType}/${card.id}`,
        {
          cardName: card.cardName,
          creationDate: creationDate.toISOString(),
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
      console.log("WE MADE THE PUT REQUEST");
      setIsLoading(false);
      console.log(`put response ${response}`);
      return response.data;
    } catch (err) {
      console.log("WE TRIED BUT FAILED");
      console.error("PUT request failed:", err);

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

  return { editCard, isLoading, error };
};

export default useEditCard;
