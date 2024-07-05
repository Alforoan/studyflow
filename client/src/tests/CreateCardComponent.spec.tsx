// CreateCardComponent.spec.tsx
// import { render, screen, fireEvent } from "@testing-library/react";
// import CreateCardComponent from "../components/CreateCardComponent";
// import { useBoard } from "../context/BoardContext";

// jest.mock("../context/BoardContext");

describe("CreateCardComponent", () => {

  test("random test", () => {
    console.log("hi there");
  }); 


  // beforeEach(() => {
  //   // Reset all mocks before each test
  //   jest.clearAllMocks();

  //   // Mock the return values from useBoard
  //   (useBoard as jest.Mock).mockReturnValue({
  //     selectedBoard: {
  //       cards: [],
  //     },
  //     handlePostNewCard: jest.fn(),
  //     setSelectedCard: jest.fn(),
  //     setIsToastSuccess: jest.fn(),
  //   });
  // });

  // it("renders CreateCardComponent", () => {
  //   render(<CreateCardComponent />);

  //   const cardNameInput = screen.getByLabelText("Card Name:");
  //   expect(cardNameInput).toBeInTheDocument();
  // });

  // it("updates card name input field", () => {
  //   render(<CreateCardComponent />);

  //   const cardNameInput = screen.getByLabelText("Card Name:");

  //   const newCardName = "New Test Card";
  //   fireEvent.change(cardNameInput, { target: { value: newCardName } });

  //   expect(cardNameInput).toHaveValue(newCardName);
  // });

  // it("displays error message on submitting with empty card name", () => {
  //   render(<CreateCardComponent />);

  //   const createCardButton = screen.getByText("Create Card");
  //   fireEvent.click(createCardButton);

  //   const errorMessage = screen.getByText("Please name your card.");
  //   expect(errorMessage).toBeInTheDocument();
  // });

  // it("renders Add a checklist item input field", () => {
  //   render(<CreateCardComponent />);

  //   const checklistInput = screen.getByPlaceholderText("Add checklist item");

  //   expect(checklistInput).toBeInTheDocument();
  // });
});
