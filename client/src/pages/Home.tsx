import React from "react";
import { anotherDummyBoard, sortingAlgorithmBoard } from "../dummyData";
import { Board } from "../types";
import { useState } from "react";
import BoardPreview from "../components/BoardPreview";
import BoardComponent from "../components/BoardComponent";

const Home: React.FC = () => {
	const [selectedBoard, setSelectedBoard] = useState<Board | null>(null);

	const dummyBoards: Board[] = [sortingAlgorithmBoard, anotherDummyBoard];

	const handleSelectBoard = (board: Board) => {
		setSelectedBoard(board);
	};

	const clearSelectedBoard = () => {
		setSelectedBoard(null);
	};

	return (
		<div className="container w-2/3 mx-auto flex flex-col items-center justify-center">
			<h1
				className="cursor-pointer text-center my-16 text-3xl font-bold font-primary"
				onClick={() => clearSelectedBoard()}
			>
				Home
			</h1>

			{selectedBoard ? (
				// <ul className="flex flex-row flex-wrap gap-4 justify-center">
				// 	{selectedBoard!.cards!.map((card) => (
				// 		<li key={card.cardId}>
				// 			<CardItem card={card} />
				// 		</li>
				// 	))}
				// </ul>
				<BoardComponent board={selectedBoard} />
			) : (
				<div className="text-center">
					<p className="text-xl pb-16">Select a board...</p>
					<ul className="flex flex-row flex-wrap gap-4 justify-center">
						{dummyBoards.map((board) => (
							<li key={board.boardId} className="cursor-pointer">
								<BoardPreview
									handleSelectBoard={handleSelectBoard}
									board={board}
								/>
							</li>
						))}
					</ul>
				</div>
			)}
		</div>
	);
};

export default Home;
