// Navbar.spec.tsx
import { render, screen } from '@testing-library/react';
import Navbar from '../src/components/Navbar';

jest.mock('../src/assets/noun-study-logo2.png', () => 'test-file-stub'); // Mock the image import

describe('Navbar Component', () => {

  beforeEach(() => {
    // Clear mock calls before each test
    jest.clearAllMocks();
  });

  test("renders the Navbar component", () => {
    render(<Navbar />);
    
    // Check if StudyFlow text is rendered in the Navbar
    const studyFlowText = screen.getByText(/StudyFlow/i);
    expect(studyFlowText).toBeInTheDocument();
  
    // Check if the logo is rendered
    const logoImage = screen.getByAltText('Logo');
    expect(logoImage).toBeInTheDocument();
  });

  test("renders the correct links for unauthed users", () => {
    render(<Navbar />);

    // Check if Login and Register buttons are rendered for unauthed users
    const loginButton = screen.getByText(/Log in/i);
    const registerButton = screen.getByText(/Register/i);
    expect(loginButton).toBeInTheDocument();
    expect(registerButton).toBeInTheDocument();
  });
});
