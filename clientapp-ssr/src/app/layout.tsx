import "./globals.scss";
import NavMenu from "@/components/NavMenu";
import { cormorantInfant, cormorantSC } from "@/fonts/fonts";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html>
      <head />
      <body lang="en" className={cormorantInfant.className}>
        <div className="min-h-screen flex flex-col">
          <header className="bg-gray-900 text-white shadow-md">
            <div className="container mx-auto flex items-center justify-between py-4 px-6">
              <h1 className={`${cormorantSC.className} text-3xl font-bold flex-1 text-center`}>Site Title</h1>
              <NavMenu />
            </div>
          </header>
          <main className="flex-1 container mx-auto px-6 py-8">{children}</main>
          <footer className="bg-gray-900 text-white py-4 text-center">&copy; {new Date().getFullYear()} Site Title</footer>
        </div>
      </body>
    </html>
  );
}