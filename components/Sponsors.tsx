import localFont from "next/font/local";
import React from "react";
import Image from "next/image";

const jaini = localFont({ src: "../app/fonts/jaini.ttf" });

const sponsorImages = [
  "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=200&h=200&fit=crop", // placeholder 1
  "https://images.unsplash.com/photo-1622737133809-d95047b9e673?w=200&h=200&fit=crop", // placeholder 2
  "https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=200&h=200&fit=crop", // placeholder 3
  "https://images.unsplash.com/photo-1599305090598-fe179d501227?w=200&h=200&fit=crop", // placeholder 4
  "https://images.unsplash.com/photo-1614680376573-df3480f0c6ff?w=200&h=200&fit=crop", // placeholder 5
  "https://images.unsplash.com/photo-1601158935942-52255782d322?w=200&h=200&fit=crop"  // placeholder 6
];

const Title = ({ text }: { text: string }) => (
  <h1 className={`${jaini.className} text-5xl md:text-6xl text-transparent bg-clip-text bg-gradient-to-r from-gray-200 via-gray-400 to-gray-600 text-center drop-shadow-[0_0_15px_rgba(147,51,234,0.3)] mb-10`}>
    {text}
  </h1>
);

const Sponsors = () => {
  return (
    <div id="sponsors" className="flex flex-col items-center justify-center py-20 w-full overflow-hidden">
      <Title text="Our Sponsors" />
      {/* Marquee Container */}
      <div className="relative flex overflow-hidden w-full">
        {/* Track */}
        <div className="animate-marquee whitespace-nowrap flex items-center space-x-12 px-6 py-10">
          {/* Double map for seamless loop */}
          {[...sponsorImages, ...sponsorImages, ...sponsorImages, ...sponsorImages].map((src, index) => (
            <div
              key={index}
              className="flex-none items-center justify-center w-32 h-32 md:w-40 md:h-40 rounded-full bg-white overflow-hidden shadow-lg border-[3px] border-[#9333EA] hover:scale-110 transition-transform duration-300"
            >
              <Image
                src={src}
                alt={`Sponsor ${index + 1}`}
                width={160}
                height={160}
                className="w-full h-full object-cover object-center transform"
              />
            </div>
          ))}
        </div>
      </div>
      <style jsx>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
};

export default Sponsors;
