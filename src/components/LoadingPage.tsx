import React from "react";

interface LoadingPageProps {
  processing: number; // Progress percentage (0–100)
}

const LoadingPage: React.FC<LoadingPageProps> = ({ processing }) => {
  return (
    <div className="h-screen flex flex-col items-center justify-center opening-bg">
      {/* "LOADING" Text */}
      <span className="text-6xl text-white mb-6">LOADING</span>

      {/* Processing Bar */}
      <div className="w-1/2 h-4 border-2 border-white rounded-full overflow-hidden">
        <div
          className="h-full bg-white transition-all duration-150"
          style={{ width: `${processing}%` }} // Set width dynamically
        ></div>
      </div>
    </div>
  );
};

export default LoadingPage;
