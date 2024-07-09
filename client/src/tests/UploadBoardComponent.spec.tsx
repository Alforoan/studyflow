// UploadBoardComponent.spec.tsx
// import { render, fireEvent, screen } from "@testing-library/react";
// import UploadBoardComponent from "../components/UploadBoardComponent";
// import { useBoard } from "../context/BoardContext";
// import { useTemplates } from "../context/TemplateContext";
// import { Columns } from "../types";

// // Mock useBoard and useTemplates hooks
// jest.mock("../context/BoardContext");
// jest.mock("../context/TemplateContext");

describe("UploadBoardComponent", () => {
  test("random test", () => {
    console.log("hi there");
  });
  // beforeEach(() => {
  //   // Mock return values for useBoard
  //   (useBoard as jest.Mock).mockReturnValue({
  //     selectedBoard: {
  //       uuid: "test-uuid",
  //       name: "Test Board",
  //       cards: [
  //         { id: "1", column: Columns.backlog, order: 1 },
  //         { id: "2", column: Columns.inProgress, order: 1 },
  //         { id: "3", column: Columns.completed, order: 1 },
  //       ],
  //     },
  //     setIsToastSuccess: jest.fn(),
  //   });

  //   // Mock return values for useTemplates
  //   (useTemplates as jest.Mock).mockReturnValue({
  //     handleUploadNewTemplate: jest.fn(),
  //   });
  // });

  // afterEach(() => {
  //   jest.clearAllMocks();
  // });

  // test("handles click event and uploads board", () => {
  //   render(<UploadBoardComponent />);

  //   // Simulate button click using aria-label
  //   const uploadButton = screen.getByLabelText("Upload Template Button");
  //   fireEvent.click(uploadButton);

  //   // Check for toas success 'Board successfully uploaded!'
  //   expect(useBoard().setIsToastSuccess).toHaveBeenCalledWith("Board successfully uploaded!");
  // });
});
