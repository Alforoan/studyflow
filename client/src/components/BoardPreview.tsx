import React from "react";
import { Board } from "../types";

interface BoardPreviewProps {
	board: Board;
}

const BoardPreview: React.FC<BoardPreviewProps> = ({ board }) => {
	return (
		<div className="bg-secondaryElements border border-secondaryElements-200 p-4 shadow-sm w-40 h-40 flex-col  items-center justify-center rounded">
			<h1 className="text-center text-primaryText text-lg font-medium pb-8">
				{board.boardName}
			</h1>
			<p>Total cards: {board.cards?.length ?? 0}</p>
		</div>
	);
};

export default BoardPreview;
