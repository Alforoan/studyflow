// // Navbar.spec.tsx
// import { render, screen, fireEvent } from '@testing-library/react';
// import Navbar from '../components/Navbar';
// import { MemoryRouter } from 'react-router-dom';
// import { useAuth0 } from "@auth0/auth0-react";

// jest.mock('../assets/noun-study-logo2.png', () => 'test-file-stub'); // Mock the image import
// jest.mock('@auth0/auth0-react'); // Mock Auth0

// describe('Navbar Component', () => {

//   const mockAuth0 = {
//     isAuthenticated: false,
//     loginWithRedirect: jest.fn(),
//     logout: jest.fn(),
//     getIdTokenClaims: jest.fn(),
//     getAccessTokenSilently: jest.fn(),
//     isLoading: false,
//   };

//   beforeEach(() => {
//     // Clear mock calls before each test
//     jest.clearAllMocks();

//     // Apply mock implementation for useAuth0
//     (useAuth0 as jest.Mock).mockReturnValue(mockAuth0);
//   });

//   const renderWithRouter = (component: React.ReactElement) => {
//     return render(<MemoryRouter>{component}</MemoryRouter>);
//   };

//   test("renders the Navbar component", () => {
//     renderWithRouter(<Navbar />);
    
//     // Check if StudyFlow text is rendered in the Navbar
//     const studyFlowText = screen.getByText(/StudyFlow/i);
//     expect(studyFlowText).toBeInTheDocument();
  
//     // Check if the logo is rendered
//     const logoImage = screen.getByAltText('Logo');
//     expect(logoImage).toBeInTheDocument();
//   });

//   test("renders the correct links for unauthed users, 'Log in', 'Sign up'", () => {
//     renderWithRouter(<Navbar />);

//     // Check if Login and Register buttons are rendered for unauthed users
//     const loginButton = screen.getByText(/Log in/i);
//     const registerButton = screen.getByText(/Sign up/i);
//     expect(loginButton).toBeInTheDocument();
//     expect(registerButton).toBeInTheDocument();
//   });

//   test('redirects to Auth0 Universal Login when Log in is clicked', async () => {
//     renderWithRouter(<Navbar />);
  
//     // Get the login button element
//     const loginButton = screen.getByText(/Log in/i);
  
//     // Simulate clicking the button
//     fireEvent.click(loginButton);
  
//     // Assert that loginWithRedirect is called on the mocked useAuth0
//     expect(useAuth0().loginWithRedirect).toHaveBeenCalledTimes(1);
//   });

//   test("renders correct links when user is authorized, 'Home', 'Account', 'Log out'", () => {
//   // Set mockAuth0 to reflect an authenticated user
//   mockAuth0.isAuthenticated = true;

//   (useAuth0 as jest.Mock).mockReturnValue(mockAuth0);

//   renderWithRouter(<Navbar />);

//   // Check if Home link is rendered
//   const homeLink = screen.getByText(/Home/i);
//   expect(homeLink).toBeInTheDocument();

//   // Check if Account link is rendered
//   const accountLink = screen.getByText(/Account/i);
//   expect(accountLink).toBeInTheDocument();

//   // Check if Log out button is rendered
//   const logoutButton = screen.getByText(/Log out/i);
//   expect(logoutButton).toBeInTheDocument();
//   });
// });
