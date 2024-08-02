// CreateCardComponent.spec.tsx
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import CreateCardComponent from "../components/CreateCardComponent";import { useBoard, BoardProvider } from "../context/BoardContext";import { validateTextInput } from "../utils/inputUtils";

jest.mock("../context/BoardContext");

describe("CreateCardComponent", () => {
  beforeEach(() => {
    // Reset all mocks before each test
    jest.clearAllMocks();

    // Mock the return values from useBoard
    (useBoard as jest.Mock).mockReturnValue({
      handleAddNewBoard: jest.fn(),
      userBoards: [],
      setIsToastSuccess: jest.fn(),
    });
  });

  it("should sanitize and validate card name input", () => {
    render(
      <BoardProvider>
        <CreateCardComponent />
      </BoardProvider>
    );

    waitFor(() => {
      const cardNameInput = screen.getByLabelText("Card Name:");
      const rawCardName = "<script>alert('XSS');</script>New Card";
      fireEvent.change(cardNameInput, { target: { value: rawCardName } });

      const createCardButton = screen.getByText("Create Card");
      fireEvent.click(createCardButton);

      // Use the utility function to sanitize the input
      const sanitizedCardName = validateTextInput(rawCardName);

      // Assert that the sanitized card name is displayed and no script tags are present
      // Ensure that the potentially harmful script tag is not rendered
      expect(screen.queryByText("XSS")).toBeNull();

      // Check that the sanitized name is correctly displayed
      expect(screen.getByText(sanitizedCardName || "")).toBeInTheDocument();
    });
  });

  it("renders CreateCardComponent", () => {
    render(
      <BoardProvider>
        <CreateCardComponent />
      </BoardProvider>
    );

    // Check create card component renders
    waitFor(() => {
      const cardNameInput = screen.getByLabelText("Card Name:");
      expect(cardNameInput).toBeInTheDocument();
    });
  });

  it("updates card name input field", () => {
    render(
      <BoardProvider>
        <CreateCardComponent />
      </BoardProvider>
    );

    // Check for update card name input field
    waitFor(() => {
      const cardNameInput = screen.getByLabelText("Card Name:");
      const newCardName = "New Test Card";
      fireEvent.change(cardNameInput, { target: { value: newCardName } });
      expect(cardNameInput).toHaveValue(newCardName);
    });
  });

  it("displays error message on submitting with empty card name", () => {
    render(
      <BoardProvider>
        <CreateCardComponent />
      </BoardProvider>
    );

    // Check for error message
    waitFor(() => {
      const createCardButton = screen.getByText("Create Card");
      fireEvent.click(createCardButton);

      const errorMessage = screen.getByText("Please name your card.");
      expect(errorMessage).toBeInTheDocument();
    });
  });

  it("renders Add a checklist item input field", () => {
    render(
      <BoardProvider>
        <CreateCardComponent />
      </BoardProvider>
    );

    // Check for checklist item input field
    waitFor(() => {
      const checklistInput = screen.getByPlaceholderText("Add checklist item");
      expect(checklistInput).toBeInTheDocument();
    });
  });
});
