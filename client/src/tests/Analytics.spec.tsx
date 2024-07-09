// Analytics.spec.tsx
// import { render, screen, waitFor, fireEvent } from "@testing-library/react";
// import Analytics from "../components/AnalyticsComponent";
// import axios from "axios";
// import { useAuth0 } from "@auth0/auth0-react";
// import { BoardProvider } from "../context/BoardContext";
// import MyLineChart from "../components/LineChart";

// setup mocks
// jest.mock("@auth0/auth0-react");
// jest.mock("axios");
// jest.mock("../components/LineChart");
// jest.mock("../context/BoardContext");

describe("Analytics Component", () => {
  test("random test", () => {
    console.log("hi there");
  });
  // const mockUser = {
  //   email: "testuser@example.com",
  //   given_name: "Test User",
  // };

  // const mockAuth0 = {
  //   user: mockUser,
  // };

  // const mockAnalyticsData = {
  //   boards: [{
  //     board_count: 5,
  //     card_count: 50,
  //     total_time_spent: 300, // minutes
  //   }],
  // };

  // beforeEach(() => {
  //   (useAuth0 as jest.Mock).mockReturnValue(mockAuth0);
  //   (axios.get as jest.Mock).mockResolvedValue({ data: mockAnalyticsData });
  //   jest.clearAllMocks();
  // });

  // const renderWithProviders = (component: React.ReactElement) => {
  //   return render(
  //     <BoardProvider>{component}</BoardProvider>
  //   );
  // };

  // it("renders the Analytics component and fetches data", () => {
  //   renderWithProviders(<Analytics />);

  //   // Wait for data to be fetched and displayed
  //   waitFor(() => {
  //     const totalBoards = screen.getByText(/Total Boards/i);
  //     expect(totalBoards).toBeInTheDocument();
  //     const totalCards = screen.getByText(/Total Cards/i);
  //     expect(totalCards).toBeInTheDocument();
  //     const avgCardsPerBoard = screen.getByText(/Average Cards Per Board/i);
  //     expect(avgCardsPerBoard).toBeInTheDocument();
  //     const avgTimePerCard = screen.getByText(/Average Time Per Card/i);
  //     expect(avgTimePerCard).toBeInTheDocument();
  //     const totalTimeSpent = screen.getByText(/Total Time Spent/i);
  //     expect(totalTimeSpent).toBeInTheDocument();

  //     // Check the values
  //     expect(screen.getByText("5")).toBeInTheDocument();
  //     expect(screen.getByText("50")).toBeInTheDocument();
  //     expect(screen.getByText("0.1")).toBeInTheDocument(); // avgCardsPerBoard
  //     expect(screen.getByText("6.0 mins")).toBeInTheDocument(); // avgTimePerCard
  //     expect(screen.getByText("5h 0m")).toBeInTheDocument(); // convertedTime
  //   });
  // });

  // it("handles chart type selection", () => {
  //   renderWithProviders(<Analytics />);

  //   // Verify the change
  //   waitFor(() => {
  //      const selectElement = screen.getByLabelText(/Select chart type/i);
  //      fireEvent.change(selectElement, { target: { value: "today" } });
  //     expect((selectElement as HTMLSelectElement).value).toBe("today");
  //   });
  // });

  // it("renders MyLineChart component with correct props", () => {
  //   renderWithProviders(<Analytics />);

  //   // Checks for correct fields in component
  //   waitFor(() => {
  //     expect(MyLineChart).toHaveBeenCalledWith(
  //       expect.objectContaining({
  //         type: "all-time",
  //         userAnalytics: {
  //           numberOfBoards: 5,
  //           numberOfCards: 50,
  //           totalTimeSpent: 300,
  //           avgCardsPerBoard: 0.1,
  //           avgTimePerCard: 6,
  //         },
  //       }),
  //       expect.anything()
  //     );
  //   });
  // });
});