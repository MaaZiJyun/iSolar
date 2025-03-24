"use client";

import { Planet } from "@/app/solar-orbits/page";
import StarComponent from "./StarComponent";
import "@/app/styles/solar-system.css";

interface OrbitDemoProps {
  planets: Planet[];
  lifePercentage: number;
}

const OrbitDemo: React.FC<OrbitDemoProps> = ({ planets, lifePercentage }) => {
  return (
    <>
      <div className="space">
        {/* Sun */}

        <StarComponent lifePercentage={lifePercentage} sizeChange={false} />

        {/* Planets and Orbits */}
        {planets.map((planet, index) => (
          <div
            key={planet.name}
            className="orbit"
            style={{
              width: `${planet.distance * 2}px`,
              height: `${planet.distance * 2}px`,
              animationDuration: `${10 + index * 4}s`,
              zIndex: `${planets.length - index}`,
            }}
          >
            <div
              className="planet hover:cursor-pointer hover:p-5 "
              style={{
                width: `${planet.size}px`,
                height: `${planet.size}px`,
                backgroundColor: planet.color,
              }}
            ></div>
          </div>
        ))}
      </div>
    </>
  );
};
export default OrbitDemo;
