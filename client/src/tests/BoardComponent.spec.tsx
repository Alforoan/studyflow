// BoardComponent.spec.tsx
import { render, screen } from "@testing-library/react";
import '@testing-library/jest-dom';
import BoardComponent from "../components/BoardComponent";
import { useBoard } from "../context/BoardContext";
import { useTemplates } from "../context/TemplateContext";
import { Columns } from "../types";

// Mock the useBoard and useTemplates hooks
jest.mock("../context/BoardContext");
jest.mock("../context/TemplateContext");

describe("BoardComponent", () => {
  // Setup mock data
  const mockSelectedBoard = {
    cards: [
      { id: 1, cardName: 'Card 1', column: Columns.backlog, order: 0, creationDate: new Date().toISOString(), details: { timeEstimate: 60, checklist: [] } },
      { id: 2, cardName: 'Card 2', column: Columns.inProgress, order: 0, creationDate: new Date().toISOString(), details: { timeEstimate: 120, checklist: [] } },
      { id: 3, cardName: 'Card 3', column: Columns.completed, order: 0, creationDate: new Date().toISOString(), details: { timeEstimate: 30, checklist: [] } },
    ],
  };

  const mockUseBoard = {
    selectedBoard: mockSelectedBoard,
    selectedCard: null,
    estimatedTimeTotal: 210,
    completedTimeTotal: 30,
    setSelectedCard: jest.fn(),
    handleUpdateCard: jest.fn(),
    handlePostNewCard: jest.fn(),
    setEstimatedTimeTotal: jest.fn().mockImplementation((value) => {
      return value === 210; 
    }),
    setCompletedTimeTotal: jest.fn().mockImplementation((value) => {
      return value === 30; 
    }),
  };

  const mockUseTemplates = { 
    isTemplate: false,
    templateQuery: '',
    setTemplateQuery: jest.fn(),
    handleUpdateSearchQuery: jest.fn(),
    toggleIsSearching: jest.fn(),
    isSearching: false,
    searchResults: [],
    templates: [],
    handleTemplateClick: jest.fn(),
    handleSaveTemplate: jest.fn(),
  };

  beforeEach(() => {
    // Mock implementation of hooks
    (useBoard as jest.Mock).mockReturnValue(mockUseBoard);
    (useTemplates as jest.Mock).mockReturnValue(mockUseTemplates);
  });

  it("renders columns: Backlog, In Progress, and Completed", () => {
    render(<BoardComponent />);

    expect(screen.getByText("Backlog")).toBeInTheDocument();
    expect(screen.getByText("In Progress")).toBeInTheDocument();
    expect(screen.getByText("Completed")).toBeInTheDocument();
  });

  it("renders cards", () => {
    render(<BoardComponent />);
  
    expect(screen.getByText("Card 1")).toBeInTheDocument();
    expect(screen.getByText("Card 2")).toBeInTheDocument();
    expect(screen.getByText("Card 3")).toBeInTheDocument();
  });

  it("sets selected card on card click", () => {
    render(<BoardComponent />);
    
    const card1 = screen.getByText("Card 1");
    card1.click();
  
    expect(mockUseBoard.setSelectedCard).toHaveBeenCalledWith({
      id: 1,
      cardName: 'Card 1',
      column: Columns.backlog,
      order: 0,
      creationDate: expect.any(String),
      details: { timeEstimate: 60, checklist: [] }
    });
  });

  it("renders ProgressBar component", () => {
    render(<BoardComponent />);
  
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  it("renders ProgressBar with correct times", () => {
    render(<BoardComponent />);
  
    expect(screen.getByText(/14%\s*completed/i)).toBeInTheDocument();
  });
})