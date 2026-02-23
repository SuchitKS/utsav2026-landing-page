"use client";

import { useEffect, useState, useRef } from "react";

const menus = ["hero", "events", "theme", "gallery", "about", "sponsors", "contact"];
const displayNames: Record<string, string> = {
    hero: "Home",
    events: "Events",
    theme: "Theme",
    gallery: "Gallery",
    about: "About",
    sponsors: "Sponsors",
    contact: "Contact"
};

const Header = () => {
    const [activeSection, setActiveSection] = useState<string>("hero");
    const [toggleMenu, setToggleMenu] = useState(false);

    // Ref to track if we are currently mid-scroll from a click
    const isManualScrolling = useRef(false);
    // Ref to store the timeout so we can clear it if the user clicks multiple times
    const scrollTimeout = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        const handleScrollHighlight = () => {
            // Block the scroll listener from changing the highlight during a manual jump
            if (isManualScrolling.current) return;

            // Using a slightly larger offset for the 'active' trigger
            const scrollPosition = window.scrollY + 150;

            for (const menu of [...menus].reverse()) {
                const section = document.getElementById(menu);
                if (section && scrollPosition >= section.offsetTop) {
                    setActiveSection(menu);
                    break;
                }
            }
        };

        window.addEventListener("scroll", handleScrollHighlight);
        return () => {
            window.removeEventListener("scroll", handleScrollHighlight);
            if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
        };
    }, []);

    const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
        e.preventDefault();
        const element = document.getElementById(id);

        if (element) {
            // 1. Immediately clear any existing timeouts
            if (scrollTimeout.current) clearTimeout(scrollTimeout.current);

            // 2. Lock the listener and set the correct highlight immediately
            isManualScrolling.current = true;
            setActiveSection(id);

            const offset = 80; // Header height
            const elementPosition = element.getBoundingClientRect().top + window.scrollY;
            const offsetPosition = elementPosition - offset;

            window.scrollTo({
                top: offsetPosition,
                behavior: "smooth"
            });

            scrollTimeout.current = setTimeout(() => {
                isManualScrolling.current = false;
            }, 1280);
        }
        setToggleMenu(false);
    };

    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-black/60 backdrop-blur-md py-4 border-b border-white/5">
            <div className="px-4 flex justify-end sm:hidden">
                <button
                    className="cursor-pointer text-white"
                    onClick={() => setToggleMenu(!toggleMenu)}
                    aria-label="Toggle Navigation Menu"
                >
                    <svg viewBox="0 0 24 24" className="fill-white w-8 h-8">
                        <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" />
                    </svg>
                </button>
            </div>
            <nav className={`${toggleMenu ? "flex" : "hidden sm:flex"} justify-center items-center gap-2 sm:gap-4 lg:gap-8 sm:flex-row flex-col mt-4 sm:mt-0`}>
                {menus.map((menu) => (
                    <a
                        key={menu}
                        href={`#${menu}`}
                        onClick={(e) => handleScroll(e, menu)}
                        className={`w-[90%] sm:w-auto uppercase font-syne font-semibold text-sm md:text-base text-gray-300 text-center sm:px-4 lg:px-6 py-3 sm:py-2 rounded-full transition-all duration-300 ease-linear hover:bg-purple-600/40 hover:text-white ${activeSection === menu
                            ? "bg-purple-600/80 text-white shadow-[0_0_15px_rgba(147,51,234,0.4)]"
                            : ""
                            }`}
                    >
                        {displayNames[menu]}
                    </a>
                ))}
            </nav>
        </header>
    );
};

export default Header;