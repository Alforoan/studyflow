// CardDetails.spec.tsx
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import '@testing-library/jest-dom';
import CardDetails from "../components/CardDetails";

// Mock the useBoard hook
jest.mock("../context/BoardContext", () => ({
  useBoard: jest.fn(() => ({
    selectedCard: {
      id: "1",
      cardName: "Test Card",
      column: "backlog",
      creationDate: new Date(),
      order: 0,
      details: {
        checklist: [],
        notes: "Test notes",
        timeEstimate: 45,
      },
    },
    setSelectedCard: jest.fn(),
    handleUpdateCard: jest.fn(),
    handleDeleteCard: jest.fn(),
    setIsToastSuccess: jest.fn(),
    isTemplate: false,
  })),
}));

jest.mock("../context/TemplateContext", () => ({
  useTemplates: jest.fn(() => ({
    isTemplate: false,
  })),
}));

describe("CardDetails", () => {
  beforeEach(() => {
    render(<CardDetails />);
  });

  it("renders card details when not editing", () => {
    // Checks if card details are displayed correctly
    expect(screen.getByText("Test Card")).toBeInTheDocument();
    expect(screen.getByText("Notes: Test notes")).toBeInTheDocument();
    expect(screen.getByText("Time Estimate: 45 Minutes")).toBeInTheDocument();
    expect(screen.getByText("Column: backlog")).toBeInTheDocument();
  });

  it("enters and exits edit mode", () => {
    fireEvent.click(screen.getByText("Edit"));
    
    // Check if input fields are displayed
    expect(screen.getByLabelText("Card Name")).toBeInTheDocument();
    expect(screen.getByLabelText("Add Checklist Item")).toBeInTheDocument();
    expect(screen.getByLabelText("Time Estimate Input")).toBeInTheDocument();

    // Change the card name and time estimate
    fireEvent.change(screen.getByLabelText("Card Name"), { target: { value: "Updated Card" } });
    fireEvent.change(screen.getByLabelText("Time Estimate Input"), { target: { value: "120" } });
    
    fireEvent.click(screen.getByText("Save"));
    
    // Check if the updated card details are displayed
    waitFor(() => {
      expect(screen.getByText("Updated Card")).toBeInTheDocument();
      expect(screen.getByText("Time Estimate: 120 Minutes")).toBeInTheDocument();
    });
  });

  it("adds a new checklist item", () => {
    fireEvent.click(screen.getByText("Edit"));
    
    fireEvent.change(screen.getByLabelText("Add Checklist Item"), { target: { value: "New Item" } });
    
    fireEvent.click(screen.getByText("Add"));
    
    // Check if the new checklist item is displayed
    waitFor(() => {
      expect(screen.getByText("New Item")).toBeInTheDocument();
    });
  });

  it("shows and confirms delete modal", async () => {
    fireEvent.click(screen.getByText("Delete"));

    // Check if the delete confirmation modal is displayed
    waitFor(() => {
      expect(screen.getByText("Are you sure you want to delete this card?")).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText("Delete"));

    // Check if the card is deleted and no longer displayed
    waitFor(() => {
      expect(screen.queryByText("Test Card")).not.toBeInTheDocument();
    });
  });
});
