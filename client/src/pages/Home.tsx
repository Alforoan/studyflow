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
import { newCard } from "../dummyData";
import usePostNewCard from "../hooks/usePostNewCard";
import useEditCard from "../hooks/useEditCard";

const Home: React.FC = () => {
	const [selectedBoard, setSelectedBoard] = useState<Board | null>(null);
	const [isCardSelected, setIsCardSelected] = useState(false);
	const [userBoards, setUserBoards] = useState<Board[]>([]);
	const [tileText, setTitleText] = useState("Home");
	const [isAddingNewBoard, setIsAddingNewBoard] = useState(false);
	const { postNewBoard, error: postBoardError } = usePostNewBoard();
	const { postNewCard, error: postCardError } = usePostNewCard();

	const { getUserBoards } = useGetUserBoards();
	const { editCard, error: putCardError } = useEditCard();

	useEffect(() => {
		// this is where we will fetch all user's boards from the database
		const fetchBoards = async () => {
			if (userBoards.length === 0) {
				console.log("Fetching user's boards from the api");

				const boardsFromAPI = await getUserBoards();
				console.log(`got ${boardsFromAPI.length} boards from the api`);
				console.log(boardsFromAPI);
				// const dummyBoards: Board[] = [emptyBoard, sortingAlgorithmBoard];
				boardsFromAPI.forEach((board) => {
					board.cards?.unshift(newCard);
				});
				setUserBoards(boardsFromAPI);
			}
		};
		fetchBoards();
	}, []);

	const handleTitleTextChange = (text: string) => {
		setTitleText(text);
	};

	const handleSetIsCardSelected = (isSelected: boolean) => {
		setIsCardSelected(isSelected);
	};

	useEffect(() => {
		console.log("UPDATING THE SELECTED BOARD");
		if (selectedBoard) {
			console.log(selectedBoard);
			handleTitleTextChange(`👈 ${selectedBoard.name}`);

			// now any time you change the selectedBoard state this will update the user boards
			const updatedBoards: Board[] = userBoards.map((board, i) => {
				if (board.uuid === selectedBoard.uuid) {
					return selectedBoard;
				} else {
					return board;
				}
			});
			setUserBoards(updatedBoards);
			console.log(userBoards);
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

	const handleAddNewBoard = async (newBoard: Board) => {
		setIsAddingNewBoard(false);
		newBoard.cards = [newCard];
		postNewBoard(newBoard);
		setUserBoards((prevBoards) => [...prevBoards, newBoard]);
		setSelectedBoard(newBoard);
		console.log(newBoard);
	};

	const handlePostNewCard = (newCard: Card) => {
		console.log(newCard.cardName);
		postNewCard(newCard, selectedBoard!.uuid!);
		let updatedBoard = selectedBoard;
		if (updatedBoard && updatedBoard.cards) {
			updatedBoard.cards.push(newCard);
		}

		setSelectedBoard(updatedBoard);
	};

	const handleUpdateCard = (newCard: Card) => {
		if (selectedBoard) {
			editCard(newCard);
			let updatedCards: Card[] = selectedBoard.cards!.map((card) => {
				if (card.id === newCard.id) {
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

			{postBoardError && (
				<h2 className="text-red-500">{postBoardError.toString()}</h2>
			)}

			{isAddingNewBoard ? (
				<CreateBoardComponent handleAddNewBoard={handleAddNewBoard} />
			) : (
				// EVENTUALLY WE SHOULD ORGANIZE THIS INTO 2 COMPONENETS
				// BoardComponent (has EditBoardName and CreateBoardComponent in it)
				// BoardGridComponent (has the grid below in it)
				<>
					{selectedBoard ? (
						<>
							{!isCardSelected && (
								<EditBoardName
									board={selectedBoard}
									onSuccess={(updatedName: string) => {
										setSelectedBoard((prevBoard) => {
											if (prevBoard) {
												return { ...prevBoard, name: updatedName };
											}
											return prevBoard;
										});
									}}
								/>
							)}

							<BoardComponent
								handleUpdateCard={handleUpdateCard}
								handleTitleTextChange={handleTitleTextChange}
								board={selectedBoard}
								handlePostNewCard={handlePostNewCard}
								handleSetIsCardSelected={handleSetIsCardSelected}
							/>
						</>
					) : (
						<>
							<button
								className=" bg-flair font-primary text-secondaryElements px-4 py-2 mb-4 rounded hover:text-white"
								onClick={() => setIsAddingNewBoard((prev) => !prev)}
							>
								Create a new board
							</button>
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
						</>
					)}
				</>
			)}
		</div>
	);
};

export default Home;
