// Landing.spec.tsx
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Landing from "../../pages/Landing";
import { useAuth0 } from "@auth0/auth0-react";
import { HelmetProvider } from "react-helmet-async";

jest.mock("@auth0/auth0-react"); // Mock Auth0

describe("Landing Component", () => {
  const mockLoginWithRedirect = jest.fn();

  beforeEach(() => {
    // Clear mock calls before each test
    jest.clearAllMocks();

    // Mock useAuth0 hook
    (useAuth0 as jest.Mock).mockReturnValue({
      isAuthenticated: false,
      loginWithRedirect: mockLoginWithRedirect,
    });
  });

  const renderWithRouter = (component: React.ReactElement) => {
    return render(
      <MemoryRouter>
        <HelmetProvider>{component}</HelmetProvider>
      </MemoryRouter>
    );
  };

  test("renders the Landing component correctly", () => {
    renderWithRouter(<Landing />);

    // Check if StudyFlow text is rendered
    const studyFlowText = screen.getByText(/StudyFlow/i);
    expect(studyFlowText).toBeInTheDocument();

    // Check if Sign up button is rendered
    const signUpButton = screen.getByText(/Sign up here/i);
    expect(signUpButton).toBeInTheDocument();
  });

  test("calls loginWithRedirect when Sign up button is clicked", () => {
    renderWithRouter(<Landing />);

    const signUpButton = screen.getByText(/Sign up here/i);
    fireEvent.click(signUpButton);

    // Check that loginWithRedirect is called
    expect(mockLoginWithRedirect).toHaveBeenCalledTimes(1);
  });
});
