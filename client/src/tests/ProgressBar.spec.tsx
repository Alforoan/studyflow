// import { render, screen } from "@testing-library/react";
// import ProgressBar from "../components/ProgressBar";

// describe("ProgressBar Component", () => {
//   test("renders the correct progress percentage", () => {
//     render(<ProgressBar estimatedTimeTotal={100} completedTimeTotal={50}/>);
//     expect(screen.getByText("50% completed")).toBeInTheDocument();
//   });

//   test('renders the progress bar with the correct width', () => {
//     render(<ProgressBar estimatedTimeTotal={100} completedTimeTotal={75} />);
//     const progressBar = screen.getByRole('progressbar');
//     expect(progressBar).toHaveAttribute('aria-valuenow', '75');

//     const progressInnerBar = progressBar.firstChild as HTMLElement;
//     expect(progressInnerBar).toHaveStyle('width: 75%');
//   });

//   test('handles zero estimated time total', () => {
//     render(<ProgressBar estimatedTimeTotal={0} completedTimeTotal={0} />);
//     expect(screen.getByText('0% completed')).toBeInTheDocument();
//     const progressBar = screen.getByRole('progressbar');
//     expect(progressBar).toHaveAttribute('aria-valuenow', '0');

//     const progressInnerBar = progressBar.firstChild as HTMLElement;
//     expect(progressInnerBar).toHaveStyle('width: 0%');
//   });
// });