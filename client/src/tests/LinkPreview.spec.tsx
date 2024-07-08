// LinkPreview.spec.tsx
// import { render, screen, act } from "@testing-library/react";
// import axios from "axios";
// import LinkPreview from "../components/LinkPreview";

// jest.mock("axios");

describe("LinkPreview Component", () => {
  test("random test", () => {
    console.log("hi there");
  });
  // beforeEach(() => {
  //   jest.clearAllMocks();
  // });

  // it("renders loading state initially", async () => {
  //   const mockData = { data: { title: "Mock Title", favicon: "mock-favicon-url" } };
  //   (axios.get as jest.Mock).mockResolvedValue(mockData);

  //   render(<LinkPreview url="https://example.com" />);

  //   expect(screen.getByText("https://example.com")).toBeInTheDocument();
  //   expect(screen.queryByAltText("alt")).not.toBeInTheDocument();

  //   // Ensure loading state is rendered
  //   expect(screen.queryByText("Mock Title")).not.toBeInTheDocument();
  //   expect(screen.queryByTestId("loaded-state")).not.toBeInTheDocument();
  //   expect(screen.getByTestId("loading-state")).toBeInTheDocument();

  //   await act(async () => {
  //     await new Promise((resolve) => setTimeout(resolve, 0));
  //   });

  //   // Check title and favicon are rendered after loading
  //   expect(screen.getByText("Mock Title")).toBeInTheDocument();
  //   expect(screen.getByAltText("alt")).toBeInTheDocument();
  // });

  // it("handles error state when fetching metadata fails", async () => {
  //   (axios.get as jest.Mock).mockRejectedValue(new Error("Mock error"));

  //   render(<LinkPreview url="https://example.com" />);

  //   // Ensure loading state is rendered
  //   expect(screen.getByTestId("loading-state")).toBeInTheDocument();

  //   // Wait for loading to finish
  //   await act(async () => {
  //     await new Promise((resolve) => setTimeout(resolve, 0));
  //   });

  //   // Check URL is displayed as title in case of error
  //   expect(screen.getByText("https://example.com")).toBeInTheDocument();
  //   expect(screen.queryByAltText("alt")).not.toBeInTheDocument();
  // });
});
