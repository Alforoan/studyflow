import React from "react";
import { Card } from "../types";

interface CardPreviewProps {
	card: Card;
}

const CardItem: React.FC<CardPreviewProps> = ({ card }) => {
	return (
		<div className="bg-secondaryElements border border-secondaryElements-200 p-4 shadow-sm w-40 h-40 flex items-center justify-center rounded">
			<h1 className="text-center text-primaryText text-lg font-medium">
				{card.cardName} : {card.column}
			</h1>
		</div>
	);
};

export default CardItem;
