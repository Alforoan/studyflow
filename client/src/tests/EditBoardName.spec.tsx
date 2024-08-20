// EditBoardName.spec.tsx
import React from "react";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import EditBoardName from "../components/EditBoardName";
import { BoardProvider, useBoard } from "../context/BoardContext";import { validateTextInput } from "../utils/inputUtils";
import axios from "axios";

const mockedAxios = axios as jest.Mocked<typeof axios>;

jest.mock("axios");
jest.mock("../context/BoardContext");

describe("EditBoardName Component", () => {
  beforeEach(() => {
    (useBoard as jest.Mock).mockReturnValue({
      selectedBoard: {
        name: "Test Board",
        uuid: "123",
      },
      setTitleText: jest.fn(),
      updateTitleText: jest.fn(),
      setIsToastSuccess: jest.fn(),
      userBoards: [],
      setUserBoards: jest.fn(),
    });
  });

  const mockSetIsEditingTitle = jest.fn();

  const renderWithProviders = (component: React.ReactElement) => {
    return render(
      <BoardProvider>
        {React.cloneElement(component, { setIsEditingTitle: mockSetIsEditingTitle })}
      </BoardProvider>
    );
  };

  it("renders the edit button", () => {
    renderWithProviders(<EditBoardName setIsEditingTitle={mockSetIsEditingTitle} />);

    // Check for edit button
    waitFor(() => {
      const editButton = screen.getByText("Edit");
      expect(editButton).toBeInTheDocument();
    });
  });

  test("clicking edit button shows input and buttons", () => {
    renderWithProviders(<EditBoardName setIsEditingTitle={mockSetIsEditingTitle} />)

    waitFor(() => {
      const editButton = screen.getByText("Edit");
      fireEvent.click(editButton);

      const input = screen.getByDisplayValue("Test Board");
      const saveButton = screen.getByText("Save");
      const cancelButton = screen.getByText("Cancel");

      // Check that edit options are available
      expect(input).toBeInTheDocument();
      expect(saveButton).toBeInTheDocument();
      expect(cancelButton).toBeInTheDocument();
    });
  });

  it("handles input change", () => {
    renderWithProviders(<EditBoardName setIsEditingTitle={mockSetIsEditingTitle} />)

    waitFor(() => {
      const editButton = screen.getByText("Edit");
      fireEvent.click(editButton);

      const input = screen.getByDisplayValue("Test Board");
      fireEvent.change(input, { target: { value: "New Board Name" } });

      // Checks for new board name
      expect(input).toHaveValue("New Board Name");
    });
  });

  it("handles input change and sanitization", () => {
    renderWithProviders(<EditBoardName setIsEditingTitle={mockSetIsEditingTitle} />)

    waitFor(() => {
      const editButton = screen.getByText("Edit");
      fireEvent.click(editButton);

      const input = screen.getByDisplayValue("Test Board");
      const rawInput = "<script>alert('XSS');</script>New Board Name";
      fireEvent.change(input, { target: { value: rawInput } });

      // Use the utility function to sanitize the input
      const sanitizedInput = validateTextInput(rawInput);

      // Check that sanitized input is displayed
      expect(input).toHaveValue(sanitizedInput || "");

      // Check that harmful content is not rendered
      expect(screen.queryByText("XSS")).toBeNull();
      expect(screen.queryByText("alert")).toBeNull();
    });
  });

  it("handles submit and API call", () => {
    const onSuccess = jest.fn();

    mockedAxios.put.mockResolvedValue({ data: { name: "New Board Name" } });

    renderWithProviders(<EditBoardName setIsEditingTitle={mockSetIsEditingTitle} />)

    waitFor(() => {
      const editButton = screen.getByLabelText("Edit Board Name");
      fireEvent.click(editButton);

      const input = screen.getByDisplayValue("Test Board");
      fireEvent.change(input, { target: { value: "New Board Name" } });

      // Checks for new board name submission
      const saveButton = screen.getByText("Save");
      fireEvent.click(saveButton);
      expect(onSuccess).toHaveBeenCalledWith("New Board Name");
    });
  });

  it("handles cancel", () => {
    renderWithProviders(<EditBoardName setIsEditingTitle={mockSetIsEditingTitle} />)

    waitFor(() => {
      const editButton = screen.getByText("Edit");
      fireEvent.click(editButton);

      const input = screen.getByDisplayValue("Test Board");
      fireEvent.change(input, { target: { value: "New Board Name" } });

      const cancelButton = screen.getByText("Cancel");
      fireEvent.click(cancelButton);

      // Check that cancel buttons exits editing
      expect(input).not.toBeInTheDocument();
      const editButtonAgain = screen.getByText("Edit");
      expect(editButtonAgain).toBeInTheDocument();
    });
  });

  it("handles cancel on Escape key press", () => {
    renderWithProviders(<EditBoardName setIsEditingTitle={mockSetIsEditingTitle} />)

    waitFor(() => {
      const input = screen.getByDisplayValue("Test Board");
      fireEvent.change(input, { target: { value: "New Board Name" } });

      fireEvent.keyDown(document, { key: "Escape", code: "Escape" });

      // Check that cancel button exits editing
      expect(input).not.toBeInTheDocument();
      const editButtonAgain = screen.getByText("Edit");
      expect(editButtonAgain).toBeInTheDocument();
    });
  });
});
