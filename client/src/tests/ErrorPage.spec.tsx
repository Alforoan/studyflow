// ErrorPage.spec.tsx
// import { render, screen, fireEvent } from "@testing-library/react";
// import { MemoryRouter } from "react-router-dom";
// import ErrorPage from "../pages/ErrorPage";

describe("ErrorPage Component", () => {
  test("random test", () => {
    console.log("hi there");
  });
  // it("renders error message and link to homepage", () => {
  //   render(
  //     <MemoryRouter>
  //       <ErrorPage />
  //     </MemoryRouter>
  //   );

  //   const errorMessage = screen.getByText(/Oops, something went wrong!/i);
  //   const tryAgainMessage = screen.getByText(/We encountered an error while processing your request./i);
  //   const goBackLink = screen.getByRole("link", { name: /Go back to homepage/i });

  //   expect(errorMessage).toBeInTheDocument();
  //   expect(tryAgainMessage).toBeInTheDocument();
  //   expect(goBackLink).toBeInTheDocument();
  // });

  // it("clicking 'Go back to homepage' link navigates to homepage", () => {
  //   const { container } = render(
  //     <MemoryRouter initialEntries={["/error"]}>
  //       <ErrorPage />
  //     </MemoryRouter>
  //   );

  //   fireEvent.click(screen.getByRole("link", { name: /Go back to homepage/i }));

  //   // Check navigation to '/' route
  //   expect(container.innerHTML).toMatch("/");
  // });
});
