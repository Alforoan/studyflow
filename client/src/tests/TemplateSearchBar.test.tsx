// TemplateSearchBar.spec.tsx
import { render, fireEvent, act, screen } from "@testing-library/react";
import TemplateSearchBar from "../components/TemplateSearchBar";
import { useTemplates } from "../context/TemplateContext";

jest.mock("../context/TemplateContext");

describe("TemplateSearchBar Component", () => {
  beforeEach(() => {
    // Mock return value for useTemplates
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

  it("handles input change and updates search query", async () => {
    render(<TemplateSearchBar />);

    const searchInput = screen.getByPlaceholderText("Search templates...");
    fireEvent.change(searchInput, { target: { value: "new search query" } });

    // Wait for the debounce timeout to complete (300ms)
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 300));
    });
    // Check if search was successful
    expect(useTemplates().handleUpdateSearchQuery).toHaveBeenCalledWith("new search query");
  });
});
