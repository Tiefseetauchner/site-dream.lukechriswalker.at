"use client";

import NavMenu from "@/components/NavMenu";
import { resolvePageMetadata } from "@/config/pageMetadata";
import { cormorantSC } from "@/fonts/fonts";
import styles from "@/styles/retro.module.css";
import { usePathname } from "next/navigation";
import { useMemo } from "react";

export function SiteHeader() {
  const pathname = usePathname() ?? "/";
  const { title, subtitle } = useMemo(
    () => resolvePageMetadata(pathname),
    [pathname],
  );

  return (
    <header className={`${styles.header} rounded-t-lg px-8 pb-6 pt-9`}>
      <div className="flex flex-row gap-6 md:flex-col md:items-center md:justify-between">
        <div className="space-y-2">
          <h1
            className={`${cormorantSC.className} ${styles.title} text-4xl font-semibold md:text-5xl`}
          >
            {title}
          </h1>
          <p className={`${styles.tagline} text-sm font-medium tracking-[0.2em]`}>
            {subtitle}
          </p>
        </div>
        <NavMenu />
      </div>
    </header>
  );
}
