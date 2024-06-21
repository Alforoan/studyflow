// AuthHandler.spec.tsx
import { render } from '@testing-library/react';
import axios from 'axios';
import AuthHandler from '../components/AuthHandler';
import { useAuth0 } from '@auth0/auth0-react';

jest.mock('axios'); // Mock axios calls

jest.mock('@auth0/auth0-react'); // Mock Auth0

describe('AuthHandler Component', () => {

  const mockAuth0 = {
    isAuthenticated: true,
    user: {
      email: 'test@example.com',
    },
    getIdTokenClaims: jest.fn(),
  };

  beforeEach(() => {
    // Clear mock calls before each test
    jest.clearAllMocks();

    // Apply mock implementation for useAuth0
    (useAuth0 as jest.Mock).mockReturnValue(mockAuth0);
  });

  test('handles authentication and sends user data to backend', async () => {

    const mockedAxios = axios as jest.Mocked<typeof axios>;
    mockedAxios.post.mockResolvedValue({ data: 'Mock response' });

    render(<AuthHandler />);

    // Ensure that axios.post is called with the correct endpoint and data
    expect(mockedAxios.post).toHaveBeenCalledWith('http://127.0.0.1:5000/api/signin', {
      email: 'test@example.com',
    });
  });
});
