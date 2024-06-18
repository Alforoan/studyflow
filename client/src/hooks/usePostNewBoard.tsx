import { useState } from "react";
import axios from "axios";
import { Board } from "../types";
import { useAuth0 } from "@auth0/auth0-react";

const usePostNewBoard = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<Error | null>(null);
	const { user } = useAuth0();

	const postNewBoard = async (board: Board) => {
		setIsLoading(true);
		setError(null);
		try {
			const response = await axios.post("http://127.0.0.1:5000/api/boards", {
        name: board.boardName,
        email: user?.email ?? "something@wentwronghere.com",
      });
			setIsLoading(false);
			return response.data; // Assuming the server responds with the created board object
		} catch (err) {
			if (err instanceof Error) {
				setError(err);
				setIsLoading(false);
			}
		}
	};

	return { postNewBoard, isLoading, error };
};

export default usePostNewBoard;
