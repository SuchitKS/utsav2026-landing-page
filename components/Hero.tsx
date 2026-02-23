import React from "react";
import Image from "next/image";
import Timer from "./Timer/Timer";

const Hero = () => {
  return (
    <div className="relative flex flex-col items-center justify-center w-full min-h-screen">
      <div className="z-10 flex flex-col items-center justify-center w-full mt-10 px-4">
        
        {/* Top Title - Metallic Silver Gradient */}
        <h1 
          className="font-syne font-bold text-6xl md:text-8xl text-transparent bg-clip-text bg-gradient-to-b from-gray-100 via-gray-300 to-gray-500 tracking-wider drop-shadow-lg mb-4"
        >
          UTSAV 2026
        </h1>

        {/* Logo Container - Clean, No Purple Glow */}
        <div className="relative my-6">
          <Image
            className="relative w-3/4 md:w-1/2 max-w-lg mx-auto transition-transform duration-700 hover:scale-[1.03]"
            src="/U26logo.png"
            width={800}
            height={800}
            alt="Utsav 2026 Logo"
            priority={true}
          />
        </div>

        {/* Theme Title - Premium Purple Gradient */}
        <h2
          className="font-syne mt-2 text-5xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-300 via-purple-500 to-purple-700 drop-shadow-[0_0_15px_rgba(147,51,234,0.4)] text-center"
        >
          Trayana
        </h2>

        {/* Subtitle - Silver/Gray */}
        <p
          className="font-outfit text-gray-300 text-lg md:text-2xl mt-4 font-light tracking-[0.2em] text-center uppercase drop-shadow-md"
        >
          Infinite Creativity, One Celebration
        </p>

        {/* Glassmorphism Wrapper for the Timer */}
        <div className="mt-14 backdrop-blur-xl bg-white/[0.02] border border-white/5 p-6 rounded-3xl shadow-2xl transition-all duration-500 hover:border-white/10 hover:bg-white/[0.04]">
          <Timer />
        </div>
        
      </div>
    </div>
  );
};

export default Hero;