// EditBoardName.spec.tsx
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import EditBoardName from "../components/EditBoardName";
import { Board } from "../types";
import axios from "axios";

jest.mock("axios");

const mockedAxios = axios as jest.Mocked<typeof axios>;

const board: Board = {
  uuid: "123123",
  name: "Test Board",
  cards: [],
};

describe("EditBoardName Component", () => {
  test("renders the edit button", () => {
    render(<EditBoardName board={board} />);

    const editButton = screen.getByText("Edit");
    expect(editButton).toBeInTheDocument();
  });

  test("clicking edit button shows input and buttons", () => {
    render(<EditBoardName board={board} />);

    const editButton = screen.getByText("Edit");
    fireEvent.click(editButton);

    const input = screen.getByDisplayValue("Test Board");
    const saveButton = screen.getByText("Save");
    const cancelButton = screen.getByText("Cancel");

    expect(input).toBeInTheDocument();
    expect(saveButton).toBeInTheDocument();
    expect(cancelButton).toBeInTheDocument();
  });

  test("handles input change", () => {
    render(<EditBoardName board={board} />);

    const editButton = screen.getByText("Edit");
    fireEvent.click(editButton);

    const input = screen.getByDisplayValue("Test Board");
    fireEvent.change(input, { target: { value: "New Board Name" } });

    expect(input).toHaveValue("New Board Name");
  });

  test("handles submit and API call", async () => {
    const onSuccess = jest.fn();
    mockedAxios.put.mockResolvedValue({ data: { name: "New Board Name" } });

    render(<EditBoardName board={board} onSuccess={onSuccess} />);

    const editButton = screen.getByText("Edit");
    fireEvent.click(editButton);

    const input = screen.getByDisplayValue("Test Board");
    fireEvent.change(input, { target: { value: "New Board Name" } });

    const saveButton = screen.getByText("Save");
    fireEvent.click(saveButton);

    await waitFor(() =>
      expect(onSuccess).toHaveBeenCalledWith("New Board Name")
    );
  });

  test("handles cancel", () => {
    render(<EditBoardName board={board} />);

    const editButton = screen.getByText("Edit");
    fireEvent.click(editButton);

    const input = screen.getByDisplayValue("Test Board");
    fireEvent.change(input, { target: { value: "New Board Name" } });

    const cancelButton = screen.getByText("Cancel");
    fireEvent.click(cancelButton);

    expect(input).not.toBeInTheDocument();
    const editButtonAgain = screen.getByText("Edit");
    expect(editButtonAgain).toBeInTheDocument();
  });

  test("handles cancel on Escape key press", () => {
    render(<EditBoardName board={board} />);

    const editButton = screen.getByText("Edit");
    fireEvent.click(editButton);

    const input = screen.getByDisplayValue("Test Board");
    fireEvent.change(input, { target: { value: "New Board Name" } });

    // Simulate pressing the Escape key
    fireEvent.keyDown(document, { key: "Escape", code: "Escape" });

    expect(input).not.toBeInTheDocument();
    const editButtonAgain = screen.getByText("Edit");
    expect(editButtonAgain).toBeInTheDocument();
  });
});
