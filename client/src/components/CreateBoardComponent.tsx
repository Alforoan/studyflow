import React, { useEffect, useState } from "react";
import { Board } from "../types";
import { v4 as uuidv4 } from "uuid";

interface CreateBoardComponentProps {
	handleAddNewBoard: (newBoard: Board) => void;
}

const emptyBoard: Board = {
	name: "new board placeholder",
	cards: [],
	uuid: "",
};

const CreateBoardComponent: React.FC<CreateBoardComponentProps> = ({
	handleAddNewBoard,
}) => {
	const [newBoard, setNewBoard] = useState<Board>(emptyBoard);

	useEffect(() => {
		setNewBoard((prevBoard) => ({
			...prevBoard,
			uuid: uuidv4(),
		}));
	}, []);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setNewBoard((prevBoard) => ({
			...prevBoard,
			name: e.target.value,
		}));
	};
	return (
		<div className="flex flex-row">
			<input
				className="p-2 border rounded mr-2 w-1/2"
				type="text"
				placeholder="Board Name"
				value={newBoard.name}
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
