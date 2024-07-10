// UserTemplatesGrid.spec.tsx
import { render, screen, waitFor } from "@testing-library/react";
import UserTemplatesGrid from "../components/UserTemplatesGrid";
import { BoardProvider } from "../context/BoardContext";

// Mock useAuth0
jest.mock("@auth0/auth0-react", () => ({
  useAuth0: () => ({
    user: {
      email: "test@example.com",
    },
  }),
}));

jest.mock("../context/BoardContext");

// Mock useTemplates and useGetTemplates
jest.mock("../context/TemplateContext", () => ({
  useTemplates: () => ({
    userTemplates: [],
    setUserTemplates: jest.fn(),
    setTemplateIsOwned: jest.fn(),
  }),
}));

// Mock useGetCards and useGetTemplates
jest.mock("../hooks/useAPI", () => ({
  useGetTemplates: () => ({
    getTemplates: jest.fn().mockResolvedValue([]), // Mock getTemplates function
  }),
  useGetCards: () => ({
    getCards: jest.fn().mockResolvedValue([]), // Mock getCards function
  }),
}));

describe("UserTemplatesGrid", () => {
  test("fetches and displays user templates", () => {
    render(<BoardProvider><UserTemplatesGrid /></BoardProvider>);

    // Wait for the fetchUserTemplates function to complete
    waitFor(() => {
      expect(screen.getByLabelText("User Templates")).toBeInTheDocument();
    });
  });
});
