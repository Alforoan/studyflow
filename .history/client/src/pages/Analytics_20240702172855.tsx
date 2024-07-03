import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import MyLineChart from "../components/LineChart";
import { UserAnalytics } from "../types";

const Analytics: React.FC = () => {
  const { user } = useAuth0();
  const [userAnalytics, setUserAnalytics] = useState<UserAnalytics>({
    numberOfBoards: 0,
    numberOfCards: 0,
    totalTimeSpent: 0,
    avgCardsPerBoard: 0,
    avgTimePerCard: 0,
  });
  const [convertedTime, setConvertedTime] = useState<string>("");
  const [type, setType] = useState<string>("all-time");
  const token = localStorage.getItem("jwt");

  function convertMinutesToHoursAndMinutes(minutes: number): {
    hours: number;
    minutes: number;
  } {
    if (minutes < 0) {
      throw new Error("Input value must be a positive number.");
    }

    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;

    return { hours, minutes: remainingMinutes };
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const endpoint = `${import.meta.env.VITE_BACKEND_URL}/api/user/analytics`;
        const response = await axios.get(endpoint, {
          params: { email: user?.email },
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = response?.data?.boards[0];
        const { hours, minutes } = convertMinutesToHoursAndMinutes(
          data?.total_time_spent || 0
        );
        setConvertedTime(`${hours}h ${minutes}m`);
        setUserAnalytics({
          numberOfBoards: data?.board_count || 0,
          numberOfCards: data?.card_count || 0,
          totalTimeSpent: data?.total_time_spent || 0,
          avgCardsPerBoard: data?.board_count ? data.board_count / data.card_count : 0,
          avgTimePerCard: data?.total_time_spent ? data.total_time_spent / data.card_count : 0,
        });
      } catch (error) {
        console.error("Error fetching user analytics:", error);
      }
    };

    fetchData();
  }, [user?.email, token]);

  const handleType = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setType(e.target.value);
  };

  return (
    <main className="flex flex-col items-center p-4">
      <div className="w-full max-w-5xl">
        <h1 className="mt-4 mb-4 font-bold text-4xl text-center">
          Hi, {user?.given_name || user?.email}
        </h1>

        <div className="flex flex-col md:flex-row md:justify-between items-center m-2">
          <label htmlFor="chart-type" className="mb-2 mr-2">
            Type
          </label>
          <select
            id="chart-type"
            className="border-2 border-custom-gray outline-none focus:outline-none rounded-md mb-4 w-full md:w-auto"
            value={type}
            onChange={handleType}
          >
            <option value="all-time">All Time</option>
            <option value="today">Today</option>
            <option value="this-week">This Week</option>
            <option value="this-month">This Month</option>
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-gray-100 p-4 rounded-lg flex flex-col items-center">
            <p className="text-gray-500 font-semibold">Total Boards</p>
            <div className="p-2 rounded-md text-2xl font-bold">
              {userAnalytics.numberOfBoards}
            </div>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg flex flex-col items-center">
            <p className="text-gray-500 font-semibold">Total Cards</p>
            <div className="p-2 rounded-md text-2xl font-bold">
              {userAnalytics.numberOfCards}
            </div>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg flex flex-col items-center">
            <p className="text-gray-500 font-semibold">
              Average Cards Per Board
            </p>
            <div className="p-2 rounded-md text-2xl font-bold">
              {userAnalytics.avgCardsPerBoard.toFixed(1)}
            </div>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg flex flex-col items-center">
            <p className="text-gray-500 font-semibold">Average Time Per Card</p>
            <div className="p-2 rounded-md text-2xl font-bold">
              {`${userAnalytics.avgTimePerCard.toFixed(1)} mins`}
            </div>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg flex flex-col items-center">
            <p className="text-gray-500 font-semibold">Total Time Spent</p>
            <div className="p-2 rounded-md text-2xl font-bold">
              {convertedTime}
            </div>
          </div>
        </div>
      </div>

      <div className="w-full max-w-5xl mt-4">
        <MyLineChart type={type} userAnalytics={userAnalytics} />
      </div>
    </main>
  );
};

export default Analytics;
