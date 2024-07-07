import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import MyLineChart from "./LineChart";

interface UserAnalytics {
  numberOfBoards: number;
  numberOfCards: number;
  totalTimeSpent: number;
  avgCardsPerBoard: number;
  avgTimePerCard: number;
}

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
        const endpoint = `${
          import.meta.env.VITE_BACKEND_URL
        }/api/user/analytics`;
        const response = await axios.get(endpoint, {
          params: {
            email: user?.email,
          },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = response?.data?.boards[0];
        const { hours, minutes } = convertMinutesToHoursAndMinutes(
          data?.total_time_spent
        );
        setConvertedTime(`${hours}h ${minutes}m`);
        setUserAnalytics({
          numberOfBoards: data?.board_count,
          numberOfCards: data?.card_count,
          totalTimeSpent: data?.total_time_spent,
          avgCardsPerBoard: data?.board_count / data?.card_count,
          avgTimePerCard: data?.total_time_spent / data?.card_count,
        });
      } catch (error) {
        console.error("Error fetching user analytics:", error);
      }
    };

    fetchData();
  }, []);

  const handleType = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const chosenType = e.target.value;
    setType(chosenType);
  };

  return (
    <main className="flex mt-12 flex-col items-center">
      <div className="w-full max-w-5xl">
        {user?.given_name !== "" ? (
          <h1 className="mt-4 mb-4 font-bold text-4xl">
            Hi, {user?.given_name}
          </h1>
        ) : (
          <h1 className="mt-4 mb-4 font-bold text-4xl">Hi, {user?.email}</h1>
        )}

        <div className="flex items-center md:items-start m-2">
          <label htmlFor="chart-type" className="mb-2 mr-2">
            Type
          </label>
          <select
            id="chart-type"
            aria-label="Select chart type"
            className="border-2 border-custom-gray outline-none focus:outline-none rounded-md mb-4 w-full md:w-auto"
            onChange={(e) => handleType(e)}
          >
            <option value="all-time">All Time</option>
            <option value="today">Today</option>
            <option value="this-week">This Week</option>
            <option value="this-month">This Month</option>
          </select>
        </div>
        <div className="flex justify-start items-center flex-wrap">
          <div className="bg-gray-100 p-4 rounded-lg m-2 w-full max-w-xs md:w-1/3 flex flex-col items-center">
            <p className="text-gray-700 font-semibold">Total Boards</p>
            <div className="p-2 rounded-md text-2xl font-bold">
              {userAnalytics.numberOfBoards}
            </div>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg m-2 w-full max-w-xs md:w-1/3 flex flex-col items-center">
            <p className="text-gray-700 font-semibold">Total Cards</p>
            <div className="p-2 rounded-md text-2xl font-bold">
              {userAnalytics.numberOfCards}
            </div>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg m-2 w-full max-w-xs md:w-1/3 flex flex-col items-center">
            <p className="text-gray-700 font-semibold">
              Average Cards Per Board
            </p>
            <div className="p-2 rounded-md text-2xl font-bold">
              {userAnalytics.avgCardsPerBoard.toFixed(1)}
            </div>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg m-2 w-full max-w-xs md:w-1/3 flex flex-col items-center">
            <p className="text-gray-700 font-semibold">Average Time Per Card</p>
            <div className="p-2 rounded-md text-2xl font-bold">
              {`${userAnalytics.avgTimePerCard.toFixed(1)} mins`}
            </div>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg m-2 w-full max-w-xs md:w-1/3 flex flex-col items-center">
            <p className="text-gray-700 font-semibold">Total Time Spent</p>
            <div className="p-2 rounded-md text-2xl font-bold">
              {convertedTime}
            </div>
          </div>
        </div>
      </div>

      <div className="w-full max-w-5xl">
        <MyLineChart type={type} userAnalytics={userAnalytics} />
      </div>
    </main>
  );
};

export default Analytics;
