// ProgressBar.spec.tsx
import { render, screen } from "@testing-library/react";
import ProgressBar from "../components/ProgressBar";
import { BoardContext } from '../context/BoardContext';


const renderWithContext = (contextValues: any) => {
  return render(
    <BoardContext.Provider value={contextValues}>
      <ProgressBar />
    </BoardContext.Provider>
  );
};

describe("ProgressBar Component", () => {
  it("renders the correct progress percentage", () => {
    // Mock context values for this test
    const contextValues = {
      completedTimeTotal: 50,
      estimatedTimeTotal: 100,
    };

    renderWithContext(contextValues);

    // Check percentage complete renders
    expect(screen.getByText("50% completed")).toBeInTheDocument();
  });

  it("renders the progress bar with the correct width", () => {
    // Mock context values for this test
    const contextValues = {
      completedTimeTotal: 75,
      estimatedTimeTotal: 100,
    };

    renderWithContext(contextValues);

    // Check for ARIA value
    const progressBar = screen.getByRole("progressbar");
    expect(progressBar).toHaveAttribute("aria-valuenow", "75");

    // Check for width of completion bar (percentage)
    const computedStyle = window.getComputedStyle(progressBar);
    expect(computedStyle.width).toBe("75%");
  });

  it("handles zero estimated time total", () => {
    // Mock context values for this test
    const contextValues = {
      completedTimeTotal: 0,
      estimatedTimeTotal: 0,
    };

    renderWithContext(contextValues);

    expect(screen.getByText("0% completed")).toBeInTheDocument();

    // Check correct ARIA value with nothing completed
    const progressBar = screen.getByRole("progressbar");
    expect(progressBar).toHaveAttribute("aria-valuenow", "0");

    // Check correct progress width (percentage) when nothing is completed
    const computedStyle = window.getComputedStyle(progressBar);
    expect(computedStyle.width).toBe("0%");
  });
});