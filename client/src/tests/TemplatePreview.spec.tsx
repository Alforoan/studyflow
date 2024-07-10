// TemplatePreview.spec.tsx
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import TemplatePreview from '../components/TemplatePreview';
import { Template } from '../types';
import { useTemplates } from '../context/TemplateContext';
import { useBoard } from '../context/BoardContext';
import { useDeleteBoard } from '../hooks/useAPI';

jest.mock('../context/TemplateContext');
jest.mock('../context/BoardContext');
jest.mock('../hooks/useAPI');

describe('TemplatePreview Component', () => {
  const mockTemplate: Template = {
    uuid: '1',
    author: 'TestUser',
    name: 'Internet Template',
    downloads: 10,
    cards: [],
  };

  beforeEach(() => {
    (useTemplates as jest.Mock).mockReturnValue({
      setIsTemplate: jest.fn(),
      setUserTemplates: jest.fn(),
      templateIsOwned: true,
    });

    (useBoard as jest.Mock).mockReturnValue({
      setSelectedBoard: jest.fn(),
      setIsSearching: jest.fn(),
      isLoading: false,
      setIsToastSuccess: jest.fn(),
    });

    (useDeleteBoard as jest.Mock).mockReturnValue({
      deleteBoard: jest.fn(),
    });
  });

  it('renders template details correctly', () => {
    render(<TemplatePreview template={mockTemplate} />);

    // Check for all template details present
    waitFor(() => {
      const templateName = screen.getByText('Internet Template');
      const totalCards = screen.getByText('Total cards:');
      const totalDownloads = screen.getByText('Downloads:');
      const length = screen.getByText('Length:');
      const author = screen.getByText('Author: TestUser');
  
      expect(templateName).toBeInTheDocument();
      expect(totalCards).toBeInTheDocument();
      expect(totalDownloads).toBeInTheDocument();
      expect(length).toBeInTheDocument();
      expect(author).toBeInTheDocument();
    })
  });

  it('clicking on template triggers select actions', () => {
    render(<TemplatePreview template={mockTemplate} />);

    const templateElement = screen.getByText('Internet Template');
    fireEvent.click(templateElement);

    // Assuming setSelectedBoard and setIsTemplate are called correctly
    expect(useBoard().setSelectedBoard).toHaveBeenCalledWith(mockTemplate);
    expect(useTemplates().setIsTemplate).toHaveBeenCalledWith(true);
    expect(useBoard().setIsSearching).toHaveBeenCalledWith(false);
  });

  it('clicking delete icon opens delete confirmation modal', () => {
    render(<TemplatePreview template={mockTemplate} />);

    // Check for deletion confirmationo
    waitFor(() => {
      const deleteIcon = screen.getByLabelText('Delete Template');
      fireEvent.click(deleteIcon);
  
      const confirmDeleteModal = screen.getByText('Are you sure you want to delete this template?');
      expect(confirmDeleteModal).toBeInTheDocument();
    })
  });

  it('canceling delete action closes delete confirmation modal', () => {
    render(<TemplatePreview template={mockTemplate} />);

    // Check that Cancel a delete functions correctly
    waitFor(() => {
      const deleteIcon = screen.getByLabelText('Delete Template');
      fireEvent.click(deleteIcon);
  
      const cancelDeleteButton = screen.getByText('Cancel');
      fireEvent.click(cancelDeleteButton);
  
      const confirmDeleteModal = screen.queryByText('Are you sure you want to delete this template?');
      expect(confirmDeleteModal).not.toBeInTheDocument();
    })
  });
});
