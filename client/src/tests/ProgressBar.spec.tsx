// ProgressBar.spec.tsx
import { render, screen } from "@testing-library/react";
import ProgressBar from "../components/ProgressBar";

describe("ProgressBar Component", () => {
  it("renders the correct progress percentage", () => {
    render(<ProgressBar estimatedTimeTotal={100} completedTimeTotal={50}/>);
    // Check percentage complete renders
    expect(screen.getByText("50% completed")).toBeInTheDocument();
  });

  it('renders the progress bar with the correct width', () => {
    render(<ProgressBar estimatedTimeTotal={100} completedTimeTotal={75} />);

    // Check for ARIA value
    const progressBar = screen.getByRole('progressbar');
    expect(progressBar).toHaveAttribute('aria-valuenow', '75');

    // Check for width of completion bat (percentage)
    const computedStyle = window.getComputedStyle(progressBar);
    expect(computedStyle.width).toBe('75%');
  });

  it('handles zero estimated time total', () => {
    render(<ProgressBar estimatedTimeTotal={0} completedTimeTotal={0} />);
    expect(screen.getByText('0% completed')).toBeInTheDocument();

    // Check correct ARIA value with nothing completed
    const progressBar = screen.getByRole('progressbar');
    expect(progressBar).toHaveAttribute('aria-valuenow', '0');

    // Check correct progress width (percentage) when nothing is completed
    const computedStyle = window.getComputedStyle(progressBar);
    expect(computedStyle.width).toBe('0%');
  });
});