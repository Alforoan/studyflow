//StackedCards.tsx
import React from "react";

const StackedCards: React.FC = () => {
  return (
    <div className="relative flex justify-center items-center text-primaryText pb-8">
      <div className="relative">
        <div className="absolute z-0 transform p-4 lg:w-80 shadow-md rounded-lg top-12 -left-8 lg:-left-20 lg:top-20 md:w-80"
        style={{ backgroundColor: "#FEFCBF" }}
        >
          <h2 className="text-lg font-bold mb-2">Quick Sort</h2>
          <ul className="list-disc list-inside">
            <li>YouTube Resource</li>
            <li>Blog Post Walkthrough</li>
            <li>LeetCode Problem</li>
          </ul>
          <p className="mt-4">Notes: Google Doc Notes Link</p>
          <p className="mt-1">Time Estimate: 90 Minutes</p>
          <p className="mt-1">Column: Backlog</p>
        </div>
        <div className="relative z-10 p-4 lg:w-80 md:w-80 shadow-md rounded-lg -right-8 lg:-right-20 lg:-top-36"
        style={{ backgroundColor: "#bee3f8" }}
        >
          <h2 className="text-lg font-bold mb-2">Merge Sort</h2>
          <ul className="list-disc list-inside">
            <li>YouTube Resource</li>
            <li>Blog Post Walkthrough</li>
            <li>LeetCode Problem</li>
          </ul>
          <p className="mt-4">Notes: Google Doc Notes Link</p>
          <p className="mt-1">Time Estimate: 120 Minutes</p>
          <p className="mt-1">Column: In Progress</p>
        </div>
      </div>
    </div>
  );
};

export default StackedCards;
