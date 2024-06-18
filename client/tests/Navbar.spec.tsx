// Navbar.spec.tsx
import { render, screen } from '@testing-library/react';
import Navbar from '../src/components/Navbar';
import { MemoryRouter } from 'react-router-dom';

jest.mock('../src/assets/noun-study-logo2.png', () => 'test-file-stub'); // Mock the image import

describe('Navbar Component', () => {

  beforeEach(() => {
    // Clear mock calls before each test
    jest.clearAllMocks();
  });

  const renderWithRouter = (component: React.ReactElement) => {
    return render(<MemoryRouter>{component}</MemoryRouter>);
  };

  test("renders the Navbar component", () => {
    renderWithRouter(<Navbar />);
    
    // Check if StudyFlow text is rendered in the Navbar
    const studyFlowText = screen.getByText(/StudyFlow/i);
    expect(studyFlowText).toBeInTheDocument();
  
    // Check if the logo is rendered
    const logoImage = screen.getByAltText('Logo');
    expect(logoImage).toBeInTheDocument();
  });

  test("renders the correct links for unauthed users", () => {
    renderWithRouter(<Navbar />);

    // Check if Login and Register buttons are rendered for unauthed users
    const loginButton = screen.getByText(/Log in/i);
    const registerButton = screen.getByText(/Sign up/i);
    expect(loginButton).toBeInTheDocument();
    expect(registerButton).toBeInTheDocument();
  });
});
