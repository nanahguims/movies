import type { Metadata } from "next";
import { Raleway } from "next/font/google";
import "./globals.css";
import { SearchProvider } from "@/context/SearchContext";
import { FiltersProvider } from "@/context/FiltersContext";
import { Footer } from "@/components/layout/Footer";

const raleway = Raleway({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Studio Ghibli Movies - Catálogo de Filmes",
  description:
    "Explore o catálogo completo de filmes do Studio Ghibli com busca, filtros e detalhes cinematográficos.",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br" className="scroll-smooth">
      <body className={raleway.className}>
        <SearchProvider>
          <FiltersProvider>
            <div className="flex flex-col min-h-screen">
              <main className="flex-1">{children}</main>
              <Footer />
            </div>
          </FiltersProvider>
        </SearchProvider>
      </body>
    </html>
  );
}
