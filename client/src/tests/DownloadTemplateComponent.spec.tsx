// DownloadTemplateComponent.spec.tsx
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import DownloadTemplateComponent from '../components/DownloadTemplateComponent';
import { BoardProvider, useBoard } from '../context/BoardContext';
import { TemplateProvider } from '../context/TemplateContext';

// setup mock for hooks
jest.mock('../context/BoardContext');
jest.mock('../context/TemplateContext');

const renderWithProviders = (component: React.ReactElement) => {
  return render(
    <BoardProvider>
      <TemplateProvider>
        {component}
      </TemplateProvider>
    </BoardProvider>
  );
};

describe('DownloadTemplateComponent', () => {
  beforeEach(() => {
    // Mocking useBoard
    (useBoard as jest.Mock).mockReturnValue({
      selectedBoard: { name: "Test Board" },
      handleDownloadTemplate: jest.fn(),
      setIsToastSuccess: jest.fn(),
      userBoards: [{ name: "Test Board" }, { name: "Another Board" }],
      setIsTemplate: jest.fn(),
    }); 
  });

  it("shows error toast if board name is not unique", () => {
    renderWithProviders(<DownloadTemplateComponent />);

    waitFor(() => {
      const button = screen.getByText("Download Template");
      expect(button).toBeInTheDocument();

      fireEvent.click(button);

      const errorToast = screen.getByText("Error. You have a board with the same name.");
      // Check for toast error
      expect(errorToast).toBeInTheDocument();
    });
  });

  it("shows success toast and calls handleDownloadTemplate on successful download", () => {
    renderWithProviders(<DownloadTemplateComponent />);

    waitFor(() => {
      const button = screen.getByText("Download Template");
      expect(button).toBeInTheDocument();

      fireEvent.click(button);

      const successToast = screen.getByText("You have successfully downloaded the template.");
      // Check for toast success
      expect(successToast).toBeInTheDocument();
      
      const { handleDownloadTemplate } = useBoard();
      expect(handleDownloadTemplate).toHaveBeenCalled();
    });
  });
});
