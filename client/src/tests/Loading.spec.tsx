// Loading.spec.tsx
// import { render, screen } from "@testing-library/react";
// import Loading from "../components/Loading";

describe("Loading Component", () => {

  test("random test", () => {
    console.log("hi there");
  });

  // it("renders loading spinner correctly", () => {
  //   render(<Loading isLoading={true} />);

  //   const spinnerElement = screen.getByTestId("loading-spinner");

  //   // Check for spinner component
  //   expect(spinnerElement).toBeInTheDocument();
  //   expect(spinnerElement).toHaveClass("w-16 h-16 border-4 border-t-4 border-t-blue-500 border-gray-200 rounded-full animate-spin");
  // });

  // it("does not render loading spinner when isLoading is false", () => {
  //   render(<Loading isLoading={false} />);

  //   const spinnerElement = screen.queryByTestId("loading-spinner");

  //   // Check that spinner does not exist
  //   expect(spinnerElement).not.toBeInTheDocument();
  // });
});
