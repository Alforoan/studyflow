import React from "react";

interface ProgressBarProps {
  estimatedTimeTotal: number;
  completedTimeTotal: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ estimatedTimeTotal, completedTimeTotal }) => {

  const progress = estimatedTimeTotal > 0 ? (completedTimeTotal / estimatedTimeTotal) * 100 : 0;

  return (
    <div className="w-3/4 mx-auto mt-4 text-center">
      <div className="overflow-hidden relative h-5 mb-4 flex rounded bg-secondaryElements"
        role="progressbar"
        aria-valuenow={progress}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label="Progress"
      >
        <div
          style={{ width: `${progress}%`, transition: 'width 0.75s ease' }}
          className="h-full flex justify-center bg-green-500"
        >
        </div>
      </div>
      <p className="font-primary dark:text-dark-primaryText">{Math.round(progress)}% completed</p>
    </div>
  );
};

export default ProgressBar;