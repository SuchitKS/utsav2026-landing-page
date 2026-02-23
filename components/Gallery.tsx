import localFont from "next/font/local";
import React from "react";

const jaini = localFont({ src: "../app/fonts/jaini.ttf" });

const Gallery = () => {
  // Array to map out placeholder boxes
  const placeholders = [
    { id: 1, size: "md:col-span-2 md:row-span-2 min-h-[300px]" },
    { id: 2, size: "col-span-1 min-h-[200px]" },
    { id: 3, size: "col-span-1 min-h-[200px]" },
    { id: 4, size: "col-span-1 min-h-[250px]" },
    { id: 5, size: "md:col-span-2 min-h-[250px]" },
  ];

  return (
    <div className="relative w-full py-24 px-4 flex flex-col items-center justify-center overflow-hidden max-w-7xl mx-auto">
      {/* Background Glow */}
      <div className="absolute top-1/2 right-1/4 w-[300px] h-[300px] bg-purple-600/10 rounded-full blur-[100px] -z-10 pointer-events-none"></div>

      <h1
        className={`${jaini.className} text-6xl md:text-7xl text-transparent bg-clip-text bg-gradient-to-r from-gray-200 via-gray-400 to-gray-600 drop-shadow-[0_0_15px_rgba(147,51,234,0.4)] text-center mb-12`}
      >
        Utsav Legacy
      </h1>

      <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 auto-rows-auto">
        {placeholders.map((item) => (
          <div
            key={item.id}
            className={`relative group overflow-hidden rounded-3xl backdrop-blur-xl bg-white/[0.02] border border-gray-500/20 shadow-[0_8px_32px_rgba(0,0,0,0.3)] hover:border-purple-500/50 hover:shadow-[0_0_40px_rgba(147,51,234,0.2)] transition-all duration-500 flex items-center justify-center ${item.size}`}
          >
            {/* Shimmer/Pulse effect for the placeholder */}
            <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 to-black/40 group-hover:from-purple-800/40 transition-colors duration-700"></div>
            
            <span className="relative text-gray-500/50 font-light tracking-widest uppercase group-hover:text-purple-300/80 transition-colors duration-500 z-10">
              Image Pending
            </span>
          </div>
        ))}
      </div>
      
      <p className="text-gray-400 mt-10 text-lg font-light tracking-wide text-center">
        Relive the magic of past celebrations.
      </p>
    </div>
  );
};

export default Gallery;