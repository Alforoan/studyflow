// ErrorMessage.spec.tsx
// import { render, screen } from "@testing-library/react";
// import ErrorMessage from "../components/ErrorMessage";

describe("ErrorMessage Component", () => {
  test("random test", () => {
    console.log("hi there");
  });
  // it("renders with message", () => {
  //   const errorMessage = "This is an error message";

  //   render(<ErrorMessage message={errorMessage} />);

  //   const errorElement = screen.getByText(errorMessage);
  //   // Check for error message and its attributes
  //   expect(errorElement).toBeInTheDocument();
  //   expect(errorElement).toHaveClass("text-red-500");
  //   expect(errorElement).toHaveClass("mt-2");
  //   expect(errorElement).toHaveClass("text-center");
  // });

  // it("does not render without message", () => {
  //   render(<ErrorMessage message={null} />);

  //   const errorElement = screen.queryByText(/./);
  //   // Check that no error when null
  //   expect(errorElement).not.toBeInTheDocument();
  // });
});
