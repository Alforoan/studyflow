// CreateBoardComponent.spec.tsx
import { render, screen, fireEvent } from "@testing-library/react";
import CreateBoardComponent from "../components/CreateBoardComponent";
import { useBoard, } from "../context/BoardContext";

jest.mock("../context/BoardContext");

describe("CreateBoardComponent", () => {
  beforeEach(() => {
    (useBoard as jest.Mock).mockReturnValue({
      handleAddNewBoard: jest.fn(),
      userBoards: [],
      setIsToastSuccess: jest.fn(),
    });
  });

  it("handles board creation correctly", () => {
    const mockHandleCancel = jest.fn();

    render(<CreateBoardComponent handleCancel={mockHandleCancel} />);

    const input = screen.getByPlaceholderText("Board Name");
    fireEvent.change(input, { target: { value: "New Board" } });

    const createButton = screen.getByText("Create Board");
    fireEvent.click(createButton);

    // Check that new board was created
    expect(input).toHaveValue("New Board");
    expect(useBoard().handleAddNewBoard).toHaveBeenCalledWith(
      expect.objectContaining({ name: "New Board" })
    );
  });

  it("displays an error message when board name is empty", () => {
    const mockHandleCancel = jest.fn();

    render(<CreateBoardComponent handleCancel={mockHandleCancel} />);

    const createButton = screen.getByText("Create Board");
    fireEvent.click(createButton);

    const errorMessage = screen.getByText("Please name your board.");

    // Check for error message
    expect(errorMessage).toBeInTheDocument();
  });

  it("displays an error message when board name already exists", () => {
    const mockHandleCancel = jest.fn();

    // Mock existing boards
    (useBoard as jest.Mock).mockReturnValue({
      handleAddNewBoard: jest.fn(),
      userBoards: [{ name: "Existing Board", uuid: "12345" }],
      setIsToastSuccess: jest.fn(),
    });

    render(<CreateBoardComponent handleCancel={mockHandleCancel} />);

    const input = screen.getByPlaceholderText("Board Name");
    fireEvent.change(input, { target: { value: "Existing Board" } });

    const createButton = screen.getByText("Create Board");
    fireEvent.click(createButton);

    const errorMessage = screen.getByText("Board name already exists. Please choose another.");

    // Check for error message
    expect(errorMessage).toBeInTheDocument();
  });
});