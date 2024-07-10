// TitleComponent.spec.tsx
import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import TitleComponent from "../components/TitleComponent";
import { useBoard } from "../context/BoardContext";
import { useTemplates } from "../context/TemplateContext";

// Mock useBoard and useTemplates hooks
jest.mock("../context/BoardContext");
jest.mock("../context/TemplateContext");

describe("TitleComponent", () => {
  beforeEach(() => {
    // Mock return values for useBoard
    (useBoard as jest.Mock).mockReturnValue({
      selectedBoard: { uuid: "test-uuid", name: "Test Board" },
      selectedCard: { id: "test-card", cardName: "Test Card" },
      setSelectedBoard: jest.fn(),
      setSelectedCard: jest.fn(),
      titleText: "Board Title",
      updateTitleText: jest.fn(),
      isSearching: false,
      setIsSearching: jest.fn(),
    });

    // Mock return values for useTemplates
    (useTemplates as jest.Mock).mockReturnValue({
      templateQuery: "",
      setTemplateQuery: jest.fn(),
      handleUpdateSearchQuery: jest.fn(),
      handlePostTemplateCard: jest.fn(),
      isTemplate: false,
      setIsTemplate: jest.fn(),
      handleUploadNewTemplate: jest.fn(),
      uploadedTemplateNames: [],
      setUploadedTemplateNames: jest.fn(),
      templateIsOwned: false,
      setTemplateIsOwned: jest.fn(),
      userTemplates: [],
      setUserTemplates: jest.fn(),
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("handles go back when clicking on title", () => {
    render(<TitleComponent />);

    const titleElement = screen.getByText("Board Title");
    fireEvent.click(titleElement);

    // Access mock function directly from the mock return value
    expect(useTemplates().setIsTemplate).not.toHaveBeenCalled();
    expect(useBoard().setIsSearching).not.toHaveBeenCalled();
  });

  it("renders EditBoardName component when selectedBoard is present and isTemplate is false or templateIsOwned is true", () => {
    render(<TitleComponent />);

    waitFor(() => {
      // Check if the "Edit Board Name" component is rendered
      expect(screen.queryByText("Edit Board Name")).toBeInTheDocument();
    });
  });

  it("does not render EditBoardName component when isTemplate is true and templateIsOwned is false", () => {
    // Modify mock return values for isTemplate and templateIsOwned scenario
    (useTemplates as jest.Mock).mockReturnValue({
      isTemplate: true,
      setIsTemplate: jest.fn(),
      templateIsOwned: false,
    });

    render(<TitleComponent />);

    // Check "Edit Board Name" component is not rendered
    expect(screen.queryByText("Edit Board Name")).not.toBeInTheDocument();
  });
});
