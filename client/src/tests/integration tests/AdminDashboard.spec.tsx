// AdminDashboard.spec.tsx
import React from "react";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import AdminDashboard from "../../pages/AdminDashboard";
import { BoardProvider, useBoard } from "../../context/BoardContext";
import { DeleteBoardContext } from "../../context/DeleteBoardContext";

jest.mock("../../context/BoardContext");

describe("AdminDashboard Component", () => {
  beforeEach(() => {
    (useBoard as jest.Mock).mockReturnValue({
      selectedBoard: null,
      setSelectedBoard: jest.fn(),
      selectedCard: null,
      setSelectedCard: jest.fn(),
      userBoards: [],
      setUserBoards: jest.fn(),
      titleText: "Admin Dashboard",
      updateTitleText: jest.fn(),
      isAddingNewBoard: false,
      setIsAddingNewBoard: jest.fn(),
      populateDummyData: jest.fn(),
    });

    // Mock DeleteBoardContext if used within AdminDashboard
    jest.mock("../../context/DeleteBoardContext", () => ({
      DeleteBoardContext: {
        currentBoards: [],
        setCurrentBoards: jest.fn(),
        currentBoardId: "",
        deleteBoardModal: false,
        setModalOpen: jest.fn(),
        handleDeleteBoard: jest.fn(),
        handleDeleteTemplate: jest.fn(),
      },
    }));
  });

  const renderWithProviders = (component: React.ReactElement) => {
    return render(
      <BoardProvider>
        <DeleteBoardContext.Provider value={{ 
          currentBoards: [], 
          setCurrentBoards: jest.fn(), 
          currentBoardId: "", 
          deleteBoardModal: jest.fn(),
          setModalOpen: jest.fn(),
          handleDeleteBoard: jest.fn(),
          handleDeleteTemplate: jest.fn(),
        }}>
          {component}
        </DeleteBoardContext.Provider>
      </BoardProvider>
    );
  };

  it("renders admin dashboard title", () => {
    renderWithProviders(<AdminDashboard />);

    waitFor(() => {
      const titleElement = screen.getByText(/StudyFlow - Admin Dashboard/i);
      expect(titleElement).toBeInTheDocument();
    })
  });

  it("renders populate dummy data button", () => {
    renderWithProviders(<AdminDashboard />);

    waitFor(()=> {
      const populateButton = screen.getByText(/Populate Dummy Data/i);
      expect(populateButton).toBeInTheDocument();
    })
  });

  test("renders create a new board button when no board is selected", () => {
    renderWithProviders(<AdminDashboard />);

    waitFor(() => {
      const createBoardButton = screen.getByText(/Create a new board/i);
      expect(createBoardButton).toBeInTheDocument();
    })
  });

  it("clicking create a new board button shows create board component", () => {
    renderWithProviders(<AdminDashboard />);
    
    waitFor(() => {
      const createBoardButton = screen.getByText(/Create a new board/i);
      fireEvent.click(createBoardButton);
      const createBoardComponent = screen.getByText(/Create Board/i); // Adjust this text according to the actual text in CreateBoardComponent
      expect(createBoardComponent).toBeInTheDocument();
    });
  });
});
