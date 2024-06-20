// EditBoardName.tsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Board } from "../types";

interface EditBoardNameProps {
	board: Board;
	onSuccess?: (updatedName: string) => void; // callback for successful name updates
	onCancel?: () => void; // callback for cancel of edit board name
}

const EditBoardName: React.FC<EditBoardNameProps> = ({ board, onSuccess }) => {
	const [newName, setNewName] = useState(board.name);
	const [isEditing, setIsEditing] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [isLoading, setIsLoading] = useState(false);
	const [originalName, setOriginalName] = useState(board.name); // holds the most recent saved name

	useEffect(() => {
		setNewName(board.name); // sync with board name when in edit mode
		setOriginalName(board.name); // Initialize originalName with the board's current name
	}, [board.name]);

	const handleEditClick = () => {
		setIsEditing(true);
	};

	const handleCancel = () => {
		setIsEditing(false);
		setNewName(originalName); // Revert to the most recently saved board name in case of cancel
	};

	const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setNewName(event.target.value);
		setError(null); // Clear error when user starts typing
	};

	const handleSubmit = async () => {
		if (!newName.trim()) {
			setError("Please name your board.");
			return;
		}

		if (newName.length > 30) {
			setError("Board name must be 30 characters or less.");
			return;
		}

		setIsLoading(true);
		setError(null);

		try {
			const response = await axios.put(
				`http://127.0.0.1:5000/api/boards/${board.uuid}`,
				{ name: newName }
			);

			console.log("Board name changed successfully:", response.data);

			setIsLoading(false);
			setIsEditing(false); // Exit editing mode after successful save
			setOriginalName(newName); // Update originalName with the new name
			if (onSuccess) onSuccess(newName); // Call onSuccess callback
		} catch (err) {
			if (axios.isAxiosError(err)) {
				if (err.response?.status === 400) {
					setError("Board name already exists, please try another.");
				} else {
					setError("Failed to update board name. Please try again later.");
				}
			} else {
				console.log("Network error.");
			}
			setIsLoading(false);
		}
	};

	return (
		<div>
			{!isEditing ? (
				<button
					onClick={handleEditClick}
					className="bg-secondaryElements text-primaryText px-4 py-2 rounded font-primary hover:text-primaryTextLighter"
				>
					Edit
				</button>
			) : (
				<div>
					<input
						type="text"
						value={newName}
						onChange={handleInputChange}
						onKeyDown={(e) => {
							if (e.key === "Enter") {
								handleSubmit();
							}
						}}
						className="border border-gray-300 font-primary rounded px-2 py-1 mb-2"
						maxLength={30}
					/>
					<button
						onClick={handleSubmit}
						disabled={isLoading}
						className="ml-2 bg-secondaryElements font-primary text-primaryText px-4 py-2 rounded hover:text-primaryTextLighter"
					>
						{isLoading ? "Saving..." : "Save"}
					</button>
					<button
						onClick={handleCancel}
						className="ml-2 bg-secondaryElements font-primary text-primaryText px-4 py-2 rounded hover:text-primaryTextLighter"
					>
						Cancel
					</button>
					{error && <p className="text-red-500 mt-2">{error}</p>}
				</div>
			)}
		</div>
	);
};

export default EditBoardName;
