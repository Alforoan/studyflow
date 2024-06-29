import { useState } from "react";
import axios from "axios";
import { Card, CardDetails, ChecklistEntry, Columns } from "../types"; // Ensure Card is also imported if it's a separate type

const useGetCards = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const token = localStorage.getItem("jwt");
  const getCardsFromBoard = async (boardId: string): Promise<Card[]> => {
    setIsLoading(true);
    setError(null);
    console.log(boardId);
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/boards/${boardId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setIsLoading(false);

      const cards = response.data.map((datapt: { [x: string]: any }) => {
        let details = JSON.parse(datapt["details"]);
        const cardDetails: CardDetails = {
          checklist: details["checklist"] as ChecklistEntry[],
          notes: details["notes"],
          timeEstimate: details["timeEstimate"],
        };

        let card: Card = {
          id: datapt["card_id"],
          cardName: datapt["card_name"],
          column: datapt["column_name"] as Columns,
          creationDate: datapt["creation_date"] as Date,
          order: datapt["order"],
          details: cardDetails,
        };

        return card;
      });
      console.log("CARDS: ", { cards });

      return cards;
    } catch (err) {
      if (err instanceof Error) {
        setError(err);
        setIsLoading(false);
      }
      return [];
    }
  };

  return { getCardsFromBoard, isLoading, error };
};

export default useGetCards;
