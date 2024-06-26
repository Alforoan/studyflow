import React from "react";

interface ProgressBarProps {
  estimatedTimeTotal: number;
  completedTimeTotal: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ estimatedTimeTotal, completedTimeTotal }) => {

  const progress = estimatedTimeTotal > 0 ? (completedTimeTotal / estimatedTimeTotal) * 100 : 0;

  return (
    <div className="w-3/4 mx-auto mt-8 mb-4 text-center">
      <div className="relative pt-1">
        <div className="overflow-hidden h-5 mb-4 flex rounded bg-secondaryElements">
        <div
            style={{ width: `${progress}%` }}
            className="shadow-none flex flex-col whitespace-nowrap  justify-center bg-green-500"
          >
          </div>
        </div>
      </div>
      <p className="font-primary">{Math.round(progress)}% completed</p>
    </div>
  );
};

export default ProgressBar;