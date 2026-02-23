import React from "react";

interface PatronComponentProp {
  name: string;
  designation?: string;
}

const PatronComponent = ({ name, designation }: PatronComponentProp) => {
  return (
    <div className="relative group w-full h-full">
      {/* Hover glow effect behind the card */}
      <div className="absolute -inset-0.5 bg-gradient-to-br from-purple-500 to-transparent rounded-2xl blur opacity-0 group-hover:opacity-30 transition duration-500"></div>
      
      {/* Glass Card */}
      <div className="relative flex flex-col items-center justify-center h-full p-8 backdrop-blur-xl bg-black/40 border border-white/5 rounded-2xl group-hover:border-purple-500/30 group-hover:bg-white/[0.04] transition-all duration-500 text-center shadow-[0_8px_32px_rgba(0,0,0,0.4)]">
        <h2 className="text-gray-200 font-semibold text-xl md:text-2xl drop-shadow-md">
          {name}
        </h2>
        {designation && (
          <p className="text-purple-300/80 text-sm md:text-base mt-3 font-light tracking-wide">
            {designation}
          </p>
        )}
      </div>
    </div>
  );
};

export default PatronComponent;