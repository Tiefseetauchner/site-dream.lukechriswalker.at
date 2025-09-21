"use client";

import React, { useEffect, useState } from "react";
import { routes } from "@/routes";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons/faTimes";
import { faBars } from "@fortawesome/free-solid-svg-icons/faBars";

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

  // Only use string routes, not functions
  const navLinks = [
    { label: "Home", path: routes.home },
    { label: "Books", path: routes.books },
    { label: "Characters", path: routes.characters },
    { label: "Main Author", path: routes.mainAuthor },
    { label: "Contact", path: routes.contact },
    { label: "Imprint", path: routes.imprint },
    { label: "License", path: routes.license },
    { label: "Privacy", path: routes.privacy },
  ];

  return (
    <nav className="relative">
      <div onClick={() => setOpen(!open)} className="md:hidden focus:outline-none">
        <FontAwesomeIcon icon={open ? faTimes : faBars} className="text-2xl" />
      </div>
      <div className={`absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg ${open ? "block" : "hidden"}`}>
        <ul>
          {navLinks.map((link) => (
            <li key={link.label}>
              <a href={link.path} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
