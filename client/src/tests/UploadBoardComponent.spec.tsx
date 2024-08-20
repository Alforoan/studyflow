import { render, fireEvent, screen } from "@testing-library/react";
import UploadBoardComponent from "../components/UploadBoardComponent";
import { useBoard } from "../context/BoardContext";
import { useTemplates } from "../context/TemplateContext";
import { Columns } from "../types";
import { MemoryRouter } from "react-router-dom";

// Mock useBoard and useTemplates hooks
jest.mock("../context/BoardContext", () => ({
  useBoard: jest.fn(),
}));
jest.mock("../context/TemplateContext", () => ({
  useTemplates: jest.fn(),
}));

describe("UploadBoardComponent", () => {
  beforeEach(() => {
    // Mock return values for useBoard
    (useBoard as jest.Mock).mockReturnValue({
      selectedBoard: {
        uuid: "test-uuid",
        name: "Test Board",
        cards: [
          { id: "1", column: Columns.backlog, order: 1 },
          { id: "2", column: Columns.inProgress, order: 1 },
          { id: "3", column: Columns.completed, order: 1 },
        ],
      },
      setIsToastSuccess: jest.fn(),
      setSelectedBoard: jest.fn(),
    });

    // Mock return values for useTemplates
    (useTemplates as jest.Mock).mockReturnValue({
      handleUploadNewTemplate: jest.fn(),
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders the upload button when isEditingTitle is false", () => {
    render(
      <MemoryRouter>
        <UploadBoardComponent isEditingTitle={false} />
      </MemoryRouter>
    );

    // Check if the upload button is rendered
    const uploadButton = screen.getByLabelText("Upload Template Button");
    expect(uploadButton).toBeInTheDocument();
  });

  it("does not render the upload button when isEditingTitle is true", () => {
    render(
      <MemoryRouter>
        <UploadBoardComponent isEditingTitle={true} />
      </MemoryRouter>
    );

    // Check if the upload button is not rendered
    const uploadButton = screen.queryByLabelText("Upload Template Button");
    expect(uploadButton).toBeNull();
  });

  it("handles click event and uploads board", () => {
    const setIsToastSuccess = jest.fn();
    const setSelectedBoard = jest.fn();
    const handleUploadNewTemplate = jest.fn();

    (useBoard as jest.Mock).mockReturnValue({
      selectedBoard: {
        uuid: "test-uuid",
        name: "Test Board",
        cards: [
          { id: "1", column: Columns.backlog, order: 1 },
          { id: "2", column: Columns.inProgress, order: 1 },
          { id: "3", column: Columns.completed, order: 1 },
        ],
      },
      setIsToastSuccess,
      setSelectedBoard, // Ensure this is a mock function
    });

    (useTemplates as jest.Mock).mockReturnValue({
      handleUploadNewTemplate,
    });

    render(
      <MemoryRouter>
        <UploadBoardComponent isEditingTitle={false} />
      </MemoryRouter>
    );

    // Simulate button click
    const uploadButton = screen.getByLabelText("Upload Template Button");
    fireEvent.click(uploadButton);

    // Check for toast success message
    expect(setIsToastSuccess).toHaveBeenCalledWith("Board successfully uploaded!");
    // Check handleUploadNewTemplate is called
    expect(handleUploadNewTemplate).toHaveBeenCalled();
    // Check setSelectedBoard is called
    expect(setSelectedBoard).toHaveBeenCalledWith(null);
  });
});
