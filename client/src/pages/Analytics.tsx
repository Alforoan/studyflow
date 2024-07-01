import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth0 } from '@auth0/auth0-react';
import { LineChart } from "@mui/x-charts/LineChart";
import MyLineChart from '../components/LineChart';

interface UserAnalytics {
  numberOfBoards: number;
  numberOfCards: number;
  totalTimeSpent: number;
}

const Analytics: React.FC = () => {
  const { user } = useAuth0();
  const [userAnalytics, setUserAnalytics] = useState<UserAnalytics>({
    numberOfBoards: 0,
    numberOfCards: 0,
    totalTimeSpent: 0,

  });
  const [convertedTime, setConvertedTime] = useState<string>('');
  const token = localStorage.getItem('jwt');
  
  function convertMinutesToHoursAndMinutes(minutes: number): { hours: number, minutes: number } {
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
          params: {
            email: user?.email,
          },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log({response});
        
        setUserAnalytics({numberOfBoards: response?.data?.boards[0]?.board_count, numberOfCards: response?.data?.boards[0]?.card_count, totalTimeSpent: response?.data?.boards[0]?.total_time_spent});

        const { hours, minutes } = convertMinutesToHoursAndMinutes(
          userAnalytics?.totalTimeSpent
        );
        setConvertedTime(`${hours}h ${minutes}m`);
      } catch (error) {
        console.error("Error fetching user analytics:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <main className="flex flex-col items-center">
      <div className="w-full max-w-5xl">
        <div className="flex items-center md:items-start m-2">
          <label htmlFor="chart-type" className="mb-2 mr-2">
            Type
          </label>
          <select
            id="chart-type"
            className="border-2 border-custom-gray outline-none focus:outline-none rounded-md mb-4 w-full md:w-auto"
          >
            <option value="today">Today</option>
            <option value="this-week">This Week</option>
            <option value="this-month">This Month</option>
            <option value="all-time">All Time</option>
          </select>
        </div>
        <div className="flex justify-start items-center flex-wrap">
          <div className="bg-gray-100 p-4 rounded-lg m-2 w-full max-w-xs md:w-1/3 flex flex-col items-center">
            <p className="text-gray-500 font-semibold">Total Boards</p>
            <div className="p-2 rounded-md text-2xl font-bold">
              {userAnalytics.numberOfBoards}
            </div>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg m-2 w-full max-w-xs md:w-1/3 flex flex-col items-center">
            <p className="text-gray-500 font-semibold">Total Cards</p>
            <div className="p-2 rounded-md text-2xl font-bold">
              {userAnalytics.numberOfCards}
            </div>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg m-2 w-full max-w-xs md:w-1/3 flex flex-col items-center">
            <p className="text-gray-500 font-semibold">Total Time Spent</p>
            <div className="p-2 rounded-md text-2xl font-bold">
              {convertedTime}
            </div>
          </div>
        </div>
      </div>

      <div className="w-full max-w-5xl">
        <MyLineChart />
      </div>
    </main>
  );
};

export default Analytics;
