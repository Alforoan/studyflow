// BoardPreview.spec.tsx
// import { render, screen } from "@testing-library/react";
// import '@testing-library/jest-dom';
// import BoardPreview from "../components/BoardPreview";
// import { DeleteBoardContext } from "../context/DeleteBoardContext";
// import { Board, Card, Columns } from "../types";

describe("BoardPreview", () => {

  test("random test", () => {
    console.log("hi there");
  }); 

  // const mockCard: Card = {
  //   id: "1",
  //   cardName: "Card 1",
  //   column: Columns.backlog,
  //   order: 0,
  //   creationDate: new Date(), // Use Date object
  //   details: { timeEstimate: 60, checklist: [] }
  // };

  // const mockBoard: Board = {
  //   uuid: "board-uuid-123",
  //   name: "Test Board",
  //   cards: [mockCard],
  // };

  // const mockHandleSelectBoard = jest.fn();
  // const mockSetModalOpen = jest.fn();
  // const mockDeleteBoardModal = jest.fn();

  // const mockContextValue = {
  //   deleteBoardModal: mockDeleteBoardModal,
  //   setModalOpen: mockSetModalOpen,
  //   handleDeleteBoard: jest.fn(),
  //   currentBoards: [],
  //   setCurrentBoards: jest.fn(),
  //   currentBoardId: "board-uuid-123"
  // };

  // beforeEach(() => {
  //   render(
  //     <DeleteBoardContext.Provider value={mockContextValue}>
  //       <BoardPreview board={mockBoard} handleSelectBoard={mockHandleSelectBoard} />
  //     </DeleteBoardContext.Provider>
  //   );
  // });

  // it("renders board name and total cards", () => {
  //   expect(screen.getByText("Test Board")).toBeInTheDocument();
  //   const totalCardsText = screen.getByText((content) => {
  //     return content.startsWith("Total cards:");
  //   });
  //   expect(totalCardsText).toBeInTheDocument();
  // });

  // it("calls handleSelectBoard on board preview click", () => {
  //   const boardPreview = screen.getByText("Test Board");
  //   boardPreview.click();

  //   expect(mockHandleSelectBoard).toHaveBeenCalledWith(mockBoard);
  // });
});
