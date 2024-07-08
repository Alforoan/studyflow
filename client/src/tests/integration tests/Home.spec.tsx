// Home.spec.tsx
// import React from "react";
// import { render, screen, fireEvent, waitFor } from "@testing-library/react";
// import Home from "../../pages/Home";
// import { BoardProvider, useBoard } from "../../context/BoardContext";
// import { DeleteBoardContext } from "../../context/DeleteBoardContext";
// import { useAuth } from "../../context/AuthContext";
// import { useTemplates } from "../../context/TemplateContext";
// import { useGetCards, useGetBoards } from "../../hooks/useAPI";

// //setup mocks
// jest.mock("../../context/BoardContext");
// jest.mock("../../context/AuthContext");
// jest.mock("../../context/TemplateContext");
// jest.mock("../../hooks/useAPI");

// jest.mock("react-toastify/dist/ReactToastify.css", () => {
//   return {};
// });

// const mockUseBoard = useBoard as jest.Mock;
// const mockUseAuth = useAuth as jest.Mock;
// const mockUseTemplates = useTemplates as jest.Mock;
// const mockUseGetCards = useGetCards as jest.Mock;
// const mockUseGetBoards = useGetBoards as jest.Mock;

// const renderWithProviders = (component: React.ReactElement) => {
//   return render(
//     <BoardProvider>
//       <DeleteBoardContext.Provider
//         value={{
//           currentBoards: [],
//           setCurrentBoards: jest.fn(),
//           currentBoardId: "",
//           deleteBoardModal: jest.fn(),
//           setModalOpen: jest.fn(),
//           handleDeleteBoard: jest.fn(),
//           handleDeleteTemplate: jest.fn(),
//         }}
//       >
//         {component}
//       </DeleteBoardContext.Provider>
//     </BoardProvider>
//   );
// };

describe("Home Component", () => {
  test("random test", () => {
    console.log("hi there");
  });
  // beforeEach(() => {
  //   mockUseBoard.mockReturnValue({
  //     selectedBoard: null,
  //     setSelectedBoard: jest.fn(),
  //     selectedCard: null,
  //     userBoards: [],
  //     setUserBoards: jest.fn(),
  //     updateTitleText: jest.fn(),
  //     isAddingNewBoard: false,
  //     setIsAddingNewBoard: jest.fn(),
  //     populateDummyData: jest.fn(),
  //     isToastSuccess: "",
  //     searchInput: "",
  //     setSearchInput: jest.fn(),
  //     searchedBoards: [],
  //     setSearchedBoards: jest.fn(),
  //     setIsSearching: jest.fn(),
  //     isSearching: false,
  //   });

  //   mockUseAuth.mockReturnValue({
  //     token: "test-token",
  //     isAdmin: true,
  //   });

  //   mockUseTemplates.mockReturnValue({
  //     isTemplate: false,
  //     uploadedTemplateNames: [],
  //   });

  //   mockUseGetCards.mockReturnValue({
  //     getCards: jest.fn().mockResolvedValue([]),
  //   });

  //   mockUseGetBoards.mockReturnValue({
  //     getBoards: jest.fn().mockResolvedValue([]),
  //   });
  // });

  // test("renders home component title", () => {
  //   renderWithProviders(<Home />);

  //   waitFor(() => {
  //     const titleElement = screen.getByText(/StudyFlow - Your Personalized Learning Dashboard/i);
  //     expect(titleElement).toBeInTheDocument();
  //   })
  // });

  // test("renders create a new board button when no board is selected", () => {
  //   renderWithProviders(<Home />);

  //   waitFor(()=> {
  //     const createBoardButton = screen.getByText(/Create Board/i);
  //     expect(createBoardButton).toBeInTheDocument();
  //   })
  // });

  // test("clicking create a new board button shows create board component", () => {
  //   renderWithProviders(<Home />);

    
  //   waitFor(() => {
  //     const createBoardButton = screen.getByText(/Create Board/i);
  //     fireEvent.click(createBoardButton);
  //     const createBoardComponent = screen.getByText(/Create Board/i); // Adjust this text according to the actual text in CreateBoardComponent
  //     expect(createBoardComponent).toBeInTheDocument();
  //   });
  // });

  // test("renders populate dummy data button when user is admin", () => {
  //   renderWithProviders(<Home />);

  //   waitFor(() => {
  //     const populateButton = screen.getByText(/Populate Dummy Data/i);
  //     expect(populateButton).toBeInTheDocument();
  //   })
  // });

  // test("clicking populate dummy data button calls populateDummyData function", () => {
  //   renderWithProviders(<Home />);

    
  //   waitFor(() => {
  //     const populateButton = screen.getByText(/Populate Dummy Data/i);
  //     fireEvent.click(populateButton);
  //     expect(useBoard().populateDummyData).toHaveBeenCalled();
  //   });
  // });

  // test("renders search input field", () => {
  //   renderWithProviders(<Home />);

  //   waitFor(() => {
  //     const searchInput = screen.getByPlaceholderText(/Search for boards/i);
  //     expect(searchInput).toBeInTheDocument();
  //   })
  // });

  // test("renders toast container", () => {
  //   renderWithProviders(<Home />);

  //   waitFor(() => {
  //     const toastContainer = screen.getByText(/close/i);
  //     expect(toastContainer).toBeInTheDocument();
  //   })
  // });
});
