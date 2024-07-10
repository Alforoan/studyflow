// Account.spec.tsx
import { render, screen, waitFor } from "@testing-library/react";
import Account from "../../pages/Account";
import { useAuth0 } from "@auth0/auth0-react";
import { BoardProvider, useBoard } from "../../context/BoardContext";

// // setup mocks
jest.mock("@auth0/auth0-react");
jest.mock("../../context/BoardContext");

jest.mock("../../components/PassChange", () => ({
  __esModule: true,
  default: () => (
    <div data-testid="passchange">
      Mock PassChange component
      <button>Reset password</button>
    </div>
  ),
}));

jest.mock("../../components/Profile", () => ({
  __esModule: true,
  default: () => (
    <div data-testid="profile">
      Mock Profile component
    </div>
  ),
}));

describe("Account Page", () => {
  beforeEach(() => {
    (useBoard as jest.Mock).mockReturnValue({
      selectedBoard: {
        name: "Test Board",
      },
      setTitleText: jest.fn(),
      updateTitleText: jest.fn(),
      setIsToastSuccess: jest.fn(),
    });
    (useAuth0 as jest.Mock).mockReturnValue({
      user: {
        nickname: "testuser",
        email: "testuser@example.com",
        picture: "https://example.com/profile.jpg",
      },
      isAuthenticated: true,
    });

    jest.clearAllMocks(); // Clear mock calls before each test
  });

  const renderWithProviders = (component: React.ReactElement) => {
    return render(<BoardProvider>{component}</BoardProvider>);
  };

  it("renders Account page", () => {
    renderWithProviders(<Account />);

    // Check if Account Actions is rendered
    waitFor(() => {
      expect(screen.getByText(/Account Actions/i)).toBeInTheDocument();
    });
  });

  it("renders Profile component", () => {
    renderWithProviders(<Account />);;

    // Check if the Profile component is rendered
    waitFor(() => {
      expect(screen.getByTestId("profile")).toBeInTheDocument();
    });
  });

  it('renders PassChange component with "Reset password" button', () => {
    renderWithProviders(<Account />);

    // Check if the password reset button is rendered
    waitFor(() => {
      expect(screen.getByText(/Reset password/i)).toBeInTheDocument();
    });
  });
});
