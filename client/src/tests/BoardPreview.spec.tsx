import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import BoardPreview from "../components/BoardPreview";
import { DeleteBoardContext } from "../context/DeleteBoardContext";
import { BoardProvider } from "../context/BoardContext";
import { Board, Card, Columns } from "../types";

describe("BoardPreview", () => {
  const mockCard: Card = {
    id: "1",
    cardName: "Card 1",
    column: Columns.backlog,
    order: 0,
    creationDate: new Date(), // Use Date object
    details: { timeEstimate: 60, checklist: [] },
  };

  const mockBoard: Board = {
    uuid: "board-uuid-123",
    name: "Test Board",
    cards: [mockCard],
  };

  const mockHandleSelectBoard = jest.fn();
  const mockSetModalOpen = jest.fn();
  const mockDeleteBoardModal = jest.fn();

  const mockContextValue = {
    deleteBoardModal: mockDeleteBoardModal,
    setModalOpen: mockSetModalOpen,
    handleDeleteBoard: jest.fn(),
    handleDeleteTemplate: jest.fn(),
    currentBoards: [],
    setCurrentBoards: jest.fn(),
    currentBoardId: "board-uuid-123",
  };

  beforeEach(() => {
    render(
      <BoardProvider>
        {" "}
        {/* Wrap with BoardProvider */}
        <DeleteBoardContext.Provider value={mockContextValue}>
          <BoardPreview
            board={mockBoard}
            handleSelectBoard={mockHandleSelectBoard}
          />
        </DeleteBoardContext.Provider>
      </BoardProvider>
    );
  });

  it("renders board name and total cards", () => {
    expect(screen.getByText("Test Board")).toBeInTheDocument();
    const totalCardsText = screen.getByText((content) => {
      return content.startsWith("1 Card");
    });
    expect(totalCardsText).toBeInTheDocument();
  });

  it("calls handleSelectBoard on board preview click", () => {
    const boardPreview = screen.getByText("Test Board");
    boardPreview.click();

    expect(mockHandleSelectBoard).toHaveBeenCalledWith(mockBoard);
  });
});
