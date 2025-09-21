import "./globals.scss";
import Link from "next/link";
import { routes } from "@/routes";
import localFont from "next/font/local";

const cormorantInfant = localFont({
  src: [
    {
      path: "../fonts/CormorantInfant-Regular.woff2",
      weight: "normal",
      style: "normal",
    },
    {
      path: "../fonts/CormorantInfant-Italic.woff2",
      weight: "normal",
      style: "italic",
    },
    {
      path: "../fonts/CormorantInfant-Bold.woff2",
      weight: "bold",
      style: "normal",
    },
    {
      path: "../fonts/CormorantInfant-BoldItalic.woff2",
      weight: "bold",
      style: "italic",
    },
  ],
});

const cormorantSC = localFont({
  src: [
    {
      path: "../fonts/CormorantSC-Regular.woff2",
      weight: "normal",
      style: "normal",
    },
    {
      path: "../fonts/CormorantSC-Bold.woff2",
      weight: "bold",
      style: "normal",
    },
  ],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html>
      <head />
      <body lang="en" className={cormorantInfant.className}>
        <div>
          <header>
            <h1 className={`${cormorantSC.className}`}></h1>
            <nav>
              <ul></ul>
            </nav>
          </header>
          <main>{children}</main>
          <footer></footer>
        </div>
      </body>
    </html>
  );
}
