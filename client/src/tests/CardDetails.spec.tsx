// CardDetails.spec.tsx
// import { render, screen } from "@testing-library/react";
// import '@testing-library/jest-dom';
// import CardDetails from "../components/CardDetails";

// // Mock the useBoard and useTemplates hooks
// jest.mock("../context/BoardContext", () => ({
//   useBoard: jest.fn(() => ({
//     selectedCard: {
//       id: "1",
//       cardName: "Test Card",
//       column: "backlog",
//       creationDate: new Date(),
//       order: 0,
//       details: {
//         checklist: [],
//         notes: "Test notes",
//         timeEstimate: 60,
//       },
//     },
//     setSelectedCard: jest.fn(),
//     handleUpdateCard: jest.fn(),
//     handleDeleteCard: jest.fn(),
//     setIsToastSuccess: jest.fn(),
//     isTemplate: false,
//   })),
// }));

// jest.mock("../context/TemplateContext", () => ({
//   useTemplates: jest.fn(() => ({
//     isTemplate: false,
//   })),
// }));

describe("CardDetails", () => {

  test("random test", () => {
    console.log("hi there");
  }); 

  // beforeEach(() => {
  //   render(<CardDetails />);
  // });

  // it("renders card details when not editing", () => {
  //   expect(screen.getByText("Test Card")).toBeInTheDocument();
  //   expect(screen.getByText("Notes: Test notes")).toBeInTheDocument();
  //   expect(screen.getByText("Time Estimate: 60 Minutes")).toBeInTheDocument();
  //   expect(screen.getByText("Column: backlog")).toBeInTheDocument();
  // });
});
