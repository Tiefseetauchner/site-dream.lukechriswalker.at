import { PageMetadataProvider } from "@/components/PageMetadataProvider";
import { SiteHeader } from "@/components/SiteHeader";
import { cormorantInfant } from "@/fonts/fonts";
import styles from "@/styles/retro.module.css";
import "./globals.css";

export const dynamic = "force-dynamic";
export const revalidate = 0;

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
        <PageMetadataProvider>
          <div
            className={`${styles.wrapper} mx-auto my-3 flex min-h-[calc(100vh-96px)] max-w-[1200px] flex-col rounded-lg shadow-[0_12px_28px_rgba(16,34,52,0.35)] sm:my-5`}
          >
            <SiteHeader />
            <main className="flex-1 space-y-8 px-4 pb-10 pt-8 sm:px-8 sm:pb-12 sm:pt-10">
              {children}
            </main>
            <footer
              className={`${styles.footer} rounded-b-lg px-4 py-5 text-center text-sm uppercase tracking-[0.18em] text-slate-100 sm:px-8 sm:py-6`}
            >
              Lena Tauchner &copy; {new Date().getFullYear()} Dreams
            </footer>
          </div>
        </PageMetadataProvider>
      </body>
    </html>
  );
}
