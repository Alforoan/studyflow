import { ReactNode, createContext, useState } from "react";
import Modal from "../components/DeleteModal";
import useDeleteBoard from "../hooks/useDeleteBoard";
import useGetUserBoards from "../hooks/useGetUserBoards";
import { Board } from "../types";

interface DeleteBoardContextType {
	deleteBoardModal: (id: string) => void;
	setModalOpen: (isOpen: boolean) => void;
	handleDeleteBoard: () => void;
	currentBoards: Board[];
	setCurrentBoards: (boards: Board[]) => void;
	currentBoardId: string;
}

const defaultSetCurrentBoards: (boards: Board[]) => void = () => {};

export const DeleteBoardContext = createContext<DeleteBoardContextType>({
	deleteBoardModal: () => {},
	setModalOpen: () => {},
	handleDeleteBoard: () => {},
	currentBoards: [],
	setCurrentBoards: defaultSetCurrentBoards,
	currentBoardId: "",
});

export const DeleteBoardProvider = ({ children }: { children: ReactNode }) => {
	const [isModalOpen, setModalOpen] = useState(false);
	const [currentBoardId, setCurrentBoardId] = useState<string>("");
	const [currentBoards, setCurrentBoards] = useState<Board[]>([]);
	const { getUserBoards } = useGetUserBoards();
	const { deleteBoard } = useDeleteBoard();
	const requestDeleteBoard = (id: string) => {
		setCurrentBoardId(id);
		setModalOpen(true);
	};

	const handleDeleteBoard = async () => {
		await deleteBoard(currentBoardId);
		const newBoards = await getUserBoards();
		setModalOpen(false);
		setCurrentBoards(newBoards);
		console.log({ newBoards });
	};

	const cancelDeleteBoard = () => {
		setModalOpen(false);
	};

	return (
		<DeleteBoardContext.Provider
			value={{
				deleteBoardModal: requestDeleteBoard,
				setModalOpen,
				handleDeleteBoard,
				currentBoards,
				setCurrentBoards,
				currentBoardId,
			}}
		>
			{children}
			{isModalOpen && (
				<Modal
					isOpen={isModalOpen}
					onClose={cancelDeleteBoard}
					onDelete={handleDeleteBoard}
					message={"This will delete all cards and the board. Are you sure?"}
				/>
			)}
		</DeleteBoardContext.Provider>
	);
};
