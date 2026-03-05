import React, { useState } from "react";
import {
  motion,
  useScroll,
  useMotionValueEvent,
} from "motion/react";
import { cn } from "../../lib/utils";
import { Link } from "react-router-dom";

export const FloatingNav = ({
  navItems,
  className,
}: {
  navItems: {
    name: string;
    link: string;
    icon?: React.ReactNode;
  }[];
  className?: string;
}) => {
  const { scrollYProgress } = useScroll();
  // Start visible so it shows immediately on page load
  const [visible, setVisible] = useState(true);

  useMotionValueEvent(scrollYProgress, "change", (current) => {
    if (typeof current === "number") {
      const direction = current - scrollYProgress.getPrevious()!;

      if (scrollYProgress.get() < 0.05) {
        // At the very top — always show
        setVisible(true);
      } else {
        // Scrolling up → show, scrolling down → hide
        setVisible(direction < 0);
      }
    }
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ y: visible ? 0 : -100, opacity: visible ? 1 : 0 }}
      transition={{ duration: 0.2 }}
      className={cn(
        "flex max-w-fit fixed top-6 inset-x-0 mx-auto border border-white/10 rounded-full bg-black/80 backdrop-blur-md shadow-[0px_2px_20px_rgba(139,92,246,0.15)] z-[5000] items-center justify-center gap-1 px-2 py-2",
        className
      )}
    >
      {/* Logo */}
      <Link to="/" className="flex items-center gap-2 pl-3 pr-4 border-r border-white/10 mr-2">
        <svg width="20" height="20" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="32" height="32" rx="8" fill="url(#sv-float-grad)" fillOpacity="0.15"/>
          <path d="M21 6.5H14C12.3431 6.5 11 7.84315 11 9.5C11 11.1569 12.3431 12.5 14 12.5H18C19.6569 12.5 21 13.8431 21 15.5C21 17.1569 19.6569 18.5 18 18.5H11L16 25.5L21 18.5" stroke="url(#sv-float-grad)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
          <defs>
            <linearGradient id="sv-float-grad" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
              <stop stopColor="#8B5CF6"/>
              <stop offset="1" stopColor="#D946EF"/>
            </linearGradient>
          </defs>
        </svg>
        <span className="text-sm font-semibold tracking-tight text-white hidden sm:block">SystemVeil</span>
      </Link>

      {/* Nav links */}
      <div className="flex items-center gap-1 px-2">
        {navItems.map((navItem, idx) => (
          <Link
            key={`link-${idx}`}
            to={navItem.link}
            className="relative text-white/60 flex items-center gap-1.5 hover:text-white transition-colors duration-200 px-3 py-1.5 rounded-full hover:bg-white/5 text-sm"
          >
            <span className="sm:hidden">{navItem.icon}</span>
            <span className="hidden sm:block">{navItem.name}</span>
          </Link>
        ))}
      </div>

      {/* CTA */}
      <Link
        to="/quote"
        className="relative border text-sm font-medium border-white/20 text-white px-4 py-2 rounded-full hover:bg-white/10 transition-colors duration-200 whitespace-nowrap"
      >
        <span>Free Quote</span>
        <span className="absolute inset-x-0 w-1/2 mx-auto -bottom-px bg-gradient-to-r from-transparent via-violet-500 to-transparent h-px" />
      </Link>
    </motion.div>
  );
};
