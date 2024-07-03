import { useState } from "react";
import axios from "axios";
import { Card, CardDetails, ChecklistEntry, Columns } from "../types"; // Ensure Card is also imported if it's a separate type

const useGetTemplateCards = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const getCardsFromTemplate = async (boardId: string): Promise<Card[]> => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/templates/${boardId}`
      );
      setIsLoading(false);

      // inspect what's coming from the API
      console.log("API Response Data:", response.data);

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

      return cards;
    } catch (err) {
      if (err instanceof Error) {
        setError(err);
        setIsLoading(false);
      }
      return [];
    }
  };

  return { getCardsFromTemplate, isLoading, error };
};

export default useGetTemplateCards;
