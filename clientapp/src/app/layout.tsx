import { SiteHeader } from "@/components/SiteHeader";
import { cormorantInfant } from "@/fonts/fonts";
import styles from "@/styles/retro.module.css";
import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${styles.body} ${cormorantInfant.className} leading-relaxed text-slate-800`}
      >
        <div
          className={`${styles.wrapper} mx-auto my-5 flex min-h-[calc(100vh-96px)] max-w-[62rem] flex-col rounded-lg shadow-[0_12px_28px_rgba(16,34,52,0.35)]`}
        >
          <SiteHeader />
          <main className="flex-1 space-y-8 px-8 pb-12 pt-10">{children}</main>
          <footer
            className={`${styles.footer} rounded-b-lg px-8 py-6 text-center text-sm uppercase tracking-[0.18em] text-slate-100`}
          >
            Lena Tauchner &copy; {new Date().getFullYear()} Dreams
          </footer>
        </div>
      </body>
    </html>
  );
}
