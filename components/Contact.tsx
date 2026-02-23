import localFont from "next/font/local";
import React from "react";
import Link from "next/link";
import { FaFacebook, FaInstagram, FaXTwitter, FaYoutube } from "react-icons/fa6";

const jaini = localFont({ src: "../app/fonts/jaini.ttf" });

const Contact = () => {
  return (
    <div className="relative flex flex-col items-center justify-center py-20 px-4">
      <h1 className={`${jaini.className} text-6xl md:text-7xl text-transparent bg-clip-text bg-gradient-to-r from-gray-200 via-gray-400 to-gray-600 text-center drop-shadow-[0_0_15px_rgba(147,51,234,0.4)]`}>
        Get In Touch
      </h1>

      {/* Social Icons - Glassmorphic circles */}
      <div className="flex gap-6 mt-10">
        {[
          { icon: FaFacebook, href: "https://m.facebook.com/utsavbmsce" },
          { icon: FaInstagram, href: "https://www.instagram.com/bmsce_utsav/" },
          { icon: FaXTwitter, href: "https://twitter.com/bmsce_utsav" },
          { icon: FaYoutube, href: "https://www.youtube.com/@BMSCE_UTSAV" },
        ].map((social, idx) => (
          <Link key={idx} href={social.href} className="group relative">
            <div className="absolute inset-0 bg-purple-500 rounded-full blur-md opacity-0 group-hover:opacity-50 transition-opacity duration-300"></div>
            <div className="relative flex items-center justify-center w-14 h-14 md:w-16 md:h-16 rounded-full backdrop-blur-md bg-white/[0.03] border border-white/10 group-hover:border-purple-500/50 transition-all duration-300 text-gray-400 group-hover:text-white">
              <social.icon size={28} />
            </div>
          </Link>
        ))}
      </div>

      {/* Address Glass Panel */}
      <div className="mt-12 backdrop-blur-xl bg-white/[0.02] border border-gray-500/20 p-8 rounded-3xl w-full md:w-1/2 text-center shadow-[0_0_30px_rgba(0,0,0,0.5)] hover:border-purple-500/30 transition-all duration-500">
        <p className="text-gray-300 text-lg md:text-xl font-light leading-relaxed">
          <span className="font-semibold text-gray-100 drop-shadow-[0_0_5px_rgba(255,255,255,0.5)]">B. M. S. College of Engineering</span>
          <br />
          <span className="text-gray-400 text-base md:text-lg">#1908, Bull Temple Road, Basavanagudi, Bangalore - 560029</span>
          <br />
          <a href="mailto:utsav@bmsce.ac.in" className="text-purple-400 hover:text-purple-300 transition-colors mt-2 inline-block font-medium">
            utsav@bmsce.ac.in
          </a>
          <br />
          <span className="block mt-4 text-sm text-gray-500 uppercase tracking-widest">© UTSAV 2026</span>
        </p>
      </div>
    </div>
  );
};

export default Contact;