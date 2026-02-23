import localFont from "next/font/local";
import React from "react";

const jaini = localFont({ src: "../app/fonts/jaini.ttf" });

const EventsAndWorkshops = () => {
  return (
    <div className="relative py-24 px-4 flex flex-col items-center justify-center overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[250px] h-[250px] bg-purple-600/20 rounded-full blur-[80px] -z-10 pointer-events-none"></div>

      <h1 className={`${jaini.className} text-transparent bg-clip-text bg-gradient-to-r from-gray-200 via-gray-400 to-gray-600 text-6xl md:text-7xl text-center drop-shadow-[0_0_15px_rgba(147,51,234,0.3)]`}>
        Events & Workshops
      </h1>
      
      <div className="relative mt-12 group">
        {/* Glowing Button Aura */}
        <div className="absolute -inset-1 bg-gradient-to-r from-purple-500 via-purple-700 to-purple-500 rounded-full blur opacity-40 group-hover:opacity-100 transition duration-500 animate-pulse"></div>
        
        <a
          href="https://events.bmsutsav.in"
          target="_blank"
          rel="noopener noreferrer"
          className="relative block bg-black border border-purple-500/50 text-gray-200 font-bold text-center py-4 px-10 rounded-full text-xl md:text-2xl hover:text-white hover:bg-purple-900/40 transition-all duration-300 tracking-wide uppercase shadow-[0_0_20px_rgba(147,51,234,0.2)]"
        >
          Explore Events
        </a>
      </div>
    </div>
  );
};

export default EventsAndWorkshops;