"use client";

import React, { useEffect, useState } from "react";
import { routes } from "@/utils/routes";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons/faTimes";
import { faBars } from "@fortawesome/free-solid-svg-icons/faBars";
import styles from "@/styles/retro.module.scss";

export default function NavMenu() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setOpen(false);
      }
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

  function renderNavLinks(links: typeof navLinks) {
    return links.map((link) =>
      link.routes ? (
        <li key={link.label} className="relative group z-50">
          <a
            href={link.path}
            className="px-4 py-2 font-semibold uppercase text-xs tracking-widest rounded hover:bg-orange-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-900"
            aria-haspopup="true"
            aria-expanded="false"
          >
            {link.label}
          </a>
          <div className="absolute left-0 top-full z-50 bg-orange-900 border border-orange-700 rounded shadow-lg opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 pointer-events-none group-hover:pointer-events-auto group-focus-within:pointer-events-auto transition-opacity">
            <ul>
              {renderNavLinks(link.routes)}
            </ul>
          </div>
        </li>
      ) : (
        <li key={link.label}>
          <a
            href={link.path}
            className="px-4 py-2 font-semibold uppercase text-xs tracking-widest rounded hover:bg-orange-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-900"
          >
            {link.label}
          </a>
        </li>
      )
    );
  }

  return (
    <nav className="relative md:flex md:items-center z-50">
      <button
        type="button"
        className={`${styles.navToggle} flex items-center gap-2 rounded-md px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] transition hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900 md:hidden`}
        onClick={() => setOpen((previous) => !previous)}
        aria-expanded={open}
        aria-controls="site-nav"
        aria-label="Toggle navigation"
      >
        <FontAwesomeIcon icon={open ? faTimes : faBars} size="lg" />
        Menu
      </button>
      {/* Desktop Nav */}
      <ul
        id="site-nav"
        className="hidden md:flex md:gap-4 md:items-center mt-2 md:mt-0"
      >
        {renderNavLinks(navLinks)}
      </ul>
    </nav>
  );
}
