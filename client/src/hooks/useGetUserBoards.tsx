import { useState } from "react";
import axios from "axios";
import { Board } from "../types"; // Ensure Card is also imported if it's a separate type
import { useAuth0 } from "@auth0/auth0-react";

const useGetUserBoards = () => {
	const [isLoading, setIsNewBoard] = useState(false);
	const [error, setError] = useState<Error | null>(null);
	const { user } = useAuth0();

	const getUserBoards = async (): Promise<Board[]> => {
		setIsNewBoard(true);
		setError(null);
		try {
			const response = await axios.get("http://127.0.0.1:5000/api/boards", {
				params: { email: user?.email ?? "something@wentwronghere.com" },
			});
			setIsNewBoard(false);
			const boards: Board[] = response.data.map((board: Board) => ({
				...board,
				cards: [],
			}));
			return boards;
		} catch (err) {
			if (err instanceof Error) {
				setError(err);
				setIsNewBoard(false);
			}
			return [];
		}
	};

	return { getUserBoards, isLoading, error };
};

export default useGetUserBoards;
