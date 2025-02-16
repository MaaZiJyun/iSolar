"use client";

import React, { useState, useEffect, useRef } from "react";
import GlassWindow from "@/components/GlassWindow";
import StarComponent from "@/components/StarComponent"; // Import the StarComponent
import StarBackground from "@/components/StarBackground";

export default function Home() {
  // States
  const [lifePercentage, setLifePercentage] = useState(100); // Remaining life percentage
  const [isWidgetOpen, setIsWidgetOpen] = useState(false); // Widget state

  // Countdown for lifePercentage every second
  useEffect(() => {
    const decreaseLifePercentage = () => {
      setLifePercentage((prev) => {
        if (prev === 0) {
          return 100; // Reset to 100 if it reaches zero
        }
        return Math.max(prev - 10, 0); // Reduce by 10, ensuring it doesn't go below 0
      });
    };

    const timer = setInterval(decreaseLifePercentage, 2000); // Decrease every second

    return () => clearInterval(timer); // Cleanup function
  }, []); // Empty array to run once on mount

  return (
    <div>
      <div className="relative h-screen">
        <StarBackground />

        {/* Star Component and Glass Window */}
        <div className="absolute top-0 left-0 w-full h-full z-10">
          <div className="flex h-full w-full items-center justify-center">
            <StarComponent lifePercentage={lifePercentage} />
            <GlassWindow
              isOpen={isWidgetOpen}
              onClose={() => setIsWidgetOpen(false)}
            >
              {/* Add children content for GlassWindow */}
              <div>Window Content</div>
            </GlassWindow>
          </div>
        </div>
        {/* Text Container */}
        <div className="flex h-full w-full items-center justify-center z-20 p-4 flex-col text-center relative bg-black-white-10 backdrop-blur-sm">
          {/* Title and Introduction */}
          <div className="w-1/2">
            <h1 className="text-6xl font-bold mb-8">iSolar</h1>
            <h1 className="text-xl font-bold mb-4">
              Your star is still shining. Make every moment count before it
              fades.
            </h1>
            <p className="italic">
              "Reflect, Improve, and Shine Before You Fade."
            </p>
          </div>
        </div>
      </div>

      {/* Introduction Page Content */}
      <div className="flex flex-col items-center justify-center">
        <section className="max-w-4xl mt-8 text-left mx-auto">
          <p className="mb-12 leading-relaxed text-center">
            LifeStar is a unique application designed to inspire{" "}
            <strong>self-improvement</strong>, <strong>self-monitoring</strong>,
            and <strong>self-reflection</strong> by offering a profound
            perspective on the finite nature of human life.
          </p>
          <p className="mb-4 leading-relaxed">
            Unlike traditional time or schedule management apps, LifeStar
            doesn’t focus on organizing your tasks or managing your daily
            routine. Instead, it serves as a gentle but powerful reminder of
            life's fleeting nature, encouraging users to live more intentionally
            and meaningfully.
          </p>
          <p className="mb-8 leading-relaxed">
            Through a metaphorical representation of human life as a star, the
            app visually and numerically illustrates how much of your life is
            behind you and how much remains ahead. Just as a star shines
            brightly before it fades, LifeStar motivates users to make the most
            of their remaining time and reflect on how they are living.
          </p>
        </section>

        {/* Key Features Section */}
        <section className="flex items-center justify-center mt-10 py-12 bg-black-white-10">
          <div className="w-1/2">
            <h2 className="text-2xl font-semibold mb-4 text-center">
              Key Features
            </h2>
            <ul className="list-disc list-inside space-y-4">
              <li>
                <strong>Life Visualization as a Star:</strong> Your life is
                symbolized as a star that gradually fades over time. The app
                uses this visual representation to remind you of the
                impermanence of life and inspire you to make the most of your
                moments.
              </li>
              <li>
                <strong>Time Remaining Insights:</strong> Based on your age and
                life expectancy, the app calculates and displays:
                <ul className="list-disc list-inside ml-6">
                  <li>
                    <strong>Days left</strong> in your life.
                  </li>
                  <li>
                    <strong>
                      Percentage of life lived vs. life remaining.
                    </strong>
                  </li>
                </ul>
                This feature provides a stark yet motivating reminder of how
                precious time is.
              </li>
              <li>
                <strong>Daily Reflections:</strong> Prompts for{" "}
                <strong>self-reflection</strong> to help you evaluate your
                actions, achievements, and intentions for the day. Questions
                like: <em>"Did I make today meaningful?"</em> or{" "}
                <em>"What can I do better tomorrow?"</em>
              </li>
              <li>
                <strong>Self-Improvement Goals:</strong> Encourages users to set
                small, achievable goals for personal growth and track their
                progress over time. Focuses on <strong>habit-building</strong>{" "}
                for a more fulfilling life.
              </li>
              <li>
                <strong>Milestone Reminders:</strong> Highlights significant
                milestones in your life, helping you celebrate achievements and
                reflect on past experiences.
              </li>
              <li>
                <strong>Gentle Notifications:</strong> Sends periodic,
                thought-provoking reminders like:
                <ul className="list-disc list-inside ml-6">
                  <li>
                    <em>
                      "Your star is shining, but it won’t shine forever. What
                      will you do today to make it brighter?"
                    </em>
                  </li>
                  <li>
                    <em>
                      "Another day has passed. Did you live it meaningfully?"
                    </em>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </section>

        {/* Why LifeStar Section */}
        <section className="mt-10 max-w-4xl text-center">
          <h2 className="text-2xl font-semibold mb-4">Why LifeStar?</h2>
          <p className="leading-relaxed">
            In today’s fast-paced world, it’s easy to lose sight of what truly
            matters. LifeStar seeks to bring{" "}
            <strong>clarity and purpose</strong> to your life by reminding you
            of its finite nature. It’s not about fear or anxiety but about{" "}
            <strong>encouraging reflection, gratitude, and action</strong>. The
            app serves as a companion for those who wish to live more
            intentionally, improve themselves, and leave a meaningful legacy.
          </p>
        </section>

        {/* Who Is It For Section */}
        <section className="mt-10 max-w-4xl">
          <h2 className="text-2xl font-semibold mb-4 text-center">
            Who Is It For?
          </h2>
          <ul className="list-disc list-inside space-y-4">
            <li>
              Individuals seeking <strong>personal growth</strong> and{" "}
              <strong>self-awareness</strong>.
            </li>
            <li>
              Those who want to reflect on their existence and make the most of
              their time.
            </li>
            <li>
              People who feel overwhelmed by routine and want to reconnect with
              their purpose.
            </li>
            <li>
              Anyone looking for a <strong>unique perspective</strong> on life
              and time management.
            </li>
          </ul>
        </section>

        {/* Philosophy Section */}
        <section className="mt-10 max-w-4xl text-center">
          <h2 className="text-2xl font-semibold mb-4">
            The Philosophy Behind LifeStar
          </h2>
          <p className="leading-relaxed">
            The metaphor of the <strong>fading star</strong> is central to
            LifeStar's philosophy. Just as stars shine brightly in the night sky
            before they fade, humans have a finite amount of time to shine in
            their own way. By visualizing your life as a star, the app
            encourages you to:
          </p>
          <ul className="list-disc list-inside mt-4 space-y-2">
            <li>Reflect on your past.</li>
            <li>Embrace the present.</li>
            <li>Plan for a meaningful future.</li>
          </ul>
          <p className="leading-relaxed mt-4">
            LifeStar isn’t just an app; it’s a{" "}
            <strong>guide to living a reflective and intentional life</strong>.
          </p>
        </section>
      </div>
    </div>
  );
}
