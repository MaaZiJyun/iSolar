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
      className="glass fixed inset-0 flex items-center justify-center backdrop-blur-xs z-50"
      onClick={onClose} // Close widget when clicking outside
    >
      <div
        className="bg-white/20 p-6 rounded-xl text-white shadow-lg"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
      >
        {children}
        <button
          className="mt-4 px-4 py-2 bg-red-500 rounded-lg hover:bg-red-600"
          onClick={onClose} // Close button
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default GlassWindow;
