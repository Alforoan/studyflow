import React from "react";
import { Board } from "../types";
import deleteBoardIcon from "../assets/deleteBoard.svg";	

interface BoardPreviewProps {
	board: Board;
	handleSelectBoard: (board: Board | null) => void;
	handleDeleteBoard: (boardId: string) => void;
}



const BoardPreview: React.FC<BoardPreviewProps> = ({
	board,
	handleSelectBoard,
	deleteBoard,
}) => {
	// should show progress bar on this preview
	return (
		<div
			onClick={() => handleSelectBoard(board)}
			className="relative bg-secondaryElements border border-secondaryElements-200 p-4 shadow-sm w-40 h-40 flex-col items-center justify-center rounded"
		>
			<button
				onClick={(e) => {
					e.stopPropagation(); 
					deleteBoard(board.uuid);
				}}
				className="absolute top-1 right-1 text-gray-600 hover:text-gray-800 focus:outline-none"
			>
				<img src={deleteBoardIcon} alt="Delete Board" className="h-5 w-5" />
			</button>
			<h1 className="text-center text-primaryText text-lg font-medium pb-8">
				{board.name}
			</h1>
			<p>Total cards: {board.cards!.length - 1}</p>
		</div>
	);
};

export default BoardPreview;
