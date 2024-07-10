// EditBoardName.spec.tsx
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import EditBoardName from "../components/EditBoardName";
import { BoardProvider, useBoard } from "../context/BoardContext";
import axios from "axios";

const mockedAxios = axios as jest.Mocked<typeof axios>;

jest.mock("axios");
jest.mock("../context/BoardContext");

describe("EditBoardName Component", () => {
  beforeEach(() => {
    (useBoard as jest.Mock).mockReturnValue({
      selectedBoard: {
        name: "Test Board",
      },
      setTitleText: jest.fn(),
      updateTitleText: jest.fn(),
      setIsToastSuccess: jest.fn(),
    });
  });

  const renderWithProviders = (component: React.ReactElement) => {
    return render(
      <BoardProvider>{component}</BoardProvider>
    );
  };

  it("renders the edit button", () => {
    renderWithProviders(<EditBoardName />);

    // Check for edit button
    waitFor(() => {
      const editButton = screen.getByText("Edit");
      expect(editButton).toBeInTheDocument();
    });
  });

  test("clicking edit button shows input and buttons", () => {
    renderWithProviders(<EditBoardName />);

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

  test("handles input change", () => {
    renderWithProviders(<EditBoardName />);

    waitFor(() => {
      const editButton = screen.getByText("Edit");
      fireEvent.click(editButton);

      const input = screen.getByDisplayValue("Test Board");
      fireEvent.change(input, { target: { value: "New Board Name" } });

      // Checks for new board name
      expect(input).toHaveValue("New Board Name");
    });
  });

  test("handles submit and API call", () => {
    const onSuccess = jest.fn();

    mockedAxios.put.mockResolvedValue({ data: { name: "New Board Name" } });

    renderWithProviders(<EditBoardName />);

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

  test("handles cancel", () => {
    renderWithProviders(<EditBoardName />);

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

  test("handles cancel on Escape key press", () => {
    renderWithProviders(<EditBoardName />);

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
