import React from "react";
import { Board } from "../types";

interface BoardPreviewProps {
	board: Board;
	handleSelectBoard: (board: Board | null) => void;
}

const BoardPreview: React.FC<BoardPreviewProps> = ({
	board,
	handleSelectBoard,
}) => {
	// should show progress bar on this preview
	return (
		<div
			onClick={() => handleSelectBoard(board)}
			className="bg-secondaryElements border border-secondaryElements-200 p-4 shadow-sm w-40 h-40 flex-col items-center justify-center rounded"
		>
			<h1 className="text-center text-primaryText text-lg font-medium pb-8">
				{board.boardName}
				{/* {board.name} */}
			</h1>
			<p>Total cards: {board.cards?.length ?? 0}</p>
		</div>
	);
};

export default BoardPreview;
