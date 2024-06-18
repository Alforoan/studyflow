import React, { useEffect } from "react";
import { emptyBoard, sortingAlgorithmBoard } from "../dummyData";
import { Board } from "../types";
import { useState } from "react";
import BoardPreview from "../components/BoardPreview";
import BoardComponent from "../components/BoardComponent";
import { Card } from "../types";
import CreateBoardComponent from "../components/CreateBoardComponent";
import { useAuth0 } from "@auth0/auth0-react";
import usePostNewBoard from "../hooks/usePostNewBoard";

const Home: React.FC = () => {
	const [selectedBoard, setSelectedBoard] = useState<Board | null>(null);
	const [userBoards, setUserBoards] = useState<Board[]>([]);
	const [tileText, setTitleText] = useState("Home");
	const [isAddingNewBoard, setIsAddingNewBoard] = useState(false);
	const { user } = useAuth0();
	const { postNewBoard, error } = usePostNewBoard();

	useEffect(() => {
		// this is where we will fetch all user's boards from the database
		// for now just assign dummyboards to state
		if (userBoards.length == 0) {
			const dummyBoards: Board[] = [emptyBoard, sortingAlgorithmBoard];
			setUserBoards(dummyBoards);
		}
	}, []);

	const handleTitleTextChange = (text: string) => {
		setTitleText(text);
	};

	useEffect(() => {
		if (selectedBoard) {
			handleTitleTextChange(`👈 ${selectedBoard.boardName}`);
		} else {
			handleTitleTextChange("Home");
		}
	}, [selectedBoard]);

	const handleToggleBoardSelect = (board: Board | null) => {
		if (board) {
			if (board.boardId === "0") {
				setIsAddingNewBoard(true);
			} else {
				setSelectedBoard(board);
			}
		} else {
			setSelectedBoard(null);
		}
	};

	// need functions for handleAddCard, handleDeleteCard, handleEditBoardTitle, handleAddBoard, handleDeleteBoard

	const handleAddNewBoard = (newBoard: Board) => {
		setIsAddingNewBoard(false);
		setUserBoards((prevBoards) => [...prevBoards, newBoard]);
		console.log(newBoard.boardId);
		console.log(user?.email ?? "no email here hmm");
		postNewBoard(newBoard);
		console.log("hopefully we posted");
	};

	const handleUpdateCard = (newCard: Card, boardID: string) => {
		// for right now I am just replacing the existing card with the new version to update the cards
		const boardToUpdate = userBoards.find((board) => board.boardId === boardID);

		if (!boardToUpdate) {
			// shouldn't ever happen
			console.log(
				"hmm somehow you tried to save a card in a board that doesn't exist"
			);
			return;
		}

		const index = boardToUpdate.cards!.findIndex(
			(card) => card.cardId === newCard.cardId
		);

		if (index !== -1) {
			boardToUpdate.cards![index] = newCard;
		} else {
			console.log("hmm the card you are updating doesn't exist somehow"); // shouldnt ever happen unless async issues
		}
	};

	return (
		<div className="container w-2/3 mx-auto flex flex-col items-center justify-center">
			<h1
				className="cursor-pointer text-center my-16 text-3xl font-bold font-primary"
				onClick={() => handleToggleBoardSelect(null)}
			>
				{tileText}
			</h1>
			{ error && (
				<h2 className="text-red-500">{error.toString()}</h2>
			)}
			{isAddingNewBoard ? (
				<CreateBoardComponent
					handleAddNewBoard={handleAddNewBoard}
					emptyBoard={emptyBoard}
				/>
			) : (
				<>
					{selectedBoard ? (
						<BoardComponent
							handleUpdateCard={handleUpdateCard}
							handleTitleTextChange={handleTitleTextChange}
							board={selectedBoard}
						/>
					) : (
						<div className="text-center">
							<ul className="flex flex-row flex-wrap gap-4 justify-center">
								{userBoards.map((board) => (
									<li key={board.boardId} className="cursor-pointer">
										<BoardPreview
											handleSelectBoard={handleToggleBoardSelect}
											board={board}
										/>
									</li>
								))}
							</ul>
						</div>
					)}
				</>
			)}
		</div>
	);
};

export default Home;
