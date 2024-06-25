import { useState, useEffect } from "react";
import axios from "axios";
import { Card } from "../types";

const useDeleteCard = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<Error | null>(null);

	const deleteCard = async (card: Card) => {
		setIsLoading(true);
		setError(null);
		try {
			const response = await axios.delete(
				`http://127.0.0.1:5000/api/cards/${card.id}`
			);
			setIsLoading(false);
			console.log(`delete response ${response}`);
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

	return { deleteCard, isLoading, error };
};

export default useDeleteCard;
