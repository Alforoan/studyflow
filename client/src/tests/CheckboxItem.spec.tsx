// CheckboxItem.spec.tsx
// import { render, screen, fireEvent } from "@testing-library/react";
// import CheckboxItem from "../components/CheckboxItem";
// import { useBoard } from "../context/BoardContext";
// import { useTemplates } from "../context/TemplateContext";

// // setup mocks for hooks
// jest.mock("../context/BoardContext");
// jest.mock("../context/TemplateContext");

describe("CheckboxItem", () => {
  test("random test", () => {
    console.log("hi there");
  });
//   beforeEach(() => {
//     (useBoard as jest.Mock).mockReturnValue({
//       selectedCard: {
//         id: "1",
//         cardName: "Test Card",
//         column: "inProgress",
//         creationDate: new Date(),
//         order: 0,
//         details: {
//           checklist: [
//             { value: "Item 1", checked: false },
//             { value: "Item 2", checked: true },
//           ],
//         },
//       },
//       handleUpdateCard: jest.fn(),
//     });

//     (useTemplates as jest.Mock).mockReturnValue({
//       isTemplate: false,
//     });
//   });

//   afterEach(() => {
//     jest.clearAllMocks();
//   });

//   it("updates item text", () => {
//     render(
//       <CheckboxItem
//         item={{ value: "Item 1", checked: false }}
//         index={0}
//         setChecklistItems={() => {}}
//         isEditing={true}
//       />
//     );

//     const input = screen.getByDisplayValue("Item 1");
//     fireEvent.change(input, { target: { value: "Updated Item 1" } });

//     // Check if item was updated
//     expect(input).toHaveValue("Updated Item 1");
//   });

//   it("renders text with links", () => {
//     render(
//       <CheckboxItem
//         item={{ value: "Check out https://example.com", checked: false }}
//         index={0}
//         setChecklistItems={() => {}}
//         isEditing={false}
//       />
//     );

//     const link = screen.getByText("https://example.com");

//     // Check if link is displayed on card
//     expect(link).toHaveAttribute("href", "https://example.com");
//   });
});
