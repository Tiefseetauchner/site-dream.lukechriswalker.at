"use client";

import NavMenu from "@/components/NavMenu";
import { usePageMetadata } from "@/components/PageMetadataProvider";
import { cormorantSC, tt2020 } from "@/fonts/fonts";
import styles from "@/styles/retro.module.css";

export function SiteHeader() {
  const { metadata } = usePageMetadata();
  const { title, subtitle } = metadata;

  return (
    <header className={`${styles.header} rounded-t-lg px-8 pb-6 pt-9`}>
      <div className="flex flex-row gap-6 md:flex-col md:items-center md:justify-between">
        <div className="space-y-2">
          <h1 className={`${tt2020.className} ${styles.title} text-3xl font-semibold md:text-5xl`}>{title}</h1>
          <p className={`${cormorantSC.className} ${styles.tagline} text-xs font-medium tracking-[0.3em]`}>{subtitle}</p>
        </div>
        <NavMenu />
      </div>
    </header>
  );
}
