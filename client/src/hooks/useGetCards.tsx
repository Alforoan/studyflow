import { useState } from "react";
import axios from "axios";
import { Card } from "../types"; // Ensure Card is also imported if it's a separate type

const useGetCards = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<Error | null>(null);

	const getCardsFromBoard = async (boardId: string): Promise<Card[]> => {
		setIsLoading(true);
		setError(null);
		try {
			const response = await axios.get(
				`http://127.0.0.1:5000/api/boards/${boardId}`
			);
			setIsLoading(false);

			const cards: Card[] = response.data;
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
