// AuthHandler.spec.tsx
// import { render } from "@testing-library/react";
// import axios from "axios";
// import AuthHandler from "../components/AuthHandler";
// import { act } from "react";

// jest.mock('@auth0/auth0-react', () => ({
//   useAuth0: () => ({
//     isAuthenticated: true,
//     user: { email: 'test@example.com' },
//     getAccessTokenSilently: jest.fn().mockResolvedValue('fakeToken'),
//   }),
// }));

// jest.mock('axios');

describe('AuthHandler Component', () => {
  test("random test", () => {
    console.log("hi there");
  }); 
  // it('should handle authentication and set token in localStorage', async () => {
  //   const mockPost = jest.spyOn(axios, 'post').mockResolvedValue({
  //     data: { access_token: 'fakeAccessToken' },
  //   });

  //   await act(async () => {
  //     render(<AuthHandler />);
  //   });

  //   expect(mockPost).toHaveBeenCalledTimes(1);
  //   expect(mockPost).toHaveBeenCalledWith(
  //     expect.stringContaining('/api/signin'),
  //     {
  //       email: 'test@example.com',
  //       token: 'fakeToken',
  //     },
  //     {
  //       headers: {
  //         Authorization: 'Bearer fakeToken',
  //       },
  //     }
  //   );
  // });

  // it('handles authentication and sends user data to backend', async () => {
  //   const mockedAxios = axios as jest.Mocked<typeof axios>;
  //   mockedAxios.post.mockResolvedValue({ data: 'Mock response' });

  //   await act(async () => {
  //     render(<AuthHandler />);
  //   });

  //   // Ensure that axios.post is called with the correct endpoint and data
  //   expect(mockedAxios.post).toHaveBeenCalledWith(
  //     'http://mocked.url/api/signin',
  //     {
  //       email: 'test@example.com',
  //       token: 'fakeToken',
  //     },
  //     {
  //       headers: {
  //         Authorization: 'Bearer fakeToken',
  //       },
  //     }
  //   );
  // });
});