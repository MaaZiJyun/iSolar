"use client";
import React, { useState } from "react";
import { LightBulbIcon, XMarkIcon } from "@heroicons/react/24/outline";
import dayjs from "dayjs";
import "@/app/styles/light-container-style.css";
import CubeClass from "@/modules/CubeClass";
import UserClass from "@/modules/UserClass";
import { useRouter } from "next/navigation";
import "@/app/styles/cube.css";
import TaskList from "./TaskList";

interface CubeProps {
  order: number;
  user: UserClass;
  cube: CubeClass;
}

const Cube: React.FC<CubeProps> = ({ order, user, cube }) => {
  if (!cube) return null;

  const [isWidgetOpen, setIsWidgetOpen] = useState(false);
  const [emojiIndex, setEmojiIndex] = useState(0);
  const currentDate = dayjs().format("YYYY-MM-DD");
  const router = useRouter();
  const isToday = cube.date === currentDate;

  const emoji = ["▔＾▔", "▔▽▔"];

  const handleRedirect = () => {
    router.push(
      `/chat?date=${encodeURIComponent(cube.date)}&userId=${encodeURIComponent(
        user.id
      )}`
    );
  };

  const getColorByPercentage = (percentage: number): string => {
    if (percentage >= 80) return "text-green-500 bg-green-500/20";
    if (percentage >= 60) return "text-green-500 bg-lime-500/20";
    if (percentage >= 40) return "text-yellow-500 bg-yellow-500/20";
    if (percentage >= 20) return "text-orange-500 bg-orange-500/20";
    return "text-red-500 bg-red-500/20";
  };

  const getWaveColorByPercentage = (percentage: number): string => {
    if (percentage >= 80) return "rgba(34,197,94,0.4)"; // green-500
    if (percentage >= 60) return "rgba(132,204,22,0.4)"; // lime-500
    if (percentage >= 40) return "rgba(234,179,8,0.4)"; // yellow-500
    if (percentage >= 20) return "rgba(249,115,22,0.4)"; // orange-500
    return "rgba(239,68,68,0.4)"; // red-500
  };

  const getBackgroundClass = () => {
    if (isToday && cube.percentage === 0) return "opening-bg";
    if (cube.id !== -1) return getColorByPercentage(cube.percentage);
    return "";
  };

  return (
    <>
      <div
        id={`${order}`}
        className={`relative overflow-hidden rounded-2xl m-1 aspect-square cursor-pointer
    transition duration-200 ease-in-out flex flex-col items-center justify-center border border-white/10 backdrop-blur-sm
    ${getBackgroundClass()}
    ${cube.id !== -1 && "hover:text-white"}
  `}
        onClick={() => setIsWidgetOpen(true)}
        onMouseOver={() => setEmojiIndex(1)}
        onMouseLeave={() => setEmojiIndex(0)}
      >
        {/* Water layer */}
        {cube.id !== -1 && (
          <div
            className="absolute w-full"
            style={{ height: "200px" /*容器高度任意*/ }}
          >
            {/* 波浪 */}
            <svg
              className="absolute wave-svg wave-svg-second left-0 w-full"
              viewBox="0 0 1200 100"
              preserveAspectRatio="none"
              style={{
                pointerEvents: "none",
                bottom: `${cube.percentage}%`, // 底边距离容器底部距离为percentage
                height: "40px", // 波浪高度固定或可调
                overflow: "visible",
              }}
            >
              <path
                d="M0 50 C 150 70 350 30 600 50 C 850 70 1050 30 1200 50 L1200 100 L0 100 Z"
                fill={getWaveColorByPercentage(cube.percentage)}
                style={{ opacity: 0.4 }}
              />
            </svg>

            {/* 填充颜色的div，占满从底部到波浪底边的剩余高度 */}
            <div
              className="absolute left-0 bottom-0 w-full"
              style={{
                bottom: 0,
                height: `${cube.percentage}%`,
                backgroundColor: getWaveColorByPercentage(cube.percentage),
                opacity: 0.4,
                pointerEvents: "none",
              }}
            />
          </div>
        )}

        <div
          className={`relative z-10 flex flex-col items-center ${
            !isToday && "opacity-50"
          }`}
        >
          {isToday ? (
            <>
              <p className="text-3xl mt-6">{emoji[emojiIndex]}</p>
            </>
          ) : cube.id === -1 ? (
            <>
              <p className="text-6xl">∅</p>
              <p className="text-xs">{cube.date}</p>
            </>
          ) : (
            <>
              <p className="text-4xl">
                {cube.percentage.toFixed(1)}
                <span className="text-sm">%</span>
              </p>
              <p className="text-xs">{cube.date}</p>
            </>
          )}
        </div>
      </div>

      {isWidgetOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center h-full w-full bg-black-white-10 backdrop-blur-xs">
          <div className="flex w-2/3 items-center justify-between bg-black-white-10 backdrop-blur-md p-6 rounded-xl shadow-lg">
            <div className="w-full">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <h2 className="text-4xl font-bold">
                    Daily Energy Efficiency
                  </h2>
                  <p>{cube.date}</p>
                </div>
                <div className="space-x-4">
                  {isToday && (
                    <button onClick={handleRedirect}>
                      <div className="rounded-xl p-2 hover:text-yellow-500 hover:border-yellow-500">
                        <LightBulbIcon className="h-10 w-10" />
                      </div>
                    </button>
                  )}
                  <button onClick={() => setIsWidgetOpen(false)}>
                    <div className="rounded-xl p-2 hover:text-red-500 hover:border-red-500">
                      <XMarkIcon className="h-10 w-10" />
                    </div>
                  </button>
                </div>
              </div>

              {isToday ? (
                // 编辑模式
                <TaskList user={user} editable={true} />
              ) : (
                // 只读模式
                <TaskList user={user} date={cube.date} editable={false} />
              )}

              <div className="relative bg-black-white-50 rounded-lg h-6 m-2">
                <div
                  className="h-6 bg-yellow-500 rounded-lg transition-all duration-300"
                  style={{ width: `${cube.percentage}%` }}
                />
                <div className="absolute inset-0 flex items-center justify-center font-bold">
                  {cube.percentage.toFixed(2)}%
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Cube;
