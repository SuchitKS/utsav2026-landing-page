"use client";

import About from "@/components/About";
import Contact from "@/components/Contact";
import Hero from "@/components/Hero";
import ParticlesBg from "@/components/Particlebg";
import PatronCom from "@/components/PatronCom";
import EventsAndWorkshops from "@/components/ExploreEvents";
import Theme from "@/components/Theme";

export default function Home() {
  return (
    <div className="w-full flex flex-col relative">
      <div>
        <ParticlesBg />
      </div>
      <div className="relative z-10">
        <Hero />
        <EventsAndWorkshops />
        <Theme />
        <About />
        <Contact />
        <PatronCom />
      </div>
    </div>
  );
}
