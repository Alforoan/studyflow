// Modal.spec.tsx
// import { render, screen, fireEvent, waitFor } from "@testing-library/react";
// import Modal from "../components/DeleteModal";
// import { BoardProvider, useBoard } from "../context/BoardContext";
// import { DeleteBoardProvider } from "../context/DeleteBoardContext";
// import { TemplateProvider, useTemplates } from "../context/TemplateContext";

// // setup mocks for hooks
// jest.mock("../context/BoardContext");
// jest.mock("../context/TemplateContext");

// const renderWithProviders = (component: React.ReactElement) => {
//   return render(
//     <BoardProvider>
//       <DeleteBoardProvider>
//         <TemplateProvider>{component}</TemplateProvider>
//       </DeleteBoardProvider>
//     </BoardProvider>
//   );
// };

describe("Modal Component", () => {
  test("random test", () => {
    console.log("hi there");
  });
  // beforeEach(() => {
  //   (useBoard as jest.Mock).mockReturnValue({
  //     selectedBoard: { name: "Test Board" },
  //     setTitleText: jest.fn(),
  //     updateTitleText: jest.fn(),
  //     setIsToastSuccess: jest.fn(),
  //   });

  //   (useTemplates as jest.Mock).mockReturnValue({
  //     isTemplate: false,
  //   });
  // });

  // it("renders modal when open", () => {
  //   renderWithProviders(
  //     <Modal
  //       isOpen={true}
  //       onClose={jest.fn()}
  //       onDelete={jest.fn()}
  //       message="Are you sure you want to delete this board?"
  //       type="board"
  //     />
  //   );

  //   // Check for deletion confirmation
  //   waitFor(() => {
  //     const modalMessage = screen.getByText("Are you sure you want to delete this board?");
  //     expect(modalMessage).toBeInTheDocument();
  //   })
  // });

  // it("calls onClose when cancel button is clicked", () => {
  //   const onCloseMock = jest.fn();

  //   renderWithProviders(
  //     <Modal
  //       isOpen={true}
  //       onClose={onCloseMock}
  //       onDelete={jest.fn()}
  //       message="Are you sure you want to delete this board?"
  //       type="board"
  //     />
  //   );

  //   // Check that modal is called to close 
  //   waitFor(() => {
  //     const cancelButton = screen.getByText("Cancel");
  //     fireEvent.click(cancelButton);
  //     expect(onCloseMock).toHaveBeenCalled();
  //   })
  // });

  // it("calls onDelete when delete button is clicked", () => {
  //   const onDeleteMock = jest.fn();

  //   renderWithProviders(
  //     <Modal
  //       isOpen={true}
  //       onClose={jest.fn()}
  //       onDelete={onDeleteMock}
  //       message="Are you sure you want to delete this board?"
  //       type="board"
  //     />
  //   );

  //   // Check for delete button functionality
  //   waitFor(() => {
  //     const deleteButton = screen.getByText("Delete");
  //     fireEvent.click(deleteButton);
  
  //     expect(onDeleteMock).toHaveBeenCalled();
  //   })
  // });
});
