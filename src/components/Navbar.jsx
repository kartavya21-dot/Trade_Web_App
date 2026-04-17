import React, { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, useSpring, useMotionValueEvent } from 'framer-motion';
import ConnectButton from './ConnectButton.jsx'
import AnimatedLogo from './AnimatedLogo.jsx'


/* ─── HELPERS ─── */
function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" ? window.innerWidth < breakpoint : true
  );
  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${breakpoint - 1}px)`);
    const handler = (e) => setIsMobile(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, [breakpoint]);
  return isMobile;
}

/* ─── NAVBAR ─── */
const NAV_LINKS = ["Home", "Features", "Reviews", "Contact"];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const isMobile = useIsMobile();
  const drawerRef = useRef(null);
  const burgerRef = useRef(null); // Added ref to the burger button

  useEffect(() => {
    if (!menuOpen) return;
    const handler = (e) => {
      // FIX: Check if the click is outside BOTH the drawer AND the burger button
      if (
        drawerRef.current && !drawerRef.current.contains(e.target) &&
        burgerRef.current && !burgerRef.current.contains(e.target)
      ) {
        setMenuOpen(false);
      }
    };
    // Use mousedown instead of pointerdown for better compatibility with state toggles
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [menuOpen]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  return (
    <>
      <style>{`
        .kwik-nav {
          position: sticky;
          top: 0;
          z-index: 100;
          // background: rgba(233, 233, 233, 1);
          // background: rgba(15, 23, 42, 0.1);
          backdrop-filter: blur(170px);
          border-bottom: 1px solid #1e2a45;
          padding: 0 5%;
        }
        .kwik-nav-inner {
          max-width: 1200px;
          margin: 0 auto;
          display: flex;
          align-items: center;
          justify-content: space-between;
          height: 64px;
        }
        .kwik-burger {
          display: flex;
          flex-direction: column;
          justify-content: center;
          gap: 5px;
          width: 36px;
          height: 36px;
          background: none;
          border: none;
          cursor: pointer;
          padding: 4px;
          z-index: 101;
        }
        .kwik-burger span {
          display: block;
          height: 2px;
          width: 24px;
          background: #8899bb;
          border-radius: 2px;
          transition: 0.3s;
        }
        .kwik-burger.open span:nth-child(1) { transform: translateY(7px) rotate(45deg); background: #fff; }
        .kwik-burger.open span:nth-child(2) { opacity: 0; }
        .kwik-burger.open span:nth-child(3) { transform: translateY(-7px) rotate(-45deg); background: #fff; }

        .kwik-links { display: none; }
        .kwik-connect-desktop { display: none; }

        .kwik-drawer {
          position: fixed;
          inset: 0;
          background: #020617;
          z-index: 99;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          transition: 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          clip-path: circle(0% at 100% 0%);
        }
        .kwik-drawer.open {
          clip-path: circle(150% at 100% 0%);
        }
        .kwik-drawer-link {
          color: #fff;
          font-size: 32px;
          font-weight: 800;
          text-decoration: none;
          margin: 15px 0;
          opacity: 0;
          transform: translateY(20px);
          transition: 0.4s;
        }
        .kwik-drawer.open .kwik-drawer-link {
          opacity: 1;
          transform: translateY(0);
        }

        @media (min-width: 768px) {
          .kwik-burger { display: none; }
          .kwik-links { display: flex; gap: 32px; }
          .kwik-links a { color: #8899bb; text-decoration: none; font-size: 14px; font-weight: 500; transition: 0.2s; }
          .kwik-links a:hover { color: #fff; }
          .kwik-connect-desktop { display: block; }
        }
      `}</style>

      <nav className="kwik-nav">
        <div className="kwik-nav-inner">
          <AnimatedLogo />
          <div className="kwik-links">
            {NAV_LINKS.map(l => <a key={l} href={`#${l.toLowerCase()}`}>{l}</a>)}
          </div>
          <div className="kwik-connect-desktop">
            <ConnectButton />
          </div>
          <button
            ref={burgerRef}
            className={`kwik-burger${menuOpen ? " open" : ""}`}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span /><span /><span />
          </button>
        </div>
      </nav>

      <div ref={drawerRef} className={`kwik-drawer ${menuOpen ? "open" : ""}`}>
        {NAV_LINKS.map((l, i) => (
          <a 
            key={l} 
            href={`#${l.toLowerCase()}`}
            className="kwik-drawer-link"
            style={{ transitionDelay: `${i * 100}ms` }}
            onClick={() => setMenuOpen(false)}
          >
            {l}
          </a>
        ))}
        <div className="mt-10" style={{ opacity: menuOpen ? 1 : 0, transition: '0.5s 0.4s' }}>
          <ConnectButton/>
        </div>
      </div>
    </>
  );
}