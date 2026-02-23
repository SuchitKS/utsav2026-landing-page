"use client";

import { useState } from "react";
import { ReactLenis } from '@studio-freight/react-lenis';
import About from "@/components/About";
import Contact from "@/components/Contact";
import Hero from "@/components/Hero";
import PatronCom from "@/components/PatronCom";
import EventsAndWorkshops from "@/components/ExploreEvents";
import Theme from "@/components/Theme";
import SplashAnimation from "@/components/Splash";
import Gallery from "@/components/Gallery";
import Aurora from "@/components/Aurora"; 

export default function Home() {
  const [animationComplete, setAnimationComplete] = useState<boolean>(false);

  return (
    <>
      {!animationComplete ? (
        <SplashAnimation
          onAnimationComplete={() => setAnimationComplete(true)}
        />
      ) : (
        /* ReactLenis Wrapper for Buttery Smooth Momentum Scrolling */
        <ReactLenis root options={{ lerp: 0.08, duration: 1.5, smoothWheel: true }}>
          <div className="w-full flex flex-col relative animate-fade-in text-white">
            
            {/* Floating Lines Parallax Background Layer */}
            <Aurora 
              linesGradient={["#9333EA", "#C0C0C0", "#1A0B2E"]} // Premium Purple, Silver, Deep Purple
              lineCount={4}
              lineDistance={6}
              interactive={true}
              parallax={true}
              parallaxStrength={0.15}
              animationSpeed={0.5}
            />
            
            {/* Foreground Scrollable Content */}
            <div className="relative z-10 w-full">
              <Hero />
              <EventsAndWorkshops />
              <Theme />
              <Gallery /> 
              <About />
              <PatronCom />
              <Contact />
            </div>
          </div>
        </ReactLenis>
      )}

      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fade-in {
          animation: fadeIn 1.5s ease-in-out forwards;
        }
      `}</style>
    </>
  );
}
