import React from "react";

interface GlassWindowProps {
  isOpen: boolean; // Whether the widget is open
  onClose: () => void; // Function to close the widget
  children: React.ReactNode; // Content to display inside the widget
}

const GlassWindow: React.FC<GlassWindowProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null; // Don't render if the widget is not open

  return (
    <div
      className="bg-black-white-10 fixed h-full w-full inset-0 flex items-center justify-center backdrop-blur-xs z-50"
      onClick={onClose} // Close widget when clicking outside
    >
      <div
        className="flex flex-col items-center justify-between w-1/3 bg-black-white-10 backdrop-blur-md p-6 rounded-xl shadow-lg"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
      >
        {children}
        <button
          className="mt-4 px-4 py-2 rounded-lg text-red-500 hover:bg-red-500 hover:text-white"
          onClick={onClose} // Close button
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default GlassWindow;
