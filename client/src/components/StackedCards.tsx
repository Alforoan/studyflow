import React from "react";

const StackedCards: React.FC = () => {
  return (
    <div className="relative flex justify-center items-center">
      <div className="relative">
        <div className="absolute z-0 transform rotate-1 bg-secondaryElements p-4 w-80 shadow-md rounded-lg top-8 -left-12">
          <h2 className="text-lg font-bold mb-2">Quick Sort</h2>
          <ul className="list-disc list-inside">
            <li>YouTube Resource</li>
            <li>Blog Post Walkthrough</li>
            <li>LeetCode Problem</li>
          </ul>
          <p className="mt-4">Notes: Google Doc Notes Link</p>
          <p className="mt-1">Time Estimate: 90 Minutes</p>
          <p className="mt-1">Column: Not Started</p>
        </div>
        <div className="relative z-10 bg-secondaryElements p-4 w-80 shadow-md rounded-lg">
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
