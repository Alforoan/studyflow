// Loading.tsx
import React from "react";

interface LoadingProps {
  isLoading: boolean; // Define isLoading prop as boolean
}

const Loading: React.FC<LoadingProps> = ({ isLoading }) => {
  if (!isLoading) return null; // Render nothing if isLoading is false

  return (
    <div className="fixed inset-0 flex justify-center items-center z-50">
      <div data-testid="loading-spinner" className="w-16 h-16 border-4 border-t-4 border-t-blue-500 border-gray-200 rounded-full animate-spin"></div>
    </div>
  );
};

export default Loading;
