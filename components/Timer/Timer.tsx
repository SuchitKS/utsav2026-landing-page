"use client";

import React, { useState, useEffect } from "react";

const Timer = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    // Targeting Utsav Start Date: April 17, 2026
    const targetDate = new Date("2026-04-17T00:00:00").getTime();

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference <= 0) {
        clearInterval(interval);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      } else {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  if (!isClient) return null; // Prevents hydration mismatch on initial load

  // Helper to pad single digits with a zero (e.g., 9 -> 09)
  const formatNumber = (num: number) => num.toString().padStart(2, '0');

  return (
    <div className="flex flex-wrap justify-center gap-4 md:gap-8 mt-4 z-20 relative">
      {[
        { label: "Days", value: timeLeft.days },
        { label: "Hours", value: formatNumber(timeLeft.hours) },
        { label: "Minutes", value: formatNumber(timeLeft.minutes) },
        { label: "Seconds", value: formatNumber(timeLeft.seconds) },
      ].map((item, index) => (
        <div key={index} className="relative group">
          {/* Ambient Glow behind each box */}
          <div className="absolute -inset-1 bg-gradient-to-b from-purple-500/50 to-transparent rounded-2xl blur-lg opacity-40 group-hover:opacity-70 transition duration-500"></div>
          
          {/* Glassmorphic Box */}
          <div className="relative flex flex-col items-center justify-center w-24 h-28 md:w-32 md:h-36 backdrop-blur-xl bg-white/[0.03] border border-white/10 rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.5)] group-hover:border-purple-500/30 transition-all duration-500">
            
            {/* Glossy top highlight */}
            <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
            
            {/* The Number */}
            <span className="font-syne text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-white via-gray-200 to-gray-500 drop-shadow-[0_0_10px_rgba(255,255,255,0.3)] tabular-nums">
              {item.value}
            </span>
            
            {/* The Label */}
            <span className="font-outfit text-xs md:text-sm font-light tracking-[0.2em] text-purple-300 uppercase mt-2">
              {item.label}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Timer;