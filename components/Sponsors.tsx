import localFont from "next/font/local";
import React from "react";

const jaini = localFont({ src: "../app/fonts/jaini.ttf" });

const Sponsors = () => {
  return (
    <div className="flex flex-col items-center justify-center py-10 px-4">
      <h1 className={`${jaini.className} text-6xl text-[#E7A223]`}>
        Our Sponsors
      </h1>
      <p className="text-[#F4F6FF] text-xl w-full md:w-3/4 mt-4 text-center">
        Sponsors list
      </p>
    </div>
  );
};

export default Sponsors;
