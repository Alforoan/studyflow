import React, { useEffect, useState } from "react";
import { Board } from "../types";
import { v4 as uuidv4 } from "uuid";

interface CreateBoardComponentProps {
	handleAddNewBoard: (newBoard: Board) => void;
	emptyBoard: Board;
}

const CreateBoardComponent: React.FC<CreateBoardComponentProps> = ({
	handleAddNewBoard,
	emptyBoard,
}) => {
	const [newBoard, setNewBoard] = useState<Board>(emptyBoard);

	useEffect(() => {
		setNewBoard((prevBoard) => ({
			...prevBoard,
			boardId: uuidv4(),
		}));
	}, []);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setNewBoard((prevBoard) => ({
			...prevBoard,
			boardName: e.target.value,
		}));
	};
	return (
		<div className="flex flex-row">
			<input
				className="p-2 border rounded mr-2 w-1/2"
				type="text"
				placeholder="Board Name"
				value={newBoard.boardName}
				onChange={handleChange}
			/>
			<button
				className="border rounded p-2 w-1/2"
				onClick={() => handleAddNewBoard(newBoard)}
			>
				Create New Board
			</button>
		</div>
	);
};

export default CreateBoardComponent;
