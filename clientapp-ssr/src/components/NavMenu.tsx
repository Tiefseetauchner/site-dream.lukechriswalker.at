"use client";

import styles from "@/styles/retro.module.css";
import { routes } from "@/utils/routes";
import { faBars } from "@fortawesome/free-solid-svg-icons/faBars";
import { faTimes } from "@fortawesome/free-solid-svg-icons/faTimes";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";

export default function NavMenu() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const navLinks = [
    { label: "Home", path: routes.home },
    { label: "Books", path: routes.books },
    { label: "Characters", path: routes.characters },
    { label: "Main Author", path: routes.mainAuthor },
    {
      label: "About", path: routes.contact, routes: [
        { label: "License", path: routes.license },
        { label: "Imprint", path: routes.imprint },
        { label: "Privacy", path: routes.privacy },
      ]
    }
  ];

  function renderNavLinks(links: typeof navLinks, isMobile = false) {
    return links.map((link) =>
      link.routes ? (
        <li key={link.label} className="relative group">
          <a
            href={link.path}
            className={`block px-4 py-2 rounded font-semibold uppercase text-xs tracking-widest transition-colors ${isMobile
                ? "bg-retro-500 hover:bg-retro-600 text-white"
                : "bg-retro-800 hover:bg-retro-600 text-white"
              } focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-retro-400`}
            aria-haspopup="true"
            aria-expanded="false"
          >
            {link.label}
          </a>
          {!isMobile && (
            <div className="absolute left-0 top-full z-50 min-w-[10rem] bg-retro-900 border border-retro-600 rounded shadow-lg opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 pointer-events-none group-hover:pointer-events-auto group-focus-within:pointer-events-auto transition-opacity">
              <ul>{renderNavLinks(link.routes)}</ul>
            </div>
          )}
          {isMobile && (
            <ul className="ml-4 mt-2 border-l border-retro-400 pl-2">
              {renderNavLinks(link.routes, true)}
            </ul>
          )}
        </li>
      ) : (
        <li key={link.label}>
          <a
            href={link.path}
            className={`block px-4 py-2 rounded font-semibold uppercase text-xs tracking-widest transition-colors ${isMobile
                ? "bg-retro-500 hover:bg-retro-600 text-white"
                : "bg-retro-800 hover:bg-retro-600 text-white"
              } focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-retro-400`}
          >
            {link.label}
          </a>
        </li>
      )
    );
  }

  return (
    <>
      {/* Desktop Nav */}
      <nav className="hidden md:flex items-center z-50">
        <ul className="flex gap-4 items-center">{renderNavLinks(navLinks)}</ul>
      </nav>
      {/* Mobile Nav Toggle */}
      <nav className="md:hidden z-50">
        <button
          type="button"
          className={`${styles.navToggle} flex items-center gap-2 rounded px-4 py-2 text-xs font-semibold uppercase tracking-widest transition-colors bg-retro-800 hover:bg-retro-600 text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-retro-400`}
          onClick={() => setOpen((prev) => !prev)}
          aria-expanded={open}
          aria-controls="site-nav"
          aria-label="Toggle navigation"
        >
          <FontAwesomeIcon icon={open ? faTimes : faBars} size="lg" />
          Menu
        </button>
      </nav>
      {/* Mobile Nav Overlay */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black bg-opacity-40 transition-opacity duration-300"
          onClick={() => setOpen(false)}
          aria-hidden="true"
        />
      )}
      {/* Mobile Nav Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-retro-500 shadow-lg z-50 transform transition-transform duration-300 ${open ? "translate-x-0" : "translate-x-full"
          }`}
        style={{ pointerEvents: open ? "auto" : "none" }}
        aria-hidden={!open}
      >
        <button
          type="button"
          className="absolute top-4 right-4 text-white"
          onClick={() => setOpen(false)}
          aria-label="Close menu"
        >
          <FontAwesomeIcon icon={faTimes} size="lg" />
        </button>
        <ul className="flex flex-col gap-2 mt-16 px-6">{renderNavLinks(navLinks, true)}</ul>
      </div>
    </>
  );
}
