// AuthContext.spec.tsx
import { render, waitFor } from '@testing-library/react';
import { AuthProvider, useAuth } from '../context/AuthContext';
import { useAuth0, Auth0ContextInterface, User } from '@auth0/auth0-react';
import axios from 'axios';

jest.mock('@auth0/auth0-react');
jest.mock('axios');

const mockUseAuth0 = useAuth0 as jest.MockedFunction<typeof useAuth0>;
const mockAxiosPost = axios.post as jest.MockedFunction<typeof axios.post>;

describe('AuthProvider', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('should get token and set in local storage', async () => {
    const token = 'fakeToken';
    const email = 'test@example.com';
    const accessToken = 'fakeAccessToken';

    mockUseAuth0.mockReturnValue({
      isAuthenticated: true,
      user: { email } as User,
      getAccessTokenSilently: jest.fn().mockResolvedValue(token),
    } as unknown as Auth0ContextInterface);

    mockAxiosPost.mockResolvedValue({
      data: { access_token: accessToken },
    });

    const TestComponent = () => {
      const { token } = useAuth();
      return <div>{token}</div>;
    };

    const { getByText } = render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    // Checks for Auth0 token
    await waitFor(() => expect(getByText(accessToken)).toBeInTheDocument());
    expect(localStorage.getItem('jwt')).toBe(accessToken);
  });

  it('should handle authentication failure', async () => {
    const token = 'fakeToken';
    const email = 'test@example.com';

    mockUseAuth0.mockReturnValue({
      isAuthenticated: true,
      user: { email } as User,
      getAccessTokenSilently: jest.fn().mockResolvedValue(token),
    } as unknown as Auth0ContextInterface);

    mockAxiosPost.mockRejectedValue(new Error('Failed to authenticate'));

    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();

    const TestComponent = () => {
      const { token } = useAuth();
      return <div>{token}</div>;
    };

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    // Checks for error message when authentication fails
    await waitFor(() =>
      expect(consoleErrorSpy).toHaveBeenCalledWith(
        'Error sending user data to backend:',
        expect.any(Error)
      )
    );

    consoleErrorSpy.mockRestore();
  });
});
