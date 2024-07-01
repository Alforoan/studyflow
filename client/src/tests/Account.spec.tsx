// // Account.spec.tsx
// import { render, screen, waitFor } from '@testing-library/react';
// import Account from "../pages/Account";
// import { useAuth0 } from "@auth0/auth0-react"; // Import useAuth0

// jest.mock('@auth0/auth0-react'); // Mock useAuth0

// jest.mock('../components/PassChange', () => ({
//   __esModule: true,
//   default: () => (
//     <div data-testid="passchange">
//       Mock PassChange component
//       <button>Reset password</button>
//     </div>
//   ),
// }));

// describe("Account Page", () => {
//   beforeEach(() => {
//     // Mock useAuth0 to return authenticated state
//     (useAuth0 as jest.Mock).mockReturnValue({
//       user: {
//         nickname: 'testuser',
//         email: 'testuser@example.com',
//         picture: 'https://example.com/profile.jpg',
//       },
//       isAuthenticated: true,
//     });

//     jest.clearAllMocks(); // Clear mock calls before each test
//   });

//   test('renders Account page', () => {
//     render(<Account />);

//     // Check if Account Actions is rendered
//     expect(screen.getByText(/Account Actions/i)).toBeInTheDocument();
//   });

//   test('renders Profile component', () => {
//     render(<Account />);

//     // Check if the Profile component is rendered
//     expect(screen.getByTestId('profile')).toBeInTheDocument();
//   });

//   test('renders PassChange component with "Reset password" button', async () => {
//     render(<Account />);
//     await waitFor(() => {
//       expect(screen.getByText(/Reset password/i)).toBeInTheDocument();
//     });
//   });
// });
