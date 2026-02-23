import localFont from "next/font/local";
import React from "react";

const jaini = localFont({ src: "../app/fonts/jaini.ttf" });

const Theme = () => {
  return (
    <div id="theme" className="relative w-full py-20 px-4 flex flex-col items-center justify-center overflow-hidden">
      {/* Background Ambient Lighting */}
      <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-purple-800/20 rounded-full blur-[120px] -z-10 pointer-events-none"></div>

      {/* Title - Premium Purple Glow */}
      <h1
        className={`${jaini.className} text-6xl md:text-7xl text-transparent bg-clip-text bg-gradient-to-r from-purple-300 via-purple-500 to-purple-700 drop-shadow-[0_0_20px_rgba(147,51,234,0.5)] text-center`}
      >
        Theme
      </h1>

      {/* Deep Glassmorphism Text Box */}
      <div className="relative mt-10 w-full md:w-3/4 backdrop-blur-xl bg-white/[0.02] border border-gray-500/20 p-8 md:p-12 rounded-3xl shadow-[0_0_40px_rgba(0,0,0,0.5)] hover:shadow-[0_0_50px_rgba(147,51,234,0.2)] hover:border-purple-500/40 transition-all duration-700 group">
        {/* Corner glowing accents */}
        <div className="absolute top-0 left-0 w-24 h-24 bg-purple-500/10 blur-2xl rounded-full group-hover:bg-purple-400/20 transition-colors duration-700 pointer-events-none"></div>
        <div className="absolute bottom-0 right-0 w-24 h-24 bg-purple-500/10 blur-2xl rounded-full group-hover:bg-purple-400/20 transition-colors duration-700 pointer-events-none"></div>

        <p className="relative text-gray-300 text-lg md:text-2xl w-full text-justify leading-relaxed font-light tracking-wide">
          A grand celebration where imagination knows no bounds and creativity
          takes center stage. True to its name,{" "}
          <span className="text-purple-400 font-semibold drop-shadow-[0_0_8px_rgba(147,51,234,0.8)]">
            Ananta
          </span>{" "}
          signifies infinite ideas, talents, and dreams coming together in one
          vibrant celebration. This fest is a tribute to the limitless potential
          within every individual, where art, culture, technology, and
          innovation merge into a spectacular showcase of passion and skill.
          Join us as we transform our campus into a canvas of colors, rhythms,
          and energy because every moment at Utsav Ananta is a celebration of
          creativity that never ends.
        </p>
      </div>
    </div>
  );
};

export default Theme;