import { useState, useEffect } from "react";
import axios from "axios";
import { Card } from "../types";

const useEditCard = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<Error | null>(null);

	const editCard = async (card: Card) => {
		setIsLoading(true);
		setError(null);

		const detailsStr = JSON.stringify(card.details);
		const column = "backlog";
		try {
			const response = await axios.put(
				`http://127.0.0.1:5000/api/cards/${card.id}`,
				{
					cardName: card.cardName,
					creationDate: card.creationDate.toISOString(),
					order: card.order,
					column:
						card.column === null || card.column === undefined
							? column
							: card.column,
					details: detailsStr,
				}
			);
			setIsLoading(false);
			console.log(`put response ${response}`);
			return response.data;
		} catch (err) {
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