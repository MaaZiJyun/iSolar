import React, { useEffect, useState } from "react";
import "@/app/styles/star-styles.css"

// Star properties definitions
const starProperties = [
  {
    name: "I: Protostar",
    color: "rgba(255, 0, 0, 1)", // Red
    glow: `rgba(255, 100, 100, 0.5)`,
    size: "100px", // Small
  },
  {
    name: "II: Main sequence",
    color: "rgba(255, 255, 0, 1)", // Yellow
    glow: `rgba(255, 255, 100, 0.5)`,
    size: "200px", // Medium
  },
  {
    name: "III: Red giant",
    color: "rgba(255, 100, 100, 1)", // Red
    glow: `rgba(255, 100, 100, 0.5)`,
    size: "400px", // Very large
  },
  {
    name: "IV. White dwarf",
    color: "rgba(200, 200, 255, 1)", // Blue-white
    glow: `rgba(200, 200, 255, 0.5)`,
    size: "120px", // Small
  },
  {
    name: "VI. Black dwarf",
    color: "rgba(0, 0, 0, 1)", // Black
    glow: "rgba(100, 100, 100, 1)",
    size: "50px", // Smallest
  },
];

const StarComponent = ({ lifePercentage }: { lifePercentage: number }) => {
  // Determine the star index based on the life percentage
  const getStarIndex = (percentage: number) => {
    if (percentage > 75) return 0; // Protostar
    if (percentage > 50) return 1; // Main sequence
    if (percentage > 25) return 2; // Red giant
    if (percentage > 1) return 3; // White dwarf
    return 4; // Black dwarf
  };

  const starIndex = getStarIndex(lifePercentage);
  const currentStarProperties = starProperties[starIndex];

  return (
    <div
      className="star"
      style={{
        backgroundColor: currentStarProperties.color,
        width: currentStarProperties.size,
        height: currentStarProperties.size,
      }}
    >
      <div
        className="glow"
        style={{
          backgroundColor: currentStarProperties.glow,
          width: "150%", // Glow width
          height: "150%", // Glow height
          opacity: 0.5, // Set opacity
        }}
      />
    </div>
  );
};

export default StarComponent;
