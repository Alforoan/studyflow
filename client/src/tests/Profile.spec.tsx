// Profile.spec.tsx
import { render, screen } from '@testing-library/react';
import Profile from '../components/Profile';
import { useAuth0 } from '@auth0/auth0-react';

jest.mock('@auth0/auth0-react'); // Mock Auth0

describe('Profile Component', () => {
  const mockAuth0 = {
    isAuthenticated: false,
    user: null,
  };

  beforeEach(() => {
    // Clear mock calls before each test
    jest.clearAllMocks();

    // Apply mock implementation for useAuth0
    (useAuth0 as jest.Mock).mockReturnValue(mockAuth0);
  });

  test('renders "User not authenticated" when user is not authenticated', () => {
    render(<Profile />);

    const notAuthenticatedText = screen.getByText(/User not authenticated/i);
    // Check for message if user is not authenticated
    expect(notAuthenticatedText).toBeInTheDocument();
  });

  test('renders user profile information when user is authenticated', () => {
    const mockUser = {
      nickname: 'johndoe',
      email: 'john.doe@example.com',
    };

    const authenticatedMock = {
      isAuthenticated: true,
      user: mockUser,
    };

    (useAuth0 as jest.Mock).mockReturnValue(authenticatedMock);

    render(<Profile />);

    const profileName = screen.getByText(mockUser.nickname);
    const profileEmail = screen.getByText(mockUser.email);

    // Check for correct Profile attributes
    expect(profileName).toBeInTheDocument();
    expect(profileEmail).toBeInTheDocument();
  });
});
