import styles from "@/styles/retro.module.css";
import { PropsWithChildren } from "react";

export function Panel({ children }: PropsWithChildren) {
  return (
    <section className={`${styles.panel} space-y-5 rounded-xl px-7 py-8`}>
      {children}
    </section>
  );
}
