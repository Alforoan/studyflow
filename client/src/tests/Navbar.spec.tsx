// Navbar.spec.tsx
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import Navbar from "../components/Navbar";
import { MemoryRouter } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { BoardProvider } from "../context/BoardContext";

jest.mock("../assets/logo2.png", () => "test-file-stub"); // Mock the image import
jest.mock("@auth0/auth0-react"); // Mock Auth0
jest.mock("../context/BoardContext");

describe("Navbar Component", () => {
  const mockAuth0 = {
    isAuthenticated: false,
    loginWithRedirect: jest.fn(),
    logout: jest.fn(),
    getIdTokenClaims: jest.fn(),
    getAccessTokenSilently: jest.fn(),
    isLoading: false,
  };

  beforeEach(() => {
    // Clear mock calls before each test
    jest.clearAllMocks();

    // Apply mock implementation for useAuth0
    (useAuth0 as jest.Mock).mockReturnValue(mockAuth0);
  });

  const renderWithRouter = (component: React.ReactElement) => {
    return render(
      <MemoryRouter>
        <BoardProvider>{component}</BoardProvider>
      </MemoryRouter>
    );
  };

  it("renders the Navbar component", () => {
    renderWithRouter(<Navbar />);

    waitFor(() => {
      // Check if StudyFlow text is rendered in the Navbar
      const studyFlowText = screen.getByText(/StudyFlow/i);
      expect(studyFlowText).toBeInTheDocument();

      // Check if the logo is rendered
      const logoImage = screen.getByAltText("Logo");
      expect(logoImage).toBeInTheDocument();
    });
  });

  it("renders the correct links for unauthed users, 'Log in', 'Sign up'", () => {
    renderWithRouter(<Navbar />);

    waitFor(() => {
      // Check if Login and Register buttons are rendered for unauthed users
      const loginButton = screen.getByText(/Log in/i);
      const registerButton = screen.getByText(/Sign up/i);
      expect(loginButton).toBeInTheDocument();
      expect(registerButton).toBeInTheDocument();
    });
  });

  it("redirects to Auth0 Universal Login when Log in is clicked", async () => {
    renderWithRouter(<Navbar />);

    waitFor(() => {
      // Get the login button element
      const loginButton = screen.getByText(/Log in/i);

      // Simulate clicking the button
      fireEvent.click(loginButton);

      // Assert that loginWithRedirect is called on the mocked useAuth0
      expect(useAuth0().loginWithRedirect).toHaveBeenCalledTimes(1);
    });
  });

  it("renders correct links when user is authorized, 'Home', 'Account', 'Log out'", () => {
    // Set mockAuth0 to reflect an authenticated user
    mockAuth0.isAuthenticated = true;

    (useAuth0 as jest.Mock).mockReturnValue(mockAuth0);

    renderWithRouter(<Navbar />);

    waitFor(() => {
      // Check if Home link is rendered
      const homeLink = screen.getByText(/Home/i);
      expect(homeLink).toBeInTheDocument();

      // Check if Account link is rendered
      const accountLink = screen.getByText(/Account/i);
      expect(accountLink).toBeInTheDocument();

      // Check if Log out button is rendered
      const logoutButton = screen.getByText(/Log out/i);
      expect(logoutButton).toBeInTheDocument();
    });
  });
});
