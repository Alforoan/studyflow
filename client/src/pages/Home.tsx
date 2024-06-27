import React, { useEffect, useCallback, useContext } from "react";
import { Board } from "../types";
import { useState } from "react";
import BoardPreview from "../components/BoardPreview";
import BoardComponent from "../components/BoardComponent";
import { Card } from "../types";
import CreateBoardComponent from "../components/CreateBoardComponent";
import usePostNewBoard from "../hooks/usePostNewBoard";
import useGetUserBoards from "../hooks/useGetUserBoards";
import EditBoardName from "../components/EditBoardName";
import {
	databaseCards,
	mobileAppCards,
	newCard,
	sortingCards,
	webDevCards,
} from "../dummyData";
import usePostNewCard from "../hooks/usePostNewCard";
import useEditCard from "../hooks/useEditCard";
import useGetCards from "../hooks/useGetCards";
import { v4 as uuidv4 } from "uuid";
import useDeleteCard from "../hooks/useDeleteCard";
import { DeleteBoardContext } from '../context/DeleteBoardContext';

const Home: React.FC = () => {
	const [selectedBoard, setSelectedBoard] = useState<Board | null>(null);
	const [isCardSelected, setIsCardSelected] = useState(false);
	const [userBoards, setUserBoards] = useState<Board[]>([]);
	const [tileText, setTitleText] = useState("Home");
	const [isAddingNewBoard, setIsAddingNewBoard] = useState(false);
  const {currentBoards, setCurrentBoards, currentBoardId} = useContext(DeleteBoardContext);
	const { postNewBoard, error: postBoardError } = usePostNewBoard();
	const { postNewCard } = usePostNewCard();
  //test
	const { getUserBoards } = useGetUserBoards();
	const { editCard} = useEditCard();
	const { getCardsFromBoard } = useGetCards();

	const { deleteCard} = useDeleteCard();

	useEffect(() => {
		const fetchBoards = async () => {
			try {
				if (userBoards.length === 0) {
					console.log("Fetching user's boards from the API");

					const boardsFromAPI = await getUserBoards();
					console.log(`Got ${boardsFromAPI.length} boards from the API`);
					console.log(boardsFromAPI);

					const updatedBoards = await Promise.all(
						boardsFromAPI.map(async (board) => {
							const cardsFromAPI = await getCardsFromBoard(board.uuid);
							const updatedCards = [...cardsFromAPI, newCard];

							return { ...board, cards: updatedCards };
						})
					);
          setCurrentBoards(updatedBoards);
					setUserBoards(updatedBoards);
				}
			} catch (error) {
				console.error("Error fetching boards:", error);
			}
		};

		fetchBoards();
	}, []);

  useEffect(() => {
    const filteredBoards = userBoards.filter(board => board.uuid !== currentBoardId)
    setUserBoards(filteredBoards);
  }, [currentBoards]);

	const handleTitleTextChange = (text: string) => {
		if (!isCardSelected) {
			setTitleText(text);
		}
	};

	const handleSetIsCardSelected = (isSelected: boolean) => {
		setIsCardSelected(isSelected);
	};

	useEffect(() => {
		console.log("UPDATING THE SELECTED BOARD");
		if (selectedBoard) {
			console.log(selectedBoard);
			if (!isCardSelected) {
				handleTitleTextChange(`👈 ${selectedBoard.name}`);
			}

			// now any time you change the selectedBoard state this will update the user boards
			const updatedBoards: Board[] = userBoards.map((board) => {
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
	}, [selectedBoard, isCardSelected]);

	const populateDummyData = () => {
		const dummyCardLists = [
			sortingCards,
			databaseCards,
			webDevCards,
			mobileAppCards,
		];

		const dummyBoardTitles = [
			"Sorting Algorithms",
			"Database Design",
			"Web Development",
			"Mobile App Development",
		];

		dummyCardLists.forEach((list, i) => {
			let uuid1 = uuidv4();
			const dummyBoard: Board = {
				name: dummyBoardTitles[i],
				uuid: uuid1,
				cards: list,
			};
			postNewBoard(dummyBoard);
			dummyBoard.cards?.forEach((card) => {
				postNewCard(card, uuid1);
			});
			dummyBoard.cards?.unshift(newCard);
			setUserBoards((prevBoards) => [...prevBoards, dummyBoard]);
		});
	};

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

	const handleUpdateCard = async (newCard: Card) => {
		if (newCard.id !== "0") {
			if (selectedBoard) {
				await editCard(newCard);
				console.log("UPDATING CARD !!!!!", newCard);
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
		}
	};

	const handleDeleteCard = async (cardToDelete: Card) => {
		if (cardToDelete.id !== "0") {
			if (selectedBoard) {
				deleteCard(cardToDelete);

				let updatedCards: Card[] = selectedBoard.cards!.filter(
					(card) => card.id !== cardToDelete.id
				);
				console.log("CARDS SANS CARDTODELETE", updatedCards);
				const updatedBoard: Board = {
					...selectedBoard,
					cards: updatedCards,
				};

				setSelectedBoard(updatedBoard);
			}
		}
	};

	const handleCancel = useCallback(() => {
		setIsAddingNewBoard(false);
	}, []);

	useEffect(() => {
		console.log("effect");
		const handleKeyPress = (e: KeyboardEvent) => {
			if (e.key === "Escape") handleCancel();
		};
		document.addEventListener("keydown", handleKeyPress);

		return () => {
			document.removeEventListener("keydown", handleKeyPress);
		};
	}, [handleCancel]);

	return (
		<div className="container w-2/3 mx-auto flex flex-col items-center justify-center">
			<h1
				className="cursor-pointer text-center my-16 text-3xl font-bold font-primary"
				onClick={() => handleToggleBoardSelect(null)}
			>
				{tileText}
			</h1>

			{!selectedBoard && !isCardSelected && !isAddingNewBoard && (
				<button
					className=" bg-secondaryElements font-primary text-flair px-4 py-2 mb-4 rounded hover:bg-flair hover:text-secondaryElements"
					onClick={() => populateDummyData()}
				>
					Populate Dummy Data
				</button>
			)}

			{postBoardError && (
				<h2 className="text-red-500">{postBoardError.toString()}</h2>
			)}

			{isAddingNewBoard ? (
				<>
					<CreateBoardComponent
						handleAddNewBoard={handleAddNewBoard}
						handleCancel={handleCancel}
					/>
					{/* I will refactor this as its repeated below */}
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
								handleDeleteCard={handleDeleteCard}
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
