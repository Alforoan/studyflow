import React, { useEffect } from "react";
import { Board } from "../types";
import { useState } from "react";
import BoardPreview from "../components/BoardPreview";
import BoardComponent from "../components/BoardComponent";
import { Card } from "../types";
import CreateBoardComponent from "../components/CreateBoardComponent";
import usePostNewBoard from "../hooks/usePostNewBoard";
import useGetUserBoards from "../hooks/useGetUserBoards";
import EditBoardName from "../components/EditBoardName";

const Home: React.FC = () => {
	const [selectedBoard, setSelectedBoard] = useState<Board | null>(null);
	const [userBoards, setUserBoards] = useState<Board[]>([]);
	const [tileText, setTitleText] = useState("Home");
	const [isAddingNewBoard, setIsAddingNewBoard] = useState(false);
	const { postNewBoard, error: postBoardError } = usePostNewBoard();

	const { getUserBoards } = useGetUserBoards();

	useEffect(() => {
		// this is where we will fetch all user's boards from the database
		const fetchBoards = async () => {
			if (userBoards.length === 0) {
				console.log("Fetching user's boards from the api");

				const boardsFromAPI = await getUserBoards();
				console.log(`got ${boardsFromAPI.length} boards from the api`);
				console.log(boardsFromAPI);
				// const dummyBoards: Board[] = [emptyBoard, sortingAlgorithmBoard];
				setUserBoards(boardsFromAPI);
			}
		};
		fetchBoards();
	}, []);

	const handleTitleTextChange = (text: string) => {
		setTitleText(text);
	};

	useEffect(() => {
		if (selectedBoard) {
			console.log(selectedBoard);
			handleTitleTextChange(`👈 ${selectedBoard.name}`);

			// now any time you change the selectedBoard state this will update the user boards
			const updatedBoards: Board[] = userBoards.map((board, i) => {
				if (board.name === selectedBoard.name) {
					return selectedBoard;
				} else {
					return board;
				}
			});
			setUserBoards(updatedBoards);
		} else {
			handleTitleTextChange("Home");
		}
	}, [selectedBoard]);

	const handleToggleBoardSelect = (board: Board | null) => {
		if (board) {
			if (board.name === "Add New Board") {
				setIsAddingNewBoard(true);
			} else {
				setSelectedBoard(board);
			}
		} else {
			setSelectedBoard(null);
		}
	};

	// need functions for handleAddCard, handleDeleteCard, handleEditBoardTitle, handleAddBoard, handleDeleteBoard

	const handleAddNewBoard = async (newBoard: Board) => {
		setIsAddingNewBoard(false);
		postNewBoard(newBoard);
		setUserBoards((prevBoards) => [...prevBoards, newBoard]);
		setSelectedBoard(newBoard);
		console.log(newBoard);
	};

	const handleUpdateCard = (newCard: Card) => {
		if (selectedBoard) {
			console.log(`We need to now save the changes to ${selectedBoard.name}`);
			let updatedCards: Card[] = selectedBoard.cards!.map((card) => {
				if (card.cardId === newCard.cardId) {
					return newCard;
				} else {
					return card;
				}
			});
			console.log(updatedCards);
			const updatedBoard: Board = {
				...selectedBoard,
				cards: updatedCards,
			};

			setSelectedBoard(updatedBoard);
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
			{selectedBoard && (
				<EditBoardName
					board={selectedBoard}
					onSuccess={(updatedName: string) => {
						setSelectedBoard((prevBoard) => {
							if (prevBoard) {
								return { ...prevBoard, boardName: updatedName };
							}
							return prevBoard;
						});
						handleTitleTextChange(`👈 ${updatedName}`);
					}}
				/>
			)}
			{postBoardError && (
				<h2 className="text-red-500">{postBoardError.toString()}</h2>
			)}
			<button onClick={() => setIsAddingNewBoard((prev) => !prev)}>
				Create a new board
			</button>
			{isAddingNewBoard ? (
				<CreateBoardComponent handleAddNewBoard={handleAddNewBoard} />
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
								{userBoards.map((board, i) => (
									<li key={i} className="cursor-pointer">
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
