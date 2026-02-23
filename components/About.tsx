import localFont from "next/font/local";
import Image from "next/image";
import React from "react";

const jaini = localFont({ src: "../app/fonts/jaini.ttf" });

const About = () => {
  return (
    <div id="about" className="relative w-full py-20 px-4 flex flex-col items-center justify-center overflow-hidden">
      {/* Decorative Background Glow */}
      <div className="absolute top-0 right-1/4 w-[300px] h-[300px] bg-purple-900/20 rounded-full blur-[100px] -z-10 pointer-events-none"></div>

      {/* Title - Metallic Silver Gradient */}
      <h1
        className={`${jaini.className} text-6xl md:text-7xl text-transparent bg-clip-text bg-gradient-to-r from-gray-200 via-gray-400 to-gray-600 drop-shadow-[0_0_15px_rgba(147,51,234,0.4)] text-center`}
      >
        About Us
      </h1>

      {/* Image Container with Glow */}
      <div className="relative mt-10 group">
        <div className="absolute -inset-2 bg-gradient-to-r from-purple-600 to-purple-900 rounded-full blur-xl opacity-30 group-hover:opacity-60 transition duration-700"></div>
        <Image
          className="relative rounded-full drop-shadow-[0_0_15px_rgba(255,255,255,0.1)] transition-transform duration-500 hover:scale-105 bg-black/50 p-2"
          src="/bmsce.png"
          width={180}
          height={180}
          alt="bmsce_logo"
        />
      </div>

      {/* Glassmorphism Text Box */}
      <div className="relative mt-12 w-full md:w-3/4 backdrop-blur-xl bg-black/40 border border-purple-500/20 p-8 md:p-10 rounded-3xl shadow-[0_8px_32px_rgba(147,51,234,0.15)] hover:border-purple-500/40 transition-all duration-500">
        {/* Subtle inner glow */}
        <div className="absolute inset-0 bg-gradient-to-b from-purple-500/5 to-transparent rounded-3xl pointer-events-none"></div>

        <p className="relative text-gray-300 text-lg md:text-2xl w-full text-justify leading-relaxed font-light">
          Founded in 1946, B. M. S. College of Engineering (BMSCE) stands as an
          early trailblazer in engineering education. Envisioned by the late Sri
          B. M. Sreenivasaiah, the college was established in Basavanagudi, with
          the ambition of becoming a cornerstone of higher education in Bengaluru.
          This dream was passionately pursued by his son, the late Sri B. S.
          Narayan, who was committed to providing quality education to students
          globally.
          <br />
          <br />
          Today, BMSCE has grown to offer 18 undergraduate and 13 postgraduate
          programs across various engineering and management fields. The college
          boasts a team of highly qualified faculty and staff, dedicated to
          delivering outstanding education while keeping pace with the future.
        </p>
      </div>
    </div>
  );
};

export default About;