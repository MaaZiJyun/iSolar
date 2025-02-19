import React, { useEffect, useState } from "react";
import "@/app/styles/star-styles.css";

interface StarComponentProps {
  lifePercentage: number; // Ensure this prop is defined
  sizeChange: boolean;
}

const StarComponent: React.FC<StarComponentProps> = ({
  lifePercentage,
  sizeChange,
}) => {
  const emoji = ["▔＾▔", "▔▽▔", "▔皿▔", "▔︵▔", "▔ω▔", "▔﹏▔"];
  const starProperties = [
    {
      name: "I: Protostar",
      color: "rgba(222, 0, 0, 1)", // Red
      glow: `rgba(255, 100, 100, 0.5)`,
      size: 150, // Small
    },
    {
      name: "II: Main sequence",
      color: "rgba(222, 222, 0, 1)", // Yellow
      glow: `rgba(255, 255, 100, 0.5)`,
      size: 250, // Medium
    },
    {
      name: "III: Red giant",
      color: "rgba(222, 100, 100, 1)", // Red
      glow: `rgba(255, 100, 100, 0.5)`,
      size: 500, // Very large
    },
    {
      name: "IV. White dwarf",
      color: "rgba(200, 200, 255, 1)", // Blue-white
      glow: `rgba(200, 200, 255, 0.5)`,
      size: 200, // Small
    },
    {
      name: "VI. Black dwarf",
      color: "rgba(0, 0, 0, 1)", // Black
      glow: "rgba(100, 100, 100, 1)",
      size: 150, // Smallest
    },
  ];

  const getStarIndex = (percentage: number) => {
    if (percentage > 75) return 0; // Protostar
    else if (percentage > 50) return 1; // Main sequence
    else if (percentage > 25) return 2; // Red giant
    else if (percentage > 1) return 3; // White dwarf
    else return 4; // Black dwarf
  };

  const currentStarProperties = starProperties[getStarIndex(lifePercentage)];

  return (
    <div
      className="star w-10 h-10"
      style={
        sizeChange
          ? {
              backgroundColor: currentStarProperties.color,
              width: `${currentStarProperties.size}px`,
              height: `${currentStarProperties.size}px`,
            }
          : {
              backgroundColor: currentStarProperties.color,
            }
      }
    >
      {/* <div
        className={`absolut emoji flex items-center justify-center w-full h-full`}
        style={{ fontSize: `${currentStarProperties.size / 5}px` }}
      >
        <div className="mt-8">▔＾▔</div>
      </div> */}
      <div
        className="glow"
        style={{
          backgroundColor: currentStarProperties.glow,
          width: "150%", // Glow width
          height: "150%", // Glow height
          opacity: 0.5, // Set opacity
        }}
      ></div>
    </div>
  );
};

export default StarComponent;
